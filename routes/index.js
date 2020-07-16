const express = require('express');
const router = express.Router();
const Book = require("../models/book")


router.get("/", (req, res) => {
    Book.find({}).then(books => {
        res.render('home', {books: books})
    })
});
router.get("/shop", (req, res) => {
    res.render("shop")
})

module.exports = router;