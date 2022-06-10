const express = require('express');
const { signin, signup } = require('../controller/auth');
const { protect, authorize } = require('../middleware/protect');

const router = express.Router();

// api/v1/auth
router.route(`/signin`).post(signin);
router.use(protect);
router.route('/signup').post(authorize(), signup);

module.exports = router;
