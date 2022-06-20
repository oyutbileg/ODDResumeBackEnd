const express = require('express');
const { protect, authorize } = require('../middleware/protect');
const { me, changePassword, update, uploadPhoto, changeOrder } = require("../controller/user");

const router = express.Router();

// api/v1/user
router.use(protect);
router.route("/").put(update);
router.route("/me").get(me);
router.route("/upload-photo").put(uploadPhoto);
router.route("/change-password").post(changePassword);
router.route('/change-order').post(authorize(), changeOrder);

module.exports = router;
