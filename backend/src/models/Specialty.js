const mongoose = require('mongoose');

const specialtySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
    },
    icon: {
        type: String, // Icon name or URL
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('Specialty', specialtySchema);
