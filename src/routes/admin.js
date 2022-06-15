const express = require('express');
const { route } = require('express/lib/application');
const { adminRole, deleteUser, createConfig } = require('../controller/admin');
const { protect, authorize } = require('../middleware/protect');

const router = express.Router();

// api/v1/admin
router.use(protect);
router.use(authorize());
router.route('/is-admin/:id').put(adminRole);
router.route('/config').post(createConfig);
router.route('/:id').delete(deleteUser);

module.exports = router;
