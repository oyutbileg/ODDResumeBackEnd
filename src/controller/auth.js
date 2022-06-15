const MyError = require("../utils/myerror");
const asyncHandler = require("express-async-handler");
const Sequelize = require("sequelize");
const responseHandler = require("../utils/responseHandler");
const Op = Sequelize.Op;
const uuid = require('uuid')
const bcrypt = require("bcrypt");

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

exports.siteSignIn = asyncHandler(async (req, res) => {
  const { site_password } = req.body;

  if (!site_password) {
    throw new MyError("Please enter password!", 404);
  }

  const config = await req.db.config.findByPk(1);

  const ok = await bcrypt.compare(site_password, config.site_password);
  if (!ok) {
    throw new MyError("Check your password!.", 401);
  }

  const { token } = config.getJWT();

  responseHandler(res, {
    token,
    isLoggin: true
  });
});

exports.me = asyncHandler(async (_req, res, _next) => {
  responseHandler(res, {
    data: {
      isLoggin: true
    }
  })
});
