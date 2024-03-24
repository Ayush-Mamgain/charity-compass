const userRouter = require('express').Router();
const registerUser = require('../controllers/user.controllers');

userRouter.post('/register', registerUser);

module.exports = userRouter;