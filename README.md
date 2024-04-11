# Blog API

This is a RESTful API for managing blog posts, comments, user authentication, and image uploads.

## Features

- Create, read, update, and delete blog posts.
- Add comments to blog posts.
- User authentication using JWT.
- Upload images for blog posts.



## Database Setup

1. Set up a MySQL database with the following tables:
   - `Users`: Table for storing user information.
   - `Posts`: Table for storing blog posts.
   - `Comments`: Table for storing comments on blog posts.
   - `Categories`: Table for storing categories to classify blog posts.

   ```sql
   -- SQL queries to create tables
   CREATE TABLE Users (
       id INT AUTO_INCREMENT PRIMARY KEY,
       name VARCHAR(255) NOT NULL,
       email VARCHAR(255) NOT NULL UNIQUE,
       password VARCHAR(255) NOT NULL
   );

   CREATE TABLE Posts (
       id INT AUTO_INCREMENT PRIMARY KEY,
       title VARCHAR(255) NOT NULL,
       content TEXT NOT NULL,
       imageUrl VARCHAR(255),
       categoryId INT,
       userId INT,
       FOREIGN KEY (categoryId) REFERENCES Categories(id),
       FOREIGN KEY (userId) REFERENCES Users(id)
   );

   CREATE TABLE Comments (
       id INT AUTO_INCREMENT PRIMARY KEY,
       content TEXT NOT NULL,
       postId INT,
       userId INT,
       FOREIGN KEY (postId) REFERENCES Posts(id),
       FOREIGN KEY (userId) REFERENCES Users(id)
   );

   CREATE TABLE Categories (
       id INT AUTO_INCREMENT PRIMARY KEY,
       name VARCHAR(255) NOT NULL
   );
## Installation

#Clone the repository, navigate to the project directory, and install dependencies:
```bash
git clone https://github.com/Saumyaladdha/NODEJS_MYSQL_API/
cd NODEJS_MYSQL_API
npm install

```
## Usage
Start the server:
```bash
npm start
```
The server will start running at http://localhost:3050.

## Testing

Unit tests are available in the tests directory.
Run tests using the following command:
```bash
npm test
```

## Approach
# Technology Stack
- Node.js: Runtime environment for server-side JavaScript.
- Express.js: Web application framework for routing and middleware.
- MySQL: Relational database management system.
- Sequelize: ORM library for MySQL database interactions.
- JWT (JSON Web Tokens): Authentication and authorization.
- Multer: Middleware for handling file uploads

# Development Process
- Database Design: Efficient schema design with relational integrity.
- API Endpoints: Creation of RESTful endpoints.
- Middleware Integration: Incorporating middleware for validation, error handling, and authentication.
- File Uploads: Implementing Multer for image uploads.
- Testing: Ensuring reliability with unit tests.
-Documentation: Detailed instructions for setup and usage




