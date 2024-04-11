const express = require('express');
const commentController = require('../controllers/comment.controller');
const checkAuthMiddleware = require('../middleware/check-auth');

const router = express.Router();

router.post("/", checkAuthMiddleware.checkAuth, commentController.saveComment);
router.patch("/:id", checkAuthMiddleware.checkAuth, commentController.updateComment);
router.delete("/:id", checkAuthMiddleware.checkAuth, commentController.destroyComment);

module.exports = router;
