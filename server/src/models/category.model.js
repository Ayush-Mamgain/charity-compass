const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        index: true,
        unique: true
    },
    charities: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Charity'
        }
    ]
}, { timestamps: true });

export default mongoose.model('Category', categorySchema);