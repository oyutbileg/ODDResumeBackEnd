const MyError = require("../utils/myerror");
const path = require("path");
const asyncHandler = require("express-async-handler");
const responseHandler = require("../utils/responseHandler");
const bcrypt = require('bcrypt');
const arrayRemoveElement = require("../utils/removePassword");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

exports.me = asyncHandler(async (req, res, _next) => {
  let select = req.query.select;
  if (select) {
    select = select.split(" ");
  }

  if (Array.isArray(select)) {
    select = arrayRemoveElement(select, "password");
  }

  const user = await req.db.sysUser.findByPk(req.userId, select ? { attributes: select } : {});

  if (!user) {
    throw new MyError(req.userId + " User not found!", 400);
  }

  responseHandler(res, {
    data: !select ? {
      name: user.first_name,
      email: user.email,
      is_admin: user.is_admin,
    } : user
  })
});

exports.update = asyncHandler(async (req, res, _next) => {
  const user = await req.db.sysUser.findByPk(req.userId);

  if (!user) {
    throw new MyError(req.userId + " ID-тэй хэрэглэгч байхгүй!", 400);
  }

  req.body.modified_at = new Date();
  await user.update({ ...req.body });

  responseHandler(res, {
    data: {
      name: user.first_name,
      email: user.email,
      is_admin: user.is_admin,
      description: user.description,
      photo: user.photo
    }
  })
});

exports.uploadPhoto = asyncHandler(async (req, res, _next) => {
  const user = await req.db.sysUser.findByPk(req.userId);

  if (!user) {
    throw new MyError(req.userId + " ID-тэй хэрэглэгч байхгүй!", 400);
  }

  if (!req.files || Object.keys(req.files).length === 0) {
    throw new MyError("Та зураг upload хийнэ үү.", 400);
  }

  const file = req.files['file']

  if (!file.mimetype.startsWith("image")) {
    throw new MyError("Та зураг upload хийнэ үү.", 400);
  }

  if (file.size > process.env.MAX_UPLOAD_FILE_SIZE) {
    throw new MyError("Таны зурагны хэмжээ хэтэрсэн байна.", 400);
  }

  file.name = `photo_${req.userId}${path.parse(file.name).ext}`;

  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, (err) => {
    if (err) {
      throw new MyError(
        "Файлыг хуулах явцад алдаа гарлаа. Алдаа : " + err.message,
      );
    }

    user.photo = file.name;
    user.save();

    responseHandler(res, {
      data: {
        photo: user.photo
      }
    });
  });
});

exports.changePassword = asyncHandler(async (req, res, _next) => {
  const user = await req.db.sysUser.findByPk(req.body.id);

  if (!user) {
    throw new MyError(
      req.body.id + " User not found",
      404
    );
  }

  if (!req.body.password && !req.body.old_password) {
    throw new MyError("Please enter a password!",
      404
    );
  }

  const ok = await user.checkPassword(req.body.old_password, user);

  if (!ok) {
    throw new MyError("!Oops, old password don't match.", 401);
  }

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(req.body.password, salt);
  await user.save({ attributes: ['first_name'] });

  responseHandler(res, {
    data: user,
  });
});

exports.changeOrder = asyncHandler(async (req, res, _next) => {
  const user = await req.db.sysUser.findByPk(req.body.id);

  if (!user) {
    throw new MyError(
      req.body.id + " user not found.",
      404
    );
  }

  const user_with_number = await req.db.sysUser.findOne({
    where: {
      list_order: {
        [Op.eq]: req.body.list_order
      },
    },
  });

  if (user_with_number) {
    await user_with_number.update({ list_order: Number(user.list_order) });
  }

  await user.update({ list_order: Number(req.body.list_order) });

  responseHandler(res, {
    data: {}
  });
});
