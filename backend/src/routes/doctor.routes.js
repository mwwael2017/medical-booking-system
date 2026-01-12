const express = require('express');
const router = express.Router();
const { getDoctors, createDoctor, updateDoctor, deleteDoctor } = require('../controllers/doctor.controller');

router.route('/:id')
    .put(updateDoctor)
    .delete(deleteDoctor);

router.route('/')
    .get(getDoctors)
    .post(createDoctor);

module.exports = router;
