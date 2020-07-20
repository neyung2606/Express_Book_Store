const Book = require('../models/book');
const User = require('../models/user');

exports.loadIndex = async (req, res) => {
    const books = await Book.find({});
    return res.render("home", { books: books });
}
exports.loadBook = async (req, res) => {
    const book = await Book.find({name: req.params.name});
    const books = await Book.find({}).limit(4);
    return res.render("product-single", {
        book: book,
        books: books
    });
}
exports.loadShop = async (req, res) => {
    const books = await Book.find({});
    return res.render("shop", { books: books })
}
exports.loadLogin = async (req, res) => {
    return res.render("login")
}