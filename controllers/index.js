const Book = require('../models/book');
const User = require('../models/user');
const bcrypt = require('bcryptjs');

exports.loadIndex = async (req, res) => {
    const books = await Book.find({});
    const id = await req.cookies.userID;
    id === undefined ? user = undefined : user = await User.find({_id: id});
    return res.render("home", { books: books });
}
exports.loadBook = async (req, res) => {
    const book = await Book.find({name: req.params.name});
    const books = await Book.find({}).limit(4);
    const id = await req.cookies.userID;
    id === undefined ? user = undefined : user = await User.find({_id: id});
    return res.render("product-single", {
        book: book,
        books: books
    });
}
exports.loadShop = async (req, res) => {
    const books = await Book.find({});
    const id = await req.cookies.userID;
    id === undefined ? user = undefined : user = await User.find({_id: id});
    return res.render("shop", { books: books })
}
exports.loadLogin = async (req, res) => {
    const id = await req.cookies.userID;
    id === undefined ? user = undefined : user = await User.find({_id: id});
    return user === undefined ? res.render("login", {errForm: false}) : res.redirect('/')
}
exports.checkLogin = async (req, res) => {
    const { username, password } = await req.body
    const user = await User.find({username: username});
    console.log(user)
    if (user.length != 0) {
        console.log("alo")
        const isPasswordMatch = await bcrypt.compare(password, user[0]['password']);
        if (isPasswordMatch) {
            res.cookie('userID', user[0]._id );
            res.redirect('/');
        }
        else {
            res.render('login', {errForm: true});
        }
    }
    else {
        res.redirect('/login');
    }
}
exports.logOut = async (req, res) => {
    res.clearCookie("userID");
    res.redirect('/')
}
exports.registerUser = async (req, res) => {
    res.render("register");
}
exports.insertUser = async (req, res) => {
    let reqUser = await req.body;
    reqUser = await Object.assign(reqUser, {role: "user"});
    const user = await User.create(reqUser);
    user.save();
    res.redirect('/login');
}