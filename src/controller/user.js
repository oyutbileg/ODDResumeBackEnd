const MyError = require("../utils/myerror");
const path = require("path");
const asyncHandler = require("express-async-handler");
const responseHandler = require("../utils/responseHandler");
const bcrypt = require('bcrypt');

exports.me = asyncHandler(async (req, res, next) => {
  let select = req.query.select;
  if (select) {
    select = select.split("");
  }

  const user = await req.db.sysUser.findByPk(req.userId, select ? { attributes: select } : {});

  if (!user) {
    throw new MyError(req.userId + " ID-тэй хэрэглэгч байхгүй!", 400);
  }

  delete user.password;

  responseHandler(res, {
    data: !select ? {
      name: user.first_name,
      email: user.email,
      is_admin: user.is_admin,
    } : user
  })
});

exports.update = asyncHandler(async (req, res, next) => {
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

exports.uploadPhoto = asyncHandler(async (req, res, next) => {
  const user = await req.db.sysUser.findByPk(req.userId);

  if (!user) {
    throw new MyError(req.userId + " ID-тэй хэрэглэгч байхгүй!", 400);
  }

  if (!req.files || Object.keys(req.files).length === 0) {
    throw new MyError("Та зураг upload хийнэ үү.", 400);
  }

  const file = req.files['file']
  // const file = req.files.file;

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

// Need Encryption 
exports.changePassword = asyncHandler(async (req, res, next) => {
  const user = await req.db.sysUser.findByPk(req.body.id);

  if (!user) {
    throw new MyError(
      req.body.id + " ID-тэй хэрэглэгч байхгүй байна.",
      404
    );
  }

  if (!req.body.password) {
    throw new MyError("Нууц үг оруулна уу.",
      404
    );
  }

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(req.body.password, salt);
  await user.save()

  responseHandler(res, {
    data: user,
  });
});
