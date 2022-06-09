const MyError = require("../utils/myerror");
const asyncHandler = require("express-async-handler");
const responseHandler = require("../utils/responseHandler");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

exports.index = asyncHandler(async (req, res, next) => {
  const tags = await req.db.skillTag.findAll({ attributes: ['tag'] });
  responseHandler(res, {
    data: {
      tags
    }
  })
});

exports.create = asyncHandler(async (req, res, next) => {
  const tag = await req.db.skillTag.create(req.body);
  responseHandler(res, {
    data: tag
  })
});

exports.update = asyncHandler(async (req, res, next) => {
  const tag = await req.db.skillTag.findOne({
    where: {
      id: {
        [Op.eq]: req.params.tagId
      }
    }
  });

  if (!tag) {
    throw new MyError(req.params.tagId + " ID-тэй skillTag олдсонгүй!", 404);
  }

  req.body.modified_at = new Date();
  await tag.update({ ...req.body });

  responseHandler(res, {
    data: tag
  })
});

exports.destroy = asyncHandler(async (req, res, next) => {
  const tag = await req.db.skillTag.findOne({
    where: {
      id: {
        [Op.eq]: req.params.tagId
      }
    }
  });

  if (!tag) {
    throw new MyError(req.params.tagId + " ID-тэй skillTag олдсонгүй!", 404);
  }

  await tag.destroy();

  responseHandler(res, {
    data: tag
  })
});
