const express = require('express');
const models = require('../models');
const Validator = require('fastest-validator');

function save(req, res) {
    const post = {
        title: req.body.title,
        content: req.body.content,
        imageUrl: req.body.image_url,
        categoryId: req.body.category_id,
        userId: req.userData.id // Assuming userId is available in req.userData
    };

    const schema = {
        title: { type: "string", optional: false, max: "100" },
        content: { type: "string", optional: false, max: 500 },
        categoryId: { type: "number", optional: false }
    };

    const v = new Validator();
    const validationResponse = v.validate(post, schema);

    if (validationResponse !== true) {
        return res.status(400).json({
            message: "Validation Failed",
            errors: validationResponse
        });
    }

    models.Category.findByPk(req.body.category_id).then(category => {
        if (!category) {
            return res.status(404).json({
                message: "Category not found"
            });
        }
        
        models.Post.create(post)
            .then(result => {
                res.status(201).json({
                    message: "Post created successfully",
                    post: result
                });
            })
            .catch(error => {
                res.status(500).json({
                    message: "Something went wrong",
                    error: error
                });
            });
    }).catch(error => {
        console.error('Error while finding category:', error);
        res.status(500).json({
            message: "Something went wrong",
            error: error
        });
    });
}

function show(req, res) {
    const id = req.params.id;

    models.Post.findByPk(id)
        .then(result => {
            if (!result) {
                return res.status(404).json({
                    message: "Post not found"
                });
            }
            res.status(200).json(result);
        })
        .catch(error => {
            console.error('Error while fetching post:', error);
            res.status(500).json({
                message: "Something went wrong"
            });
        });
}

function index(req, res) {
    models.Post.findAll()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(error => {
            res.status(500).json({
                message: "Something went wrong"
            });
        });
}

function update(req, res) {
    const id = req.params.id;
    const updatedPost = {
        title: req.body.title,
        content: req.body.content,
        imageUrl: req.body.image_url,
        categoryId: req.body.category_id
    };

    const schema = {
        title: { type: "string", optional: false, max: "100" },
        content: { type: "string", optional: false, max: 500 },
        categoryId: { type: "number", optional: false }
    };

    const v = new Validator();
    const validationResponse = v.validate(updatedPost, schema);

    if (validationResponse !== true) {
        return res.status(400).json({
            message: "Validation Failed",
            errors: validationResponse
        });
    }

    const userId = req.userData.id; // Assuming userId is available in req.userData

    models.Post.update(updatedPost, { where: { id: id, userId: userId } })
        .then(result => {
            if (result[0] === 1) {
                res.status(200).json({
                    message: "Post updated successfully",
                    post: updatedPost
                });
            } else {
                res.status(404).json({
                    message: "Post not found or not authorized to update"
                });
            }
        })
        .catch(error => {
            console.error('Error while updating post:', error);
            res.status(500).json({
                message: "Something went wrong"
            });
        });
}

function destroy(req, res) {
    const id = req.params.id;
    const userId = req.userData.id; // Assuming userId is available in req.userData

    models.Post.destroy({ where: { id: id, userId: userId } })
        .then(result => {
            if (result === 1) {
                res.status(200).json({
                    message: "Post deleted successfully"
                });
            } else {
                res.status(404).json({
                    message: "Post not found or not authorized to delete"
                });
            }
        })
        .catch(error => {
            console.error('Error while deleting post:', error);
            res.status(500).json({
                message: "Something went wrong",
                error: error
            });
        });
}

module.exports = {
    save: save,
    show: show,
    index: index,
    update: update,
    destroy: destroy
};
