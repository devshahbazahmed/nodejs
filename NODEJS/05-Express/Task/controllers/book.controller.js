const { BOOKS } = require("../models/book.js");

exports.getAllBooks = function (req, res) {
  res.json(BOOKS);
};

exports.getBookByID = function (req, res) {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ error: "ID must be of type number" });
  }
  const book = BOOKS.find(e => e.id === id);

  if (!book) {
    res.status(404).json({ error: `Book with ID ${id} does not exists!` });
  }

  return res.status(200).json(book);
};

exports.createBook = function (req, res) {
  // console.log(req.body);
  const { title, author } = req.body;

  if (!title || title === "")
    return res.status(400).json({ error: 'title is required' });

  if (!author || author === "")
    return res.status(400).json({ error: 'author is required' });

  const id = BOOKS.length + 1;

  const book = { id, title, author };
  BOOKS.push(book);

  return res.status(201).json({ message: "Book created Success", id });
};

exports.deleteBookByID = function (req, res) {
  const id = parseInt(req.params.id);

  if (isNaN(id))
    return res.status(400).json({ error: "ID must be of type number" });

  const indexToDelete = BOOKS.findIndex(e => e.id === id);

  if (indexToDelete < 0) {
    return res.status(404).json({ error: `Book with ID ${id} does not exists` });
  }

  BOOKS.splice(indexToDelete, 1);

  return res.status(200).json({ message: "Book deleted!" });
};