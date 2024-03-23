const mongoose = require('mongoose');

const charitySchema = new mongoose.Schema({

}, { timestamps: true });

export default mongoose.model('Charity', charitySchema);