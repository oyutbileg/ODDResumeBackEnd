const express = require('express');
const { alive } = require('../controller/app');

const router = express.Router();

router.route('/').get(alive);

module.exports = router;
