const express = require("express");
const app = express();

const PORT = 8000;

const books = [
  { id: 1, title: "Book1", author: "Author1" },
  { id: 2, title: "Book2", author: "Author2" },
];

app.use(express.json());

app.get("/books", function (req, res) {
  return res.status(200).json(books);
});

app.get("/books/:id", function (req, res) {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({
      error: "Please enter valid book id",
    });
  }

  const book = books.find((b) => b.id === id);

  if (!book) {
    return res.status(404).json({
      error: "Book not found",
    });
  }

  return res.status(200).json(book);
});

app.post("/books", function (req, res) {
  const { title, author } = req.body;
  const id = books.length + 1;

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

  books.push(book);

  return res.status(201).json({
    id: book.id,
    message: "Book added successfully",
  });
});

app.delete("/books/:id", function (req, res) {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({
      error: "Please enter a valid id",
    });
  }

  const bookIndex = books.findIndex((book) => book.id === id);

  if (bookIndex < 0) {
    return res.status(404).json({
      error: "Book ID not found",
    });
  }

  books.splice(bookIndex, 1);

  return res.status(200).json({
    id,
    message: "Book deleted successfully",
  });
});

app.listen(PORT, () => console.log(`Server started running on port ${PORT}`));
