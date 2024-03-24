const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');
const User = require('../models/user.model');

const registerUser = asyncHandler(async function (req, res, next) {
    //get the details from request
    const { username, email, password, confirmPassword } = req.body;

    //validate
    if([username, email, password, confirmPassword].some(field => !field || field.trim() === ''))
        throw new ApiError(400, 'All fields are required');

    //check if user already exists
    const existedUser = await User.findOne({email});
    if(existedUser)
        throw new ApiError(409, 'User already exists');

    //match the passwords
    if(password !== confirmPassword) 
        throw new ApiError(400, 'Passwords do not match');

    //create entry in the database
    const user = await User.create({
        username,
        email,
        password
    });

    //remove the password and token
    const createdUser = await User.findById(user._id).select(
        '-password -refreshToken'
    );
    if(!createdUser)
        throw new ApiError(500, 'Something went wrong while creating the user');

    //return the res.
    return res.status(200).json(
        new ApiResponse(201, createdUser, 'User registered successfully'),
    );
});

module.exports = registerUser;