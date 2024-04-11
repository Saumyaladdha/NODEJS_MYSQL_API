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




