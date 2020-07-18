const express = require('express');
const router = express.Router();
const Book = require("../models/book")

router.get("/login", async (req, res) => {
    res.render("login")
})
router.get("/", async (req, res) => {
    const books = await Book.find({});
    console.log(books)
    res.render("home", {books: books})
});
router.get("/:name", async (req, res) => {
    const book = await Book.find({name: req.params.name});
    const books = await Book.find({}).limit(4);
    res.render("product-single", {
        book: book,
        books: books
    });
})
router.get("/shop", (req, res) => {
    res.render("shop")
})
module.exports = router;