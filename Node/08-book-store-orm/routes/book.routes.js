const express = require("express");
const router = express.Router();

const {
  getAllBooks,
  getBookByID,
  createBook,
  deleteBookByID,
} = require("../controllers/book.controller.js");

router.get("/", getAllBooks);

router.get("/:id", getBookByID);

router.post("/", createBook);

router.delete("/:id", deleteBookByID);

module.exports = router;
