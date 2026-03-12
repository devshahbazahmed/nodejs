require("dotenv/config");
const express = require("express");
const app = express();

const bookRouter = require("./routes/book.routes.js");
const authorRouter = require("./routes/author.routes.js");
const { loggerMiddleware } = require("./middlewares/logger.js");

const PORT = 8000;

app.use(express.json());

app.use(loggerMiddleware);

app.use("/books", bookRouter);
app.use("/authors", authorRouter);

app.listen(PORT, () => console.log(`Server started running on port ${PORT}`));
