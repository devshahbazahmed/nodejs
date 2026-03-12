const db = require("../db");
const authorsTable = require("../models/author.model.js");
const booksTable = require("../models/book.model.js");
const { eq } = require("drizzle-orm");

async function getAllAuthors(req, res) {
  const authors = await db.select().from(authorsTable);
  return res.status(200).json(authors);
}

async function getAuthorByID(req, res) {
  const id = req.params.id;

  if (!id) {
    return res.status(400).json({
      error: `Please enter a valid id`,
    });
  }

  const [author] = await db
    .select()
    .from(authorsTable)
    .where(eq(authorsTable.id, id));

  if (!author) {
    return res
      .status(404)
      .json({ error: `Author with id ${id} does not exists` });
  }

  return res.status(200).json(author);
}

async function createAuthor(req, res) {
  const { firstName, lastName, email } = req.body;

  const [result] = await db
    .insert(authorsTable)
    .values({
      firstName,
      lastName,
      email,
    })
    .returning({ id: authorsTable.id });

  return res.status(201).json({
    message: "Author has been created",
    id: result.id,
  });
}

async function getBookByAuthorID(req, res) {
  const books = await db
    .select()
    .from(booksTable)
    .where(eq(booksTable.authorId, req.params.id));

  return res.status(200).json(books);
}

module.exports = {
  getAllAuthors,
  getAuthorByID,
  createAuthor,
  getBookByAuthorID,
};
