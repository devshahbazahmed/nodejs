const express = require("express");

const bookRouter = require("./routes/books.routes.js");
const { loggerMiddleware } = require("./middlewares/loggerMiddleware.js");

const app = express();
const PORT = 8000;


// Middlewares (Plugins)

app.use(express.json());

// app.use(function (req, res, next) {
//   console.log("I am Middleware A");
//   next();
// });

// app.use(function (req, res, next) {
//   console.log("I am Middleware B");
//   next();
// });

app.use(loggerMiddleware);

// Routes

app.use("/books", bookRouter);

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));