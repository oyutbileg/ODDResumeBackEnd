const express = require('express');
const { alive, getUsers, getPortfolio } = require('../controller/app');
const { siteProtect } = require('../middleware/protect');
const router = express.Router();
// api/v1
router.route('/alive').get(alive);
router.route('/users').get(siteProtect, getUsers);
router.route('/portfolio/:portfolioId/').get(siteProtect, getPortfolio);

module.exports = router;
