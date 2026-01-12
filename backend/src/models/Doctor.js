const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    specialtyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Specialty',
        required: true,
    },
    experience: {
        type: Number, // Years of experience
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    image: {
        type: String, // URL or path
    },
    bio: {
        type: String,
    },
    availableDays: {
        type: [String], // e.g., ['Monday', 'Wednesday']
        default: [],
    },
    availableTimeSlots: {
        type: [String], // e.g., ['09:00', '10:00']
        default: [],
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('Doctor', doctorSchema);
