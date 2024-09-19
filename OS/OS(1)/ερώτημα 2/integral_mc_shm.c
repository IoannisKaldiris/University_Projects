// integral_mc_seq.c: Monte Carlo integration - sequential code
// https://en.wikipedia.org/wiki/Monte_Carlo_integration

/*
# Ξηρομερίτης Άγγελος,           1088601
# Μπαλής Γεώργιος,	             1040996 (παλαιός:235230)
# Κωστόπουλος Στέφανος Ιωάννης,  1093404
# Ιωάννης Καλδίρης,	             1080428
*/

#include <stdio.h>
#include <stdlib.h>
#include <math.h>
#include <sys/time.h>
#include <unistd.h>
#include <sys/mman.h>
#include <sys/wait.h>

double get_wtime(void) {
    struct timeval t;
    gettimeofday(&t, NULL);
    return (double)t.tv_sec + (double)t.tv_usec * 1.0e-6;
}

inline double f(double x) {
    return sin(cos(x));
}

// WolframAlpha: integral sin(cos(x)) from 0 to 1 = 0.738643
// 0.73864299803689018
// 0.7386429980368901838000902905852160417480209422447648518714116299

int main(int argc, char *argv[]) {
    
    double a = 0.0;
    double b = 1.0;

    unsigned long n = 24e7; // Προεπιλεγμένος αριθμός επαναλήψεων
    
    const double ref = 0.73864299803689018;
    const double h = (b - a) / n;
    double res = 0;
    double t0, t1;

    int total_processes = 8; // Desfault αριθμός διεργασιών

    if (argc >= 2) {
        n = atol(argv[1]);
    }

    // Δεύτερο όρισμα για των ορισμό των processes

    if (argc >= 3) {
        total_processes = atoi(argv[2]);
    }

    // Έλεγχος εγκυρότητας αριθμού διεργασιών

    if (total_processes <= 0) {
        fprintf(stderr, "Ο αριθμός των διεργασιών πρέπει να είναι μεγαλύτερος από 0\n");
        return 1;
    }

    // Διαχωρισμός των iterations ανα process

    unsigned long iterations_per_process = n / total_processes;

    // Υπολογισμός των υπόλοιπων iterations σε περίπτωση που τα iterations 
    // δεν διαιρούνται ακριβώς με το πλήθος των processes

    unsigned long extra_iterations = n % total_processes;


    // Initialize το μέγεθος της μεταβλητής που δείχνει το μέγεθος της shared memory

    const double memory_block = total_processes * sizeof(double);

    // Δημιουργία κοινόχρηστης μνήμης για τα μερικά αποτελέσματα

    double *shared_memory = mmap(NULL, memory_block, 
                                 PROT_READ | PROT_WRITE, MAP_SHARED | MAP_ANONYMOUS, -1, 0);

    // Έλεγχος αν η mmap απέτυχε

    if (shared_memory == MAP_FAILED) {
        perror("mmap failed");
        exit(1);
    }

    // Αρχικοποίηση της κοινόχρηστης μνήμης σε μηδέν

    for (int i = 0; i < total_processes; i++) {
        shared_memory[i] = 0.0;
    }

    pid_t pid_array[total_processes]; // Πίνακας για αποθήκευση των PID των διεργασιών

    // Αρχικοποίηση του πίνακα PID με -1

    for (int i = 0; i < total_processes; i++) {

        pid_array[i] = -1; // Το -1 χρησιμοποιείται για μη αρχικοποιημένου PID

    }

    t0 = get_wtime();

    // Δημιουργία διεργασιών για κάθε worker

    for (int worker = 0; worker < total_processes; worker++) {
        
        pid_t pid = fork(); // Δημιουργία Child Processes απο τον parent

        if (pid < 0) {
            perror("fork failed");
            munmap(shared_memory, memory_block);
            exit(1);
        }
        
        if (pid == 0) { // Κώδικας που εκτελείται από το παιδί

            srand48(time(NULL) + getpid() + clock());

            // Ορίζουμε τα iterations σε κάθε process

            unsigned long start_iteration = worker * iterations_per_process;

            // Tελικό iteration

            unsigned long end_iteration = start_iteration + iterations_per_process;

            // Αναθέτουμε στο τελευταίο process τις extra επαναλήψεις 

            if (worker == total_processes - 1) end_iteration += extra_iterations;
            
            double local_sum = 0.0; 

            // Υπολογισμός του μέρους του υπολογισμού απο το child process

            for (unsigned long k = start_iteration; k < end_iteration; k++) {

                double random_sample =drand48();

                local_sum += f(random_sample); 

            }

            shared_memory[worker] = local_sum;  // Γράψιμο του μερικού αποτελέσματος στην κοινόχρηστη μνήμη

            exit(0);

        } else {
             
            pid_array[worker] = pid;  // Αποθήκευση του PID της διεργασίας παιδιού στον πίνακα

        }
    }
    
    // Συνδυασμός του waitpid και gather αποτελεσμάτων από την κοινόχρηστη μνήμη

    for (int i = 0; i < total_processes; i++) {
        
        pid_t pid = waitpid(-1, NULL, 0); // περιμένει το child process να τερματίσει
        
        // Προσδιορισμός του worker ID που τερμάτισε
        int worker_id = -1;
        for (int j = 0; j < total_processes; j++) {
            if (pid_array[j] == pid) {
                worker_id = j;
                break;
            }
        }

        res += shared_memory[worker_id];  // Συνδυασμός των αποτελεσμάτων από την κοινόχρηστη μνήμη

    }

    res *= h;

    t1 = get_wtime(); 

    // Εμφάνιση των αποτελεσμάτων

    printf("\n--- Execution with %d Processes ---",total_processes);

    printf("\n\nResult=%.16f \nError=%e \nRel.Error=%e \nTime=%lf seconds\n\n",
           res, fabs(res - ref), fabs(res - ref) / ref, t1 - t0);

    // Εκκαθάριση της κοινόχρηστης μνήμης

    munmap(shared_memory, memory_block);

    return 0;
}
