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



Usage

Start the server:

bash
Copy code
npm start
The server will start running at http://localhost:3050.



API Endpoints

For detailed information on API endpoints, please refer to the API documentation.

Testing

Unit tests are available in the tests directory.
Run tests using the following command:
bash
Copy code
npm test


markdown
Copy code
## Approach

### Technology Stack

The Blog API is built using the following technologies:

- **Node.js**: Used as the runtime environment for running JavaScript on the server-side.
- **Express.js**: Employed as the web application framework to handle routing and middleware functionalities.
- **MySQL**: Chosen as the relational database management system for storing blog posts, comments, users, and categories.
- **Sequelize**: Utilized as the ORM (Object-Relational Mapping) library for interacting with the MySQL database.
- **JWT (JSON Web Tokens)**: Implemented for user authentication and authorization, providing secure access to protected routes.
- **Multer**: Integrated for handling file uploads, specifically for uploading images for blog posts.

### Development Process

1. **Database Design**: Designed the database schema to efficiently store and manage blog-related data. Established relationships between tables to maintain data integrity.

2. **API Endpoints**: Created RESTful API endpoints for performing CRUD operations on blog posts, comments, and user data. Implemented authentication middleware to secure routes requiring user authentication.

3. **Middleware Integration**: Integrated middleware functions for handling request validation, error handling, and authentication checks. Implemented custom middleware for verifying JWT tokens and protecting routes.

4. **File Uploads**: Implemented file upload functionality using Multer middleware to enable users to upload images for their blog posts.

5. **Testing**: Developed unit tests using Mocha and Chai to ensure the reliability and functionality of API endpoints. Conducted thorough testing to verify correct behavior and error handling.

6. **Documentation**: Documented API endpoints and provided detailed usage instructions in the README file to guide users on setting up and using the API.

### Future Enhancements

- **User Profiles**: Implement user profile functionality to allow users to manage their account settings and information.
- **Pagination**: Incorporate pagination for retrieving large datasets of blog posts to improve performance and usability.
- **Search Functionality**: Integrate search functionality to enable users to search for specific blog posts based on keywords or categories.
- **User Roles and Permissions**: Enhance the authentication system to support different user roles and permissions for managing access to API endpoints.
- **Performance Optimization**: Optimize database queries and API endpoints for improved performance and scalability, especially under heavy load.


