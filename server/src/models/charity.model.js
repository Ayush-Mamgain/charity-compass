const mongoose = require('mongoose');

const bankSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    ifscCode: {
        type: String,
        trim: true,
        required: true
    },
    accountNumber: {
        type: String,
        trim: true,
        required: true
    }
});

const charitySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        index: true,
        maxLength: 20
    },
    description: {
        type: String,
        required: true,
        trim: true,
        maxLength: 200
    },
    website: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
        index: true
    },
    address: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address',
        required: true
    },
    banks: [bankSchema],
    donationLink: {
        type: String,
        required: true,
        trim: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    image: {
        type: String,
    }
}, { timestamps: true });

export default mongoose.model('Charity', charitySchema);