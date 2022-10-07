const express = require("express");
const { alive, getUsers, getPortfolio } = require("../controller/app");
const { siteProtect } = require("../middleware/protect");
const router = express.Router();
// api/v1
// siteProtect
router.route("/alive").get(alive);
router.route("/users").get(getUsers);
router.route("/portfolio/:portfolioId/").get(getPortfolio);

module.exports = router;
