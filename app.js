const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Import routes
const postsRoute = require('./routes/posts');
const userRoute = require('./routes/user');
const imageRoute = require('./routes/images');
const commentRoute = require('./routes/comments'); // Import commentRoute

// Middleware
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads')); // Serve static files from the 'uploads' directory

// Routes
app.use('/posts', postsRoute); // Endpoint for posts-related routes
app.use('/user', userRoute); // Endpoint for user-related routes
app.use('/images', imageRoute); // Endpoint for image-related routes
app.use('/comments', commentRoute); // Endpoint for comment-related routes

module.exports = app;
