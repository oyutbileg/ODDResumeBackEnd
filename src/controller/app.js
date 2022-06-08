const asyncHandler = require("express-async-handler");
const responseHandler = require("../utils/responseHandler");

// Greeting Function
exports.alive = asyncHandler(async (req, res) => {
  const greeting = {
    'message': 'Hello World!'
  }
  responseHandler(res, greeting);
});
