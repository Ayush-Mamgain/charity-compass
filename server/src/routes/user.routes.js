const userRouter = require('express').Router();
const { registerUser, loginUser, logoutUser, isLoggedIn } = require('../controllers/user.controllers');
const { verifyToken, authN } = require('../middlewares/auth.middleware');


userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);

//secured routes
userRouter.get('/getLoginStatus', authN, isLoggedIn);
userRouter.post('/logout',verifyToken, logoutUser);

module.exports = userRouter;