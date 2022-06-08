const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");
// third party packages
const morgan = require("morgan");
const rfs = require("rotating-file-stream");
const fileupload = require('express-fileupload');

// Custom
const errorHandler = require("./src/middleware/error");

// Midllewares
const logger = require("./src/middleware/logger");
const injectDb = require("./src/middleware/injectDb");

// Routes
const restServer = require("./src/routes");

dotenv.config({
  path: "./config.local.env",
});

// Sequelize with any database тэй ажиллах обьект
const db = require("./src/config/db-seq");

const app = express();

var accessLogStream = rfs.createStream("access.log", {
  interval: "1d",
  path: path.join(__dirname, "src/log"),
});

const whitelist = ["http://localhost:3000", "http://localhost:4000", "https://lsknow.ml", "http://lsknow.ml"];
const corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (whitelist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false } // disable CORS for this request
  }
  callback(null, corsOptions) // callback expects two parameters: error and options
}

app.use('/public', express.static('public'))
app.use(cors(corsOptionsDelegate));
app.use(fileupload());
app.use(express.json());
app.use(logger);
app.use(injectDb(db));
app.use(morgan("combined", { stream: accessLogStream }));
app.use(errorHandler);
restServer.applyMiddleWare(app, '/api/v1')

// Моделиудаас базыг үүсгэнэ (хэрэв үүсээгүй бол)
db.sequelize
  .sync()
  .then(() => {
    console.log("!!!sync success!!!");
  })
  .catch((err) => console.log(err));

const server = app.listen(
  process.env.PORT,
  console.log(`express server...${process.env.PORT} дээр аслаа.`)
);

process.on("unhandledRejection", (err, _) => {
  console.log(`Алдаа гарлаа: ${err.message}`);
  server.close(() => {
    process.exit(1);
  });
});
