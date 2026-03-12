const express = require("express");
const {
  getAllAuthors,
  getAuthorByID,
  createAuthor,
  getBookByAuthorID,
} = require("../controllers/author.controller.js");

const router = express.Router();

router.get("/", getAllAuthors);

router.get("/:id", getAuthorByID);

router.post("/", createAuthor);

router.get("/:id/books", getBookByAuthorID);

module.exports = router;
