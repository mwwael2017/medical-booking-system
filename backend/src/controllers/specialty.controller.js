const Specialty = require('../models/Specialty');

exports.getSpecialties = async (req, res) => {
    try {
        const specialties = await Specialty.find();
        res.status(200).json({ success: true, data: specialties });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

exports.createSpecialty = async (req, res) => {
    try {
        const specialty = await Specialty.create(req.body);
        res.status(201).json({ success: true, data: specialty });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};
