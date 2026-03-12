const booksTable = require("../models/book.model.js");
const authorsTable = require("../models/author.model.js");
const db = require("../db/index.js");
const { eq } = require("drizzle-orm");
const { sql } = require("drizzle-orm");

async function getAllBooks(req, res) {
  const search = req.query.search;

  if (search) {
    const books = await db
      .select()
      .from(booksTable)
      .where(
        sql`to_tsvector('english', ${booksTable.title}) @@ to_tsquery('english', ${search})`,
      );

    return res.status(200).json(books);
  }

  const books = await db.select().from(booksTable);
  return res.status(200).json(books);
}

async function getBookByID(req, res) {
  const id = req.params.id;

  if (!id) {
    return res.status(400).json({
      error: `The book with id ${id} does not exists`,
    });
  }

  const [book] = await db
    .select()
    .from(booksTable)
    .where((table) => eq(table.id, id))
    .leftJoin(authorsTable, eq(booksTable.authorId, authorsTable.id))
    .limit(1);

  if (!book) {
    return res.status(404).json({
      error: `Book with id ${id} not found`,
    });
  }

  return res.status(200).json(book);
}

async function createBook(req, res) {
  const { title, description, authorId } = req.body;

  if (!title || title === "") {
    return res.status(400).json({
      error: `Please enter a valid title`,
    });
  }

  const book = {
    title,
    description,
    authorId,
  };

  const [result] = await db.insert(booksTable).values(book).returning({
    id: booksTable.id,
  });

  return res.status(201).json({
    message: "Book created successfully",
    id: result.id,
  });
}

async function deleteBookByID(req, res) {
  const id = req.params.id;

  await db.delete(booksTable).where(eq(booksTable.id, id));

  return res.status(200).json({
    message: "Book deleted successfully",
  });
}

module.exports = {
  getAllBooks,
  getBookByID,
  createBook,
  deleteBookByID,
};
