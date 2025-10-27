const express = require("express");
const { getAllBooks, getBookByID, createBook, deleteBookByID } = require("../controllers/book.controller.js");

const router = express.Router();

router.get("/", getAllBooks);

router.get("/:id", getBookByID);

router.post("/", createBook);

router.delete("/:id", deleteBookByID);

module.exports = router;