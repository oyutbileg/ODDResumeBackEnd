const express = require('express');
const { protect } = require('../middleware/protect');
const {
  create,
  update,
  index,
  destroy,
} = require("../controller/project");

const router = express.Router();

// api/v1/project
router.use(protect);
router.route("/").get(index);
router.route("/").post(create);
router.route("/:projectId").put(update);
router.route("/:projectId").delete(destroy);

module.exports = router;
