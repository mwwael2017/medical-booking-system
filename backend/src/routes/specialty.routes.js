const express = require('express');
const router = express.Router();
const { getSpecialties, createSpecialty } = require('../controllers/specialty.controller');

router.route('/')
    .get(getSpecialties)
    .post(createSpecialty);

module.exports = router;
