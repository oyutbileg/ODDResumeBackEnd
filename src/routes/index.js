const appRoutes = require("./app");
const authRoutes = require("./auth");

const restServer = {
  applyMiddleWare: (app, path) => {
    app.use(path, appRoutes)
    app.use(path + "/auth", authRoutes)
  }
}

module.exports = restServer
