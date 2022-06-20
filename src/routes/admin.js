const express = require('express');
const { adminRole, deleteUser, createConfig, changeConfigPassword } = require('../controller/admin');
const { protect, authorize } = require('../middleware/protect');

const router = express.Router();

// api/v1/admin
router.use(protect);
router.use(authorize());
router.route('/is-admin/:id').put(adminRole);
router.route('/config').post(createConfig);
router.route('/config/change-password').post(changeConfigPassword);
router.route('/:id').delete(deleteUser);

module.exports = router;
