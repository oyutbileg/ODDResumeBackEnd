const MyError = require("../utils/myerror");
const asyncHandler = require("express-async-handler");
const Sequelize = require("sequelize");
const responseHandler = require("../utils/responseHandler");
const Op = Sequelize.Op;

// SignUp Function
exports.signup = asyncHandler(async (req, res) => {
  await req.db.sysUser.create(req.body);
  responseHandler(res, {
    data: {}
  })
});

// SignIn Function
exports.signin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new MyError("Имэйл болон нууц үгээ дамжуулна уу.", 404);
  }

  const user = await req.db.sysUser
    .findOne({
      where: {
        email: {
          [Op.eq]: email,
        },
      },
    });

  if (!user) {
    throw new MyError("Бүртгэлгүй хэрэглэгч!", 401);
  }

  const ok = await user.checkPassword(password, user);

  if (!ok) {
    throw new MyError("Имэйл болон нууц үгээ зөв оруулна уу.", 401);
  }

  const credentials = user.getJWT(user);

  responseHandler(res, {
    token: credentials.token,
    refresh: credentials.refresh,
    user: {
      name: user.first_name,
      email: user.email
    },
  });
});
