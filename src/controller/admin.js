const MyError = require("../utils/myerror");
const asyncHandler = require("express-async-handler");
const Sequelize = require("sequelize");
const responseHandler = require("../utils/responseHandler");
const Op = Sequelize.Op;

exports.adminRole = asyncHandler(async (req, res, _next) => {
  const user = await req.db.sysUser.findOne({
    where: {
      id: {
        [Op.eq]: req.params.id,
      },
    },
  });

  if (!user) {
    throw new MyError(req.params.id + " user not found.", 400);
  }

  if (user.id !== 1) {
    await user.update(req.body);
  } else {
    throw new MyError("This action isn't allowed for root user.", 404);
  }

  responseHandler(res, {
    data: {},
  })
});

exports.deleteUser = asyncHandler(async (req, res, _next) => {
  const user = await req.db.sysUser.findByPk(req.params.id);

  if (!user) {
    throw new MyError(
      req.params.id + " user not found.",
      404
    );
  }

  if (user.id !== 1) {
    user.destroy();
  } else {
    throw new MyError("This action isn't allowed for root user.", 404);
  }

  responseHandler(res, {
    data: {}
  });
});

exports.createConfig = asyncHandler(async (req, res, _next) => {
  await req.db.config.create(req.body);
  responseHandler(res, {
    data: {}
  })
});
