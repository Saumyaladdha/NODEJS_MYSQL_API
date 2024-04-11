'use strict';

const models = require('../models');
const Validator = require('fastest-validator');

function saveComment(req, res) {
    const comment = {
        postId: req.body.postId,
        userId: req.body.userId,
        content: req.body.content
    };

    const schema = {
        postId: { type: "number", optional: false },
        userId: { type: "number", optional: false },
        content: { type: "string", optional: false, max: 500 }
    };

    const v = new Validator();
    const validationResponse = v.validate(comment, schema);

    if (validationResponse !== true) {
        return res.status(400).json({
            message: "Validation Failed",
            errors: validationResponse
        });
    }

    models.Comment.create(comment)
        .then(result => {
            res.status(201).json({
                message: "Comment created successfully",
                comment: result
            });
        })
        .catch(error => {
            console.error('Error while saving comment:', error);
            res.status(500).json({
                message: "Something went wrong",
                error: error
            });
        });
}

function updateComment(req, res) {
    const id = req.params.id;
    const updatedComment = {
        content: req.body.content
    };

    const schema = {
        content: { type: "string", optional: false, max: 500 }
    };

    const v = new Validator();
    const validationResponse = v.validate(updatedComment, schema);

    if (validationResponse !== true) {
        return res.status(400).json({
            message: "Validation Failed",
            errors: validationResponse
        });
    }

    models.Comment.update(updatedComment, { where: { id: id } })
        .then(result => {
            if (result[0] === 1) {
                res.status(200).json({
                    message: "Comment updated successfully",
                    comment: updatedComment
                });
            } else {
                res.status(404).json({
                    message: "Comment not found"
                });
            }
        })
        .catch(error => {
            console.error('Error while updating comment:', error);
            res.status(500).json({
                message: "Something went wrong",
                error: error
            });
        });
}

function destroyComment(req, res) {
    const id = req.params.id;

    models.Comment.destroy({ where: { id: id } })
        .then(result => {
            if (result === 1) {
                res.status(200).json({
                    message: "Comment deleted successfully"
                });
            } else {
                res.status(404).json({
                    message: "Comment not found"
                });
            }
        })
        .catch(error => {
            console.error('Error while deleting comment:', error);
            res.status(500).json({
                message: "Something went wrong",
                error: error
            });
        });
}

module.exports = {
    saveComment: saveComment,
    updateComment: updateComment,
    destroyComment: destroyComment
};
