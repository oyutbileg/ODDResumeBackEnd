const express = require('express');
const { protect, authorize } = require('../middleware/protect');
const { register, login, getUsers, blockUser, me, deleteUser, resetPassword, uploadProfile, getUser } = require("../controller/sequelize/user-controller");
const { getUserArticles } = require('../controller/sequelize/article-controller');
const { getUserComments } = require('../controller/sequelize/comment-controller');

const router = express.Router();

// users
router.route('/login').post(login);

router.use(protect);
router.route('/register').post(authorize(), register);
router.route('/profile').put(uploadProfile).get(getUser);
router.route("/").get(getUsers).delete(authorize(), deleteUser);
router.route("/:id").put(authorize(), blockUser);
router.route("/me").get(me);

router.route("/reset-password").post(authorize(), resetPassword);

router.route('/articles').get(getUserArticles);

module.exports = router;
