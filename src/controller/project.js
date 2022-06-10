const MyError = require("../utils/myerror");
const asyncHandler = require("express-async-handler");
const responseHandler = require("../utils/responseHandler");
const Sequelize = require("sequelize");
const Constants = require("../constants/constants");
const Op = Sequelize.Op;
const paginate = require("../utils/paginate-sequelize");

exports.index = asyncHandler(async (req, res, next) => {
  const page = parseInt(req.query.page) || Constants.DEFAULT_PAGE;
  const limit = parseInt(req.query.limit) || Constants.DEFAULT_LIMIT;
  const sort = req.query.sort;
  let select = req.query.select;

  if (select) {
    select = select.split(" ");
  }

  ["select", "sort", "page", "limit"].forEach((el) => delete req.query[el]);

  const pagination = await paginate(page, limit, req.db.project, { where: { sysUserId: req.userId } });

  let query = { offset: pagination.start - 1, limit };

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

  const projects = await req.db.project.findAll({
    ...query,
    where: {
      sysUserId: {
        [Op.eq]: req.userId
      }
    }
  });

  responseHandler(res, {
    total: pagination.total,
    list: projects,
    pagination,
  })
});

exports.create = asyncHandler(async (req, res, next) => {
  req.body.sysUserId = req.userId;
  const project = await req.db.project.create(req.body, { attributes: ['project_name'] });
  responseHandler(res, {
    data: project
  })
});

exports.update = asyncHandler(async (req, res, next) => {
  req.body.sysUserId = req.userId;
  const project = await req.db.project.findOne({
    where: {
      [Op.and]: [
        {
          id: {
            [Op.eq]: req.params.projectId
          }
        },
        {
          sysUserId: {
            [Op.eq]: req.userId
          }
        }

      ]

    }
  });

  if (!project) {
    throw new MyError(req.params.projectId + " project not found", 404);
  }

  req.body.modified_at = new Date();
  await project.update({ ...req.body }, { attributes: ['project_name'] });

  responseHandler(res, {
    data: project
  })
});

exports.destroy = asyncHandler(async (req, res, next) => {
  const project = await req.db.project.findOne({
    where: {
      [Op.and]: [
        {
          id: {
            [Op.eq]: req.params.projectId
          }
        },
        {
          sysUserId: {
            [Op.eq]: req.userId
          }
        }
      ]
    }
  });

  if (!project) {
    throw new MyError(req.params.projectId + " project not found", 404);
  }

  await project.destroy();

  responseHandler(res, {
    data: project
  })
});
