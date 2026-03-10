const { BOOKS } = require("../models/book.js");

exports.getAllUsers = function (req, res) {
  return res.status(200).json(BOOKS);
};

exports.getUserByID = function (req, res) {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({
      error: "Please enter valid book id",
    });
  }

  const book = BOOKS.find((b) => b.id === id);

  if (!book) {
    return res.status(404).json({
      error: "Book not found",
    });
  }

  return res.status(200).json(book);
};

exports.createUser = function (req, res) {
  const { title, author } = req.body;
  const id = BOOKS.length + 1;

  if (!title || title === "") {
    return res.status(400).json({
      error: "Please enter valid title",
    });
  }

  if (!author || author === "") {
    return res.status(400).json({
      error: "Please enter valid author name",
    });
  }

  const book = {
    id,
    title,
    author,
  };

  BOOKS.push(book);

  return res.status(201).json({
    id: book.id,
    message: "Book added successfully",
  });
};

exports.deleteUserByID = function (req, res) {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({
      error: "Please enter a valid id",
    });
  }

  const bookIndex = BOOKS.findIndex((book) => book.id === id);

  if (bookIndex < 0) {
    return res.status(404).json({
      error: "Book ID not found",
    });
  }

  BOOKS.splice(bookIndex, 1);

  return res.status(200).json({
    id,
    message: "Book deleted successfully",
  });
};
