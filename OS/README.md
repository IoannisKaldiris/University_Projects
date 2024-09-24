## About 

This project was developed as part of the course Software Engineering (CEID_1135) at the **[Department of Computer Engineering and Informatics](https://www.ceid.upatras.gr/en/)** at the **[University of Patras](https://www.upatras.gr/en/)**.



# Business Management System

This project implements a comprehensive system for managing business information using BASH scripting, parallel processing, and synchronization techniques. It features a menu-driven interface that allows users to select business files, view details, modify entries, display records, and save changes.

## Key Features

1. **File Selection**: Users can specify or default to a business file containing information such as code, name, address, city, postal code, longitude, and latitude.
2. **View Business Details**: Users can input a business code to retrieve and display specific business information.
3. **Modify Business Entries**: Allows users to change business details based on the provided business code and displays the old and new information.
4. **Display All Businesses**: Shows all businesses in a paginated format, pausing for user input to navigate through records.
5. **Save Changes**: Users can save modified records back to the file, with an option to specify a different file name.
6. **Process Synchronization**: Implements a shared memory system to facilitate communication between processes during calculations, enhancing performance through parallel processing.

## Technologies Used

- **BASH**: For shell scripting and creating a user-friendly command-line interface. 
- **C Programming Language**: For implementing the Monte Carlo integration with multi-processing.
- **Makefile**: To manage the build process of the C programs.
- **Shared Memory and Semaphores**: For inter-process communication and synchronization in concurrent tasks.
- **AWK and SED**: For text processing within the shell script.

## Prerequisites

- A Unix-like operating system (Linux, macOS)
- BASH shell
- GCC compiler for C
- Basic knowledge of shell scripting and process management

## Getting Started

To get started, clone this repository and follow the instructions in the `INSTALL.md` file for setting up the environment and running the scripts.

## Contribution

Feel free to contribute by submitting pull requests or reporting issues.

## License

This project is licensed under the MIT License.

