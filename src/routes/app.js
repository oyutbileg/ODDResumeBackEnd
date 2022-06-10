const express = require('express');
const { alive, getPortfolio, getUsers } = require('../controller/app');

const router = express.Router();

// api/v1
router.route('/alive').get(alive);
router.route('/users').get(getUsers);
router.route('/portfolio/:portfolioId/').get(getPortfolio);

module.exports = router;
