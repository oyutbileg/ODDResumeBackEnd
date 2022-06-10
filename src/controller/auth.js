const MyError = require("../utils/myerror");
const asyncHandler = require("express-async-handler");
const Sequelize = require("sequelize");
const responseHandler = require("../utils/responseHandler");
const Op = Sequelize.Op;
const uuid = require('uuid')

// SignUp Function
exports.signup = asyncHandler(async (req, res) => {
  req.body.portfolio_id = uuid.v4();
  req.body.password = 'mobicom1';
  await req.db.sysUser.create(req.body);
  responseHandler(res, {
    data: {}
  })
});

// SignIn Function
exports.signin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new MyError("Please enter email and password!", 404);
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
    throw new MyError("User Not Found!", 401);
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
