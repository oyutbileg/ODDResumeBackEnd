const express = require('express');
const { protect, authorize } = require('../middleware/protect');
const {
  create,
  update,
  destroy,
  getAll,
} = require("../controller/skillTag");

const router = express.Router();

// api/v1/tag
router.use(protect);
router.route("/").get(getAll);
router.route("/").post(authorize(), create);
router.route("/:tagId").put(authorize(), update);
router.route("/:tagId").delete(authorize(), destroy);

module.exports = router;
