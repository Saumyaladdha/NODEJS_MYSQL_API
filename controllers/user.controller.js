const models = require('../models');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();


function signUp(req, res) {
    models.User.findOne({ where: { email: req.body.email } })
        .then(user => {
            if (user) {
                res.status(400).json({ message: "Email already exists" });
            } else {
                bcryptjs.genSalt(10, function(err, salt) {
                    if (err) {
                        return res.status(500).json({
                            message: "Error generating salt",
                            error: err
                        });
                    }

                    bcryptjs.hash(req.body.password, salt, function(err, hash) {
                        if (err) {
                            return res.status(500).json({
                                message: "Error hashing password",
                                error: err
                            });
                        }

                        const newUser = {
                            name: req.body.name,
                            email: req.body.email,
                            password: hash
                        };

                        models.User.create(newUser)
                            .then(result => {
                                res.status(201).json({
                                    message: "User created successfully"
                                });
                            })
                            .catch(error => {
                                res.status(500).json({
                                    message: "Error creating user",
                                    error: error
                                });
                            });
                    });
                });
            }
        })
        .catch(error => {
            res.status(500).json({
                message: "Something went wrong",
                error: error
            });
        });
}

function login(req, res) {
    models.User.findOne({ where: { email: req.body.email } })
        .then(user => {
            if (!user) {
                return res.status(401).json({ message: "Invalid credentials" });
            }

            bcryptjs.compare(req.body.password, user.password, function(err, result) {
                if (err) {
                    return res.status(500).json({
                        message: "Error comparing passwords",
                        error: err
                    });
                }

                if (result) {
                    const token = jwt.sign({
                        email: user.email,
                        userId: user.id
                    }, process.env.JWT_KEY);

                    res.status(200).json({
                        message: "Authentication complete",
                        token: token
                    });
                } else {
                    res.status(401).json({ message: "Invalid credentials" });
                }
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Something went wrong",
                error: error
            });
        });
}

module.exports = {
    signUp: signUp,
    login: login
};
