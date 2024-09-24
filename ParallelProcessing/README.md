## About 

This project was developed as part of the course Software Engineering (CEID_1057) at the **[Department of Computer Engineering and Informatics](https://www.ceid.upatras.gr/en/)** at the **[University of Patras](https://www.upatras.gr/en/)**.

This project focuses on **global optimization**, a key research area in applied mathematics with applications in fields like economics, chemistry, biology, and engineering. The goal of global optimization is to find the solution within a set of solutions that provides the global minimum of an objective function, as opposed to just a local minimum.

The project implements the **Multi-Dimensional Search (MDS) algorithm**, a deterministic algorithm that operates on a simplex of points. It finds a local minimum by iterating through reflections, expansions, and contractions of the simplex, without using derivatives. The method is designed to converge on a local minimum, and is applied to different random points within the search space to attempt to find the global minimum using the **Multistart technique**.

The project includes:
- A C implementation of the MDS algorithm (`torczon.c`).
- A **Rosenbrock function** as the test case for optimization, which has a global minimum at the point (1,1,...,1).
- A sequential application (`multistart_mds_seq.c`) that applies the Multistart method to search for the global minimum of the Rosenbrock function in a given search space.

For more information on the Rosenbrock function, refer to [Rosenbrock Function on Wikipedia](http://en.wikipedia.org/wiki/Rosenbrock_function).


### MPI 
1. [OpenMPI](https://www.open-mpi.org/)
2. [MPICH](https://www.mpich.org/)
3. [GCC (GNU Compiler Collection)](https://gcc.gnu.org/)
4. [Intel Fortran Compiler](https://www.intel.com/content/www/us/en/developer/tools/oneapi/fortran-compiler.html)
5. [SLURM](https://slurm.schedmd.com/)
6. [PBS](https://www.pbspro.org/)

### OpenMP
1. [GCC (GNU Compiler Collection)](https://gcc.gnu.org/)
2. [Clang](https://clang.llvm.org/)
3. [Intel C++ Compiler](https://www.intel.com/content/www/us/en/developer/tools/oneapi/dpc-compiler.html)



