const asyncHandler = require("express-async-handler");
const responseHandler = require("../utils/responseHandler");
const paginate = require("../utils/paginate-sequelize");
const Sequelize = require("sequelize");
const Constants = require("../constants/constants");
const arrayRemoveElement = require("../utils/removePassword");
const Op = Sequelize.Op;

// Greeting Function
exports.alive = asyncHandler(async (_req, res) => {
  responseHandler(res, {
    data: {
      'greetings': '🚀 Hello! Keep going, Good Luck!'
    }
  });
});

exports.getUsers = asyncHandler(async (req, res, _next) => {
  const page = parseInt(req.query.page) || Constants.DEFAULT_PAGE;
  const limit = parseInt(req.query.limit) || Constants.DEFAULT_LIMIT;
  const sort = req.query.sort;
  let select = req.query.select;

  if (select) {
    select = select.split(" ");
  }

  ["select", "sort", "page", "limit"].forEach((el) => delete req.query[el]);

  const pagination = await paginate(page, limit, req.db.sysUser);

  let query = { offset: pagination.start - 1, limit };

  if (Array.isArray(select)) {
    query.attributes = arrayRemoveElement(select, "password");
  } else {
    query.attributes = [
      'first_name',
      'last_name',
      'email',
      'experience',
      'position',
      'photo',
      'portfolio_id'
    ]
  }

  if (sort) {
    query.order = sort
      .split(" ")
      .map((el) => [
        el.charAt(0) === "-" ? el.substring(1) : el,
        el.charAt(0) === "-" ? "DESC" : "ASC",
      ]);
  }

  const users = await req.db.sysUser.findAll({
    ...query
  });

  responseHandler(res, {
    total: pagination.total,
    list: users,
    pagination,
  })
});

exports.getPortfolio = asyncHandler(async (req, res, _next) => {
  const user = await req.db.sysUser.findOne({
    where: {
      portfolio_id: {
        [Op.eq]: req.params.portfolioId
      }
    },
    include: [{
      model: req.db.project, as: "projects",
      attributes: ['project_name', 'description', 'web_url', 'appstore_url', 'playstore_url']
    }],
    attributes: [
      'first_name',
      'last_name',
      'email',
      'experience',
      'description',
      'position',
      'photo',
      'skill_tags'
    ],
  });

  responseHandler(res, {
    data: user
  })
});
