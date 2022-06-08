const express = require('express');
const { protect, authorize } = require('../middleware/protect');
const { signin, signup } = require('../controller/auth');

const router = express.Router();

// auth
router.route(`/signin`).post(signin);
router.route('/signup').post(signup);

module.exports = router;
