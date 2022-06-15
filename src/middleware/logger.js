const logger = (req, _res, next) => {
    console.log(`logger: ${req.method} ${req.protocol}://${req.hostname}${req.originalUrl}`);
    next();
}

module.exports = logger;
