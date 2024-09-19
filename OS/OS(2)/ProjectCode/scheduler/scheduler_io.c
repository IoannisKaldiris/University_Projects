#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <time.h>
#include <unistd.h>
#include <sys/wait.h> 
#include <signal.h>

// =========================================
// Authors
// =========================================

/* Ξηρομερίτης Άγγελος 1088601 4 έτος */
/* Μπαλής Γεωργιος 1040996 ( παλαιός:235230) 15ο Έτος */
/* Κωστόπουλος Στέφανος Ιωάννης 1093404 3ο ετος */
/* Ιωάννης Καλδίρης ΑΜ:1080428 5o έτος */


// =========================================
// Global variables
// =========================================

// Variable that holds the time the queue initialized
struct timespec time_zero;

//Variables that hold the head and tal of the double linked list
struct Node* head = NULL;
struct Node* tail = NULL;

//Variable that hold the last popped node from the list
struct Node* current_node = NULL;

int quatum_intevals = 10;


// =========================================
// Process structs and functions
// =========================================
// Function to sleep
void quantum_sleep(long milliseconds){
	struct timespec quantum_time;
    quantum_time.tv_sec = milliseconds / 1000;           // Convert milliseconds to seconds
    quantum_time.tv_nsec = (milliseconds % 1000) * 1000000; // Convert remainder to nanoseconds
    // Sleep for the specified quantum time
    nanosleep(&quantum_time, NULL);
} 

// Function to calculate elapsed time in seconds with nanosecond precision
double calculate_elapsed_time(struct timespec end, struct timespec start) {
    double start_sec = start.tv_sec + start.tv_nsec / 1e9;
    double end_sec = end.tv_sec + end.tv_nsec / 1e9;
    return end_sec - start_sec;
}


// Process states
typedef enum{
	NEW,
	RUNNING,
	IO,
	STOPPED,
	EXITED
}State;

// Struct for process info
struct Process{
	int pid;
	State state;
	double workload_time;
	char executable_path[50];
};

// Function to create a new process
struct Process* create_process(const char* executable_path){
	 // Allocate memory for a new process
    struct Process* new_process = (struct Process*)malloc(sizeof(struct Process));
    
    if (new_process == NULL) {
        printf("Memory allocation failed!\n");
        return NULL;  // Return NULL if memory allocation fails
    }
    
    // Initialize process fields
    new_process->pid = -1;                          // Assign PID
    new_process->state = NEW;                        // Set initial state to NEW
    new_process->workload_time = 0;            // Set the entry time to 0
    strncpy(new_process->executable_path, executable_path, 50); // Copy the executable path
    return new_process;  // Return the pointer to the newly created process
}

void print_process_info(struct Process* process){
	printf("PID %d - CMD: %s\n", process->pid, process-> executable_path);
}

void print_process(struct Process* process){
	printf("PID %d - CMD: %s\n", process->pid, process-> executable_path);
	struct timespec current_time;
	clock_gettime(CLOCK_MONOTONIC, &current_time);

	double elapsed_seconds = calculate_elapsed_time(current_time, time_zero);
	printf("	Elapsed time = %.2f secs \n", elapsed_seconds);
	printf("	Workload time = %.2f secs \n", process->workload_time);
}


// =========================================
//Double Linked List for scheduler queue
// =========================================

//Struct for a List Node
struct Node{
	struct Process* process;
	struct Node* next;
	struct Node* prev;
};
// Global pointers for head and tail of the doubly linked list

//Function to create a new list node
struct Node* create_node(struct Process* new_process){
	// Allocate memory for a new node
    struct Node* new_node = (struct Node*)malloc(sizeof(struct Node));
    
    if (new_node == NULL) {
        printf("Memory allocation failed!\n");
        return NULL;  // Return NULL if memory allocation fails
    }
	new_node->process = new_process; // Assign the process to the node
    new_node->next = NULL;           // Set the next pointer to NULL
    new_node->prev = NULL;           // Set the previous pointer to NULL

    return new_node;  // Return the pointer to the newly created node
	
}
struct Node* find_pid(int pid){
	struct Node* node = head;
	while(node != NULL){
		if(node->process->pid == pid){
			return node;
		}
		node = node -> next;
	}
	return NULL;

}

// Add an existing node an the end of the list
void append_existing_node(struct Node* node){
	printf("Queue process with name %s\n", node->process->executable_path);
	if (head == NULL) {
        head = node;
		tail = node;
        return;
    }
	node->prev = tail;
	tail->next = node;
	tail = node;


}

// Function to add a process at the end of the double linked list
void append(struct Process* new_process){
	struct Node* new_node = create_node(new_process);
	append_existing_node(new_node);
}

// Function to create a proccess and append it to the list
void append_process(const char* executable_path){
	struct Process* process = create_process(executable_path);
	if (process != NULL){
		append(process);
	}
}

// Function to get the head node of the double linked list
struct Node* pop_head(){
	if (head == NULL) { // List is empty
        return NULL;
    }
	struct Node* temp = head;

    // If there's only one node in the list
    if (head->next == NULL) {
        head = NULL;
        tail = NULL;
    } else {
        head = head->next;
        head->prev = NULL;
    }
	temp->next = NULL;
	temp->prev = NULL;
	current_node = temp;
	printf("Dequeue process with name %s\n", current_node->process->executable_path);
    return temp;  // Return the process from the popped node
}

// Populate the double linked list from the input file
void populate_queue_from_file(const char* file_path){
	FILE *file = fopen(file_path, "r");
	clock_gettime(CLOCK_MONOTONIC, &time_zero);
    if (file == NULL) {
        perror("Error opening file");
        exit(EXIT_FAILURE);
    }

    char line[256];
    while (fgets(line, sizeof(line), file)) {
        // Remove newline character from the end of the line
        line[strcspn(line, "\n")] = '\0';
         // Create and append a new process
        append_process(line);
    }
    fclose(file);
	
}

// Function to print the the double linked list contents
void print_list(){
	struct Node* cur = head;
	while(cur!= NULL){
		struct Process* proc = cur->process;
		printf("PID: %d - STATE: %d - CMD: %s \n", proc->pid, proc->state, proc->executable_path);
		cur = cur->next;
	}
}

// Function to free the memory the double linked list used
void free_node( struct Node* node){
    free(node->process);      // Free the associated process
    free(node);               // Free the current node
	current_node = NULL;
}

// Function to update the workload time from the global current node
void update_workload_time(struct timespec start_time){
	struct timespec current_time;
	clock_gettime(CLOCK_MONOTONIC, &current_time);
	double workload_seconds = calculate_elapsed_time(current_time, start_time);
    current_node->process->workload_time += workload_seconds;
}



// =========================================
//Scheduler functions
// =========================================
double calculate_total_elapsed_time(){
	struct timespec current_time;
	clock_gettime(CLOCK_MONOTONIC, &current_time);
	double total_workload_seconds = calculate_elapsed_time(current_time, time_zero);
	return total_workload_seconds;
}


// Funtion to handle the signal from the child process
void signal_handler(int sig){
	pid_t pid;
	int status;
	while((pid = waitpid(current_node->process->pid, &status, WNOHANG | WUNTRACED))> 0){
		if (WIFEXITED(status) ) {
			// The child exited properly
			/*
			printf("Process finished -> ");
			print_process_info(current_node->process);
			*/
            current_node->process->state = EXITED;
        } else if (WIFSTOPPED(status)) {
			/*
			printf("Process stopped-> ");
			print_process_info(current_node->process);
			*/
            current_node->process->state = STOPPED;

        }
	}
}

// Funtion to handle the sigusr1 signal from IO process
void sigusr1_handler(int sig, siginfo_t *info, void *context){

	int sender_pid = info->si_pid;
    if (current_node != NULL) {
        current_node->process->state = IO;
        printf("Process %d is waiting for I/O.\n", current_node ->process->pid);
    } else {
        printf("Warning: Received SIGUSR1 from unknown PID %d.\n", sender_pid);
    }
}

// Funtion to handle the sigusr2 signal from IO process
void sigusr2_handler(int sig, siginfo_t *info, void *context){
	int sender_pid = info->si_pid;
	//printf("Received sigusr2 from pid: %d\n", sender_pid);
    struct Node *node = find_pid(sender_pid);
    if (node != NULL) {
        node->process->state = STOPPED;
        printf("Process %d has completed I/O and is ready.\n", node->process->pid);
    }
}
// Function to run an executable given its path
void run_executable(const char *path) {
    // Use execl() to run the executable
	printf("executing %s\n", path);
    if (execl(path, path, (char *)NULL) == -1) {
        perror("Error executing the program");
        exit(EXIT_FAILURE);  // Exit the process with failure status if exec fails
    }
}

// Function to run a process on it's own thread
void run_process(){
	struct Process* process = current_node->process;
		 // Create a new process using fork()
    pid_t pid = fork();

    // Check the return value of fork()
    if (pid < 0) {
        // If fork() returns a negative value, it failed
        printf("Fork failed.\n");
        exit(EXIT_FAILURE);
    } else if (pid == 0) {
		run_executable(process->executable_path);
		exit(1);
    } else {
       // This block runs in the parent process
        process->pid = pid;  // Set the child's PID in the parent
    }
}

// =========================================
//FCFS scheduler
// =========================================

void FCFS(){
	struct Node* next_node = pop_head();

	while(next_node != NULL){
		// Get the current process
		struct Process* next_process = current_node->process;
		if(next_process->state == IO){
			printf("Process is perfoming I/0. skipping %s\n", next_process->executable_path);
			append_existing_node(current_node);
			next_node = pop_head();
			continue;
		}
		// Get the time the process started the execution
		struct timespec start_execution_time;
		clock_gettime(CLOCK_MONOTONIC, &start_execution_time);

		// Start the process
		if(next_process->state == STOPPED){
			kill(next_process->pid, SIGCONT);
		}else if(next_process->state == NEW){
			run_process();
		}else{
			printf("Error : Unexpected state");
			exit(1);
		}
		next_process->state = RUNNING;

		while(next_process->state == RUNNING){
			pause(); //Waiting for sigchld 
		}

		// Get the workload time
		update_workload_time(start_execution_time);
		if(next_process->state == EXITED){
					// Print the process stats
			print_process(next_process);

			// Free the memory for node and process
			free_node(next_node);
			printf("\n");
		}else{
			append_existing_node(next_node);
		}
		printf("\n");

		// Get the next node in the queue
		next_node = pop_head();
	}
	// Get the total seconds
	double total_workload_seconds = calculate_total_elapsed_time();
	printf("\nWORKLOAD TIME: %.2f secs \n", total_workload_seconds);
	printf("scheduler exits\n");
}

// =========================================
//RR scheduler
// =========================================

void RR(int quantum){
	struct Node* next_node = pop_head();
	while(next_node != NULL){
		//print_list();

		// Get the current process
		struct Process* process = current_node->process;
		if (process->state == IO){
			printf("Process is perfoming I/0. skipping %s\n", process->executable_path);
			append_existing_node(current_node);
			printf("\n");
			next_node = pop_head();
			continue;
		}
		
		// Get the time the process started the execution
		struct timespec start_execution_time;
		clock_gettime(CLOCK_MONOTONIC, &start_execution_time);
		 
		if(process->state == STOPPED){
			kill(process->pid, SIGCONT);
			printf("Continue proccess -> ");
			print_process_info(process);
		}else if(process->state == NEW){
			run_process();
		}else{
			printf("Error: Unexpected process state  \n");
			return;
		}
		process->state = RUNNING;

		// Wait until quantum and stop child or until child exits 
		int quantum_intervals_count =0;
		while(process->state == RUNNING){
			quantum_sleep(quantum/quatum_intevals);
			quantum_intervals_count +=1;
			if (quantum_intervals_count == quatum_intevals && process->state == RUNNING){
				kill(process->pid, SIGSTOP);
				printf("Quantum reached - Stop proccess -> ");
				print_process_info(process);
			
			
			}
		}

		update_workload_time(start_execution_time);

		if(current_node->process->state == STOPPED || current_node->process->state == IO){	// If child stoped add to queue
			append_existing_node(current_node);
		}else if(current_node->process->state == EXITED ){	// Else if child exited print it's stats
			//printf("Finished - PID: %d - STATE %d - path : %s\n", current_node->process->pid,current_node->process->state, current_node->process->executable_path );
			print_process(current_node->process);
			free_node(current_node);	// Free the memory allocated by the node and the process
		}else{
			printf("Error: Unexpected process state");
			return;
		}
		printf("\n");
		next_node = pop_head();
		
	}
	double total_workload_seconds = calculate_total_elapsed_time();

	printf("\nWORKLOAD TIME: %.2f secs \n", total_workload_seconds);
	printf("scheduler exits\n");
}

// =========================================
// Functions to handle the input
// =========================================
void usage(char * arg0){
	printf("Usage: %s scheduler <policy> [<quantum>] <input_filename>\n", arg0);
	printf("	Example 1: scheduler FCFS homogeneous.txt");
	printf("	Example 2: scheduler RR 1000 homogeneous.txt");
    exit(EXIT_FAILURE);
}

//	Function to parse the arguments
void parse_input(int argc, char *argv[]){
	if (argc < 3) {
        usage(argv[0]);
    }
	// Determine the scheduling algorithm
	char *scheduler = argv[1];
	// Determine the file name
	char *file_path = NULL;
	// Optional: Quantum for Round Robin
	int quantum = -1; // Default value for quantum if not provided
 
	if (strcmp(scheduler, "RR") == 0) {
        if (argc < 4) {
            printf("Error: Quantum must be provided for Round Robin scheduling.\n");
            exit(EXIT_FAILURE);
        }
		file_path = argv[3];
        quantum = atoi(argv[2]);
        if (quantum <= 0) {
            printf("Error: Quantum must be a positive integer.\n");
            exit(EXIT_FAILURE);
        }
    }else if(strcmp(scheduler, "FCFS")==0){
		file_path = argv[2];
	}else{
		printf("Error: Scheduler < %s > does not exist \n", scheduler);
		usage(argv[0]);
	}

	populate_queue_from_file(file_path);

	// Initialize the signal handler 
	// Set up SIGCHLD handler to reap terminated child processes
	/*
	struct sigaction sa;
    sa.sa_handler = &signal_handler; // Set the handler function
    sigemptyset(&sa.sa_mask);        // Block no other signals during execution
    sa.sa_flags = SA_RESTART;        // Restart interrupted system calls if possible

    if (sigaction(SIGCHLD, &sa, NULL) == -1) {
        perror("sigaction");
        exit(1);
    }
	*/
	signal(SIGCHLD, signal_handler);
	//signal(SIGUSR1, sigusr1_handler);

	// Set up with sigaction to ge the pid that sent the sigusr2 signal
	struct sigaction sa_usr1, sa_usr2;
    sa_usr1.sa_flags = SA_SIGINFO;
    sa_usr1.sa_sigaction = sigusr1_handler;
    sigemptyset(&sa_usr1.sa_mask);
    sigaction(SIGUSR1, &sa_usr1, NULL);
    sa_usr2.sa_flags = SA_SIGINFO;
    sa_usr2.sa_sigaction = sigusr2_handler;
    sigemptyset(&sa_usr2.sa_mask);
    sigaction(SIGUSR2, &sa_usr2, NULL);
    
	if (strcmp(scheduler, "RR") == 0) {
		RR(quantum);
    }else{
		FCFS(quantum);
	}


}

int main(int argc,char **argv)
{
	parse_input(argc, argv);

	return 0;
}
