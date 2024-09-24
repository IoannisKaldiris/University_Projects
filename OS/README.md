## About 

This project was developed as part of the course Software Engineering (CEID_1135) at the **[Department of Computer Engineering and Informatics](https://www.ceid.upatras.gr/en/)** at the **[University of Patras](https://www.upatras.gr/en/)**.


This project implements a comprehensive system for managing business information using BASH scripting, parallel processing, and synchronization techniques. It features a menu-driven interface that allows users to select business files, view details, modify entries, display records, and save changes.

## Key Features

1. **File Selection**: Users can specify or default to a business file containing information such as code, name, address, city, postal code, longitude, and latitude.
2. **View Business Details**: Users can input a business code to retrieve and display specific business information.
3. **Modify Business Entries**: Allows users to change business details based on the provided business code and displays the old and new information.
4. **Display All Businesses**: Shows all businesses in a paginated format, pausing for user input to navigate through records.
5. **Save Changes**: Users can save modified records back to the file, with an option to specify a different file name.
6. **Process Synchronization**: Implements a shared memory system to facilitate communication between processes during calculations, enhancing performance through parallel processing.

## Technologies Used

- **[BASH](https://www.gnu.org/software/bash/)**: For shell scripting and creating a user-friendly command-line interface. 
- **[C Programming Language](https://en.wikipedia.org/wiki/C_(programming_language))**: For implementing the Monte Carlo integration with multi-processing.
- **[Makefile](https://www.gnu.org/software/make/)**: To manage the build process of the C programs.
- **[Shared Memory](https://en.wikipedia.org/wiki/Shared_memory)** and **[Semaphores](https://en.wikipedia.org/wiki/Semaphore_(programming))**: For inter-process communication and synchronization in concurrent tasks.
- **[AWK](https://awk.js.org/)** and **[SED](https://en.wikipedia.org/wiki/Sed)**: For text processing within the shell script.

## Prerequisites

- A Unix-like operating system (Linux, macOS)
- BASH shell
- [GCC](https://gcc.gnu.org/) compiler for C
- Basic knowledge of shell scripting and process management


## License

This project is licensed under the MIT License.

