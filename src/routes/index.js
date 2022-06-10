const appRoutes = require("./app");
const adminRoutes = require("./admin");
const authRoutes = require("./auth");
const userRoutes = require("./user");
const projectRoutes = require("./project");
const tagRoutes = require("./skillTag");

// Initialize routes
const restServer = {
  applyMiddleWare: (app, path) => {
    app.use(path, appRoutes)
    app.use(path + "/admin", adminRoutes)
    app.use(path + "/auth", authRoutes)
    app.use(path + "/user", userRoutes)
    app.use(path + "/project", projectRoutes)
    app.use(path + "/tag", tagRoutes)
  }
}

module.exports = restServer
