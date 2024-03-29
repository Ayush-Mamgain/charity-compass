const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');
const Charity = require('../models/charity.model')
const Category = require('../models/category.model');

const getCharities = asyncHandler(async (req, res) => {
    //get the category name from req.
    const { categoryName } = req.body;

    //validate
    if(!categoryName)
        throw new ApiError(400, 'Category Name not received from request');

    //find the category corresponding to that name
    const category = await Category.findOne({name: categoryName});
    if(!category)
        throw new ApiError(402, 'Invalid Category');

    //get all the charities of that category
    const charities = [];
    for(let charityId of category.charities)
        charities.push(await Charity.findById(charityId));

    //return the charities in response
    return res.status(200).json(new ApiResponse(200, charities, 'Required charities fetched successfully'))

});

module.exports = { getCharities };