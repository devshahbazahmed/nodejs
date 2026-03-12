const fs = require("node:fs");

function loggerMiddleware(req, res, next) {
  const log = `[${Date.now()}] - ${req.method} : ${req.url}`;
  fs.appendFileSync("log.txt", log, "utf-8");
  next();
}

module.exports = {
  loggerMiddleware,
};
