const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getUserByID,
  createUser,
  deleteUserByID,
} = require("../controllers/book.controller.js");

router.get("/", getAllUsers);

router.get("/:id", getUserByID);

router.post("/", createUser);

router.delete("/:id", deleteUserByID);

module.exports = router;
