const jwt = require("jsonwebtoken");
const asyncHandler = require("./asyncHandler");
const MyError = require("../utils/myerror");

exports.protect = asyncHandler(async (req, _res, next) => {
    if (!req.headers.authorization) {
        throw new MyError(
            "Oops, maybe you have to login!.",
            401
        );
    }

    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
        throw new MyError("You haven't credentials, you have to login", 401);
    }

    const tokenObj = jwt.verify(token, process.env.JWT_SECRET);

    if (!tokenObj.is_active) {
        throw new MyError(
            "Oops!, your account is not active. Please contact with admin.",
            400
        );
    }

    req.userId = tokenObj.id;
    req.is_admin = tokenObj.is_admin;
    req.is_active = tokenObj.is_active;

    next();
});

exports.siteProtect = asyncHandler(async (req, _res, next) => {
    if (!req.headers.authorization) {
        throw new MyError(
            "Oops, maybe you have to login!.",
            401
        );
    }

    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
        throw new MyError("You haven't credentials, you have to login", 401);
    }

    next();
});

exports.authorize = () => {
    return (req, _res, next) => {
        if (req.is_admin === "false") {
            throw new MyError("Oops!, maybe you need permission.", 403);
        }
        next();
    };
};
