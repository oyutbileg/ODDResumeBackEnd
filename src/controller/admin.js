const MyError = require("../utils/myerror");
const asyncHandler = require("express-async-handler");
const paginate = require("../utils/paginate-sequelize");
const Sequelize = require("sequelize");
const responseHandler = require("../utils/responseHandler");
const Op = Sequelize.Op;

exports.getUsers = asyncHandler(async (req, res, next) => {
  const page = parseInt(req.query.page) || Constants.DEFAULT_PAGE;
  const limit = parseInt(req.query.limit) || Constants.DEFAULT_LIMIT;
  const sort = req.query.sort;
  let select = req.query.select;

  if (select) {
    select = select.split(" ");
  }

  ["select", "sort", "page", "limit"].forEach((el) => delete req.query[el]);

  const pagination = await paginate(page, limit, req.db.user);

  let query = { offset: pagination.start - 1, limit };

  if (req.query) {
    query.where = req.query;
  }

  if (select) {
    query.attributes = select;
  }

  if (sort) {
    query.order = sort
      .split(" ")
      .map((el) => [
        el.charAt(0) === "-" ? el.substring(1) : el,
        el.charAt(0) === "-" ? "DESC" : "ASC",
      ]);
  }

  const users = await req.db.user.findAll(query);

  responseHandler(res, {
    data: users,
    pagination,
  })
});


exports.blockUser = asyncHandler(async (req, res, next) => {
  const user = await req.db.user.update(req.body, {
    where: {
      id: {
        [Op.eq]: req.params.id,
      },
    },
  });

  if (!user) {
    throw new MyError(req.params.id + " ID-тэй хэрэглэгч байхгүй.", 400);
  }

  responseHandler(res, {
    data: user,
  })
});


exports.deleteUser = asyncHandler(async (req, res, next) => {
  const user = await req.db.user.findByPk(req.body.id);

  if (!user) {
    throw new MyError(
      req.body.id + " ID-тэй хэрэглэгч байхгүй байна.",
      404
    );
  }

  if (!user.id === 1) {
    user.destroy();
  } else {
    throw new MyError("Админ хэрэглэгч устгах боломжгүй.",
      404
    );
  }

  responseHandler(res, {
    data: user,
  });
});
