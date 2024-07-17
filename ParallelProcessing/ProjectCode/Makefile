CC=gcc
CFLAGS=-Wall -O3 -fopenmp
CFLAGS+=-DDEBUG
LDLIBS=-lm

NUM_THREADS=8
NUM_PROCS=8


all: multistart_mds_seq multistart_mds_omp multistart_mds_omp_tasks multistart_mds_mpi

multistart_mds_seq: multistart_mds_seq.c torczon.c Makefile
	$(CC) $(CFLAGS) -o multistart_mds_seq multistart_mds_seq.c torczon.c $(LDLIBS)

multistart_mds_omp: multistart_mds_omp.c torczon.c Makefile
	$(CC) $(CFLAGS) -o multistart_mds_omp multistart_mds_omp.c torczon.c $(LDLIBS)

multistart_mds_omp_tasks: multistart_mds_omp_tasks.c torczon.c Makefile
	$(CC) $(CFLAGS) -o multistart_mds_omp_tasks multistart_mds_omp_tasks.c torczon.c $(LDLIBS)

multistart_mds_mpi: multistart_mds_mpi.c torczon.c Makefile
	mpicc $(CFLAGS) -o multistart_mds_mpi multistart_mds_mpi.c torczon.c $(LDLIBS)

clean:
	rm -f multistart_mds_seq multistart_mds_omp multistart_mds_omp_tasks multistart_mds_mpi

run_serial:
	./multistart_mds_seq 
	
run_omp:
	./multistart_mds_omp $(NUM_THREADS)

run_omp_tasks:
	./multistart_mds_omp_tasks $(NUM_THREADS)

run_mpi:
	mpirun --oversubscribe -np $(NUM_PROCS) ./multistart_mds_mpi
