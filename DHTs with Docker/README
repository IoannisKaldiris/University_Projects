# Distributed Hash Tables (DHTs) with Chord & Pastry (Using Docker)

## Project Overview

This project was developed as part of my university coursework on **Decentralized Data Technologies**. It involves the **implementation and experimental evaluation** of **Distributed Hash Tables (DHTs)**, specifically the **Chord and Pastry** protocols. The goal is to explore the efficiency of decentralized data structures for storing and retrieving key-value pairs while utilizing **Docker containers, multi-threading, and socket communication**.

The project follows the objectives outlined in the **Decentralized Data Engineering and Technologies** course, focusing on:
- **Implementation and performance evaluation** of fundamental operations: Insert key, Delete key, Update key, Lookup (key), Node Join, and Node Leave.
- **Use of Docker and Containers** to simulate a realistic cloud-based distributed system.
- **Comparison of Chord and Pastry DHTs** based on the number of hops required for each operation.
- **Utilization of the Coffee Reviews Dataset** to evaluate query efficiency in a real-world scenario.
- **Experimental benchmarking of distributed lookups and retrieval speeds.**

## Features

- **Implementation of Chord and Pastry DHTs** for efficient key-value storage
- **Decentralized peer-to-peer architecture** with no central authority
- **Multi-threaded environment** for handling multiple requests concurrently
- **Dockerized deployment** for scalable and isolated execution
- **Experimental performance evaluation** of key operations such as insert, lookup, delete, node join, and node leave
- **Use of real-world dataset** (Coffee Reviews Dataset) for testing and benchmarking

## Technologies Used

- **Python** (for implementing Chord & Pastry DHTs)
- **Docker & Docker Compose** (for containerized execution)
- **Sockets & Multi-threading** (for distributed communication between nodes)
- **Pandas** (for dataset processing)

## Project Structure

```
│── chord.py               # Implementation of the Chord protocol
│── pastry.py              # Implementation of the Pastry protocol
│── docker-compose.yml     # Docker configuration for multi-node deployment
│── Dockerfile             # Image setup for running nodes in containers
│── coffee_analysis.csv    # Dataset used for experimental evaluation
│── report.pdf             # Detailed analysis of the project and findings
```

## Running the Project

### 1️⃣ Using Docker (Recommended)

To deploy the Chord and Pastry DHTs using Docker, follow these steps:

1. **Clean up previous Docker instances (if any):**
   ```sh
   docker system prune -a   # Delete all containers, networks, and images
   ```
2. **Create the required network:**
   ```sh
   docker network create chord_network  # Create a new network
   ```
3. **Build and run the Docker containers:**
   ```sh
   docker-compose up --build
   ```
4. The system will launch multiple Chord & Pastry nodes in separate containers.
5. Check logs for performance metrics and node interactions.

### Dockerfile Configuration

The `Dockerfile` contains the following commands:
```Dockerfile
# Use the latest Python version 
FROM python:3.9

# Definition of the working directory in the container
WORKDIR /app

# Copy the files to the container
COPY . /app

# Install required libraries
RUN pip install pandas

# Opening of ports for communication between nodes
EXPOSE 5300-5310

# Script execution chord/pastry.py
CMD ["python", "pastry.py"]
```

### 2️⃣ Running Locally (Without Docker)

If you prefer to run the system manually:

```sh
python chord.py
python pastry.py
```

Ensure that multiple instances are executed to simulate a real peer-to-peer network.

## Experimental Evaluation

The project evaluates the performance of **Chord vs Pastry** by measuring the execution time for:

- Data insertions
- Key lookups
- Key deletions
- Node joins & departures

## Project Report

A detailed **analysis and evaluation** of this project is available in the `report.pdf` file, covering:

- Performance comparison between Chord & Pastry
- Discussion on scalability & fault tolerance
- Experimental findings on lookup, deletion, and insertion speeds
- Evaluation of distributed network efficiency using Docker

