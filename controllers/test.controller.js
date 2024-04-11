// Import necessary modules
const models = require('../models');

// Define the test function
async function test(req, res) {
    try {
        // One-to-One: User has one Address and Address belongs to one User
        const userWithAddress = await models.User.findOne({
            where: { id: req.params.userId }, 
            include: [{ model: models.Address }] 
        });

        // One-to-Many: User has many Posts
        const userWithPosts = await models.User.findOne({
            where: { id: req.params.userId }, 
            include: [{ model: models.Post }] 
        });

        // Many-to-Many: Post belongs to many Categories
        const postWithCategories = await models.Post.findOne({
            where: { id: req.params.postId }, 
            include: [{ model: models.Category }] 
        });

        // Return the results
        res.status(200).json({
            userWithAddress: userWithAddress,
            userWithPosts: userWithPosts,
            postWithCategories: postWithCategories
        });
    } catch (error) {
        // Handle errors
        console.error('Error:', error);
        res.status(500).json({
            message: "Something went wrong",
            error: error
        });
    }
}

// Export the test function
module.exports = {
    test: test
};
