const express = require('express');
const { signin, signup, siteSignIn, me } = require('../controller/auth');
const { protect, authorize, siteProtect } = require('../middleware/protect');

const router = express.Router();

// api/v1/auth
router.route('/site/signin').post(siteSignIn);
router.route(`/signin`).post(signin);
router.route('/site/me').get(siteProtect, me);
router.use(protect);
router.route('/signup').post(authorize(), signup);

module.exports = router;
