# Rentomatic

## About 

This software was developed as part of the course Software Engineering (CEID_24Y334) at the **[Department of Computer Engineering and Informatics](https://www.ceid.upatras.gr/en/)** at the **[University of Patras](https://www.upatras.gr/en/)**. It has two objectives. First, to familiarize yourself with the design, implementation, data input, and processing in a relational Database (DB). Second, to use JDBC technology to connect the DB with Graphical User Interfaces (GUIs) implemented in Java, gaining experience in designing a more complete application.  

As part of the project, you will study the relational schema of the DB, extend it with additional fields and new tables, and insert an appropriate number of records. Note that the database resembles the one used in lab exercises, ensuring a better understanding of the problem you'll be managing.  

### Description:
The DB concerns an on-demand movie service for a TV content provider. The following functional requirements are covered by the provided relational schema:  
- For each movie, a unique code, title, description, release year, language(s) it’s available in, duration, rating, and special edition features are stored.  
- For each language, a unique code and name are stored in the system.  
- For each actor in a movie, a unique code, first name, and last name are stored.  
- An actor can participate in many movies, and a movie can have many actors.  
- Information is kept for movie categories (unique code in the system and genre, e.g., drama, comedy, etc.).  
- No category belongs to another category. A movie can belong to multiple categories, and multiple movies can belong to the same category.  
- For each customer, the following information is stored: unique code, first name, last name, email, address, active status, and registration date.  
- For simplicity, the email serves as the customer’s username in the service, and no password is used.  
- For each address, a unique code, street name and number, area, city, postal code, and phone number are stored.  
- For each city, a unique code, city name, and country are stored.  
- Similarly, for the country, a unique code and country name are stored.  
- Each customer has one address, while the same address can belong to multiple customers.  
- Each city contains many addresses, and each country contains many cities.  
- The service offers customers a catalog of movies available for viewing with a charge. The catalog doesn't need to contain all the movies registered in the DB. Customers can select and request to watch any movie from the catalog.  
- For a movie rental request, a unique code, rental date, catalog movie code, and customer code are stored.  
- Each customer can rent any movie (the same or different), and all movies are available to all customers, regardless of whether someone else is watching the movie. The customer pays for each rental request.  
- For each payment, a unique code, customer code, rental request code, payment amount, and payment date are stored.  
- A payment corresponds to one movie rental request.

---

### Explanation for GitHub README:

This project focuses on building a relational database system for an on-demand movie service provider. It aims to familiarize developers with database design, data insertion, and manipulation using JDBC to create a complete application with a Java-based GUI.

Key features include managing movies, actors, categories, customers, and rental information. The relational schema allows for handling complex relationships such as actors participating in multiple movies, customers having unique addresses, and movies belonging to various genres. Customers can rent movies from a catalog and make payments for each rental, with detailed transaction and customer information stored in the database.

This project provides an excellent opportunity to explore database expansion, assumption-based system design, and practical application development.


### Team

- [Ioannis Kaldiris](https://github.com/IoannisKaldiris)


## Front-End-Tools

- [Redux](https://redux.js.org)
- [React-Router](https://reactrouter.com/en/main)
- [Chakra UI](https://v2.chakra-ui.com)

## Back-End-Tools

- [express](https://expressjs.com)
- [mysql](https://www.npmjs.com/package/mysql)
- [cors](https://www.npmjs.com/package/cors)
- [nodemon](https://www.npmjs.com/package/nodemon)
### Prerequisites

- Python 3.8+
- Pip
- Virtualenv (Optional)
