const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");
const rfs = require("rotating-file-stream");
const fileupload = require('express-fileupload');
const helmet = require("helmet");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");
const cookieParser = require("cookie-parser");

const errorHandler = require("./src/middleware/error");
const logger = require("./src/middleware/logger");
const injectDb = require("./src/middleware/injectDb");

const restServer = require("./src/routes");

dotenv.config({
  path: "./config.local.env",
});

const db = require("./src/config/db-seq");
const app = express();

var accessLogStream = rfs.createStream("access.log", {
  interval: "1d",
  path: path.join(__dirname, "src/log"),
});

const whitelist = ["http://localhost:3000", "http://localhost:9001"];
const corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (whitelist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true }
  } else {
    corsOptions = { origin: false }
  }
  callback(null, corsOptions)
}

// Express rate limit
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 500, // limit each IP to 100 requests per windowMs
  message: "15 минутанд 3 удаа л хандаж болно! ",
});

app.use(express.static('public'))
app.use(limiter);
app.use(hpp());
app.use(cookieParser());
app.use(cors(corsOptionsDelegate));
app.use(fileupload({ createParentPath: true }));
app.use(express.json());
app.use(logger);
app.use(helmet());
app.use(xss());
app.use(injectDb(db));
app.use(morgan("combined", { stream: accessLogStream }));
restServer.applyMiddleWare(app, '/api/v1')
app.use(errorHandler);

// Моделиудаас базыг үүсгэнэ (хэрэв үүсээгүй бол)
db.sequelize
  .sync()
  .then(() => {
    console.log("!!!sync success!!!");
  })
  .catch((err) => console.log(err));

// express сэрвэрийг асаана.
const server = app.listen(
  process.env.PORT,
  console.log(`🚀 RESTful API is now running on http://localhost:${process.env.PORT}/api/v1`)
);

// Баригдалгүй цацагдсан бүх алдаануудыг энд барьж авна
process.on("unhandledRejection", (err, promise) => {
  console.log(`Алдаа гарлаа : ${err.message}`.underline.red.bold);
  server.close(() => {
    process.exit(1);
  });
});
