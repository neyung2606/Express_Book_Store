const User = require("../models/user");
const Book = require("../models/book");
const bcrypt = require('bcryptjs');
const multer  = require('multer');

exports.indexAdmin = async (req, res) => {
    const userLogin = await User.find({_id: req.cookies.adminID});
    const users = await User.find({});
    return res.render("admin/user/index", {users: users, userLogin: userLogin});
}
exports.editAdmin = async (req, res) => {
    const userLogin = await User.find({_id: req.cookies.adminID});
    const user = await User.find({_id: req.params.id});
    const header = await req._parsedOriginalUrl.pathname;
    header.indexOf("edit") !== -1 ? (
        res.render("admin/user/edit", {user: user, check: false, userLogin: userLogin})
    ) : (
        res.render("admin/user/edit", {user: user, check: true, userLogin: userLogin})
    );
}
exports.updateAdmin = async (req, res) => {
    req.body.password = await bcrypt.hash(req.body.password, 8)
    
    User.update({_id: req.params.id}, req.body, (err, user) => {
        if (err) {
            res.status(400).json({
                error: err
            });
        }
        res.status(200).json({
            message : "User updated successfully"
        })
    })
}
exports.deleteAdmin = (req, res) => {
    User.deleteOne({_id: req.params.id})
        .then(() => {
            console.log("xoa duoc roi")
        })
}
exports.loadCreate = async (req, res) => {
    const userLogin = await User.find({_id: req.cookies.adminID});
    res.render("admin/user/create-user", {userLogin: userLogin});
}
exports.createAdmin = async (req, res) => {
    const user = await User.create(req.body)
    user.save();
    res.redirect("/admin/users");
}
exports.logOut = async (req, res) => {
    res.clearCookie("adminID");
    res.redirect('/admin/login')
}


exports.loadLoginPage = async (req, res) => {
    const id = await req.cookies.adminID;
    id === undefined ? user = undefined : user = await User.find({_id: id});
    return user === undefined ? res.render("admin/login") : res.redirect('/admin/users')
}
exports.checkLogin = async (req, res) => {
    console.log(await req.body);
    const { username, password } = await req.body
    const user = await User.find({username: username});
    if (user.length != 0) {
        const isPasswordMatch = await bcrypt.compare(password, user[0].password);
        if (isPasswordMatch) {
            if (user[0].role === "user") res.redirect("/admin/login");
            else {
                res.cookie('adminID', user[0]._id );
                res.redirect('/admin/users');
            }
        }
        else res.redirect('/admin/login');
    }
    else {
        res.redirect('/admin/login');
    }
}

exports.indexBook = async (req, res) => {
    const userLogin = await User.find({_id: req.cookies.adminID});
    const books = await Book.find({});
    return res.render("admin/book/index", {books: books, userLogin: userLogin});
}
exports.editBook = async (req, res) => {
    const userLogin = await User.find({_id: req.cookies.adminID});
    const book = await Book.find({_id: req.params.id});
    const header = await req._parsedOriginalUrl.pathname;
    header.indexOf("edit") !== -1 ? (
        res.render("admin/book/edit", {book: book, check: false, userLogin: userLogin})
    ) : (
        res.render("admin/book/edit", {book: book, check: true, userLogin: userLogin})
    );
}
exports.delBook = async (req, res) => {
    await Book.deleteOne({_id: req.params.id});
}
exports.updateBook = async (req, res) => {
    const id = req.params.id;
    if (req.file == undefined) {
        console.log("khong co file")
        await Book.update({_id: req.params.id}, req.body);
        res.redirect(`/admin/books/${id}`);
    } else {
        console.log("co file")
        await Book.update({_id: req.params.id}, {
            name: req.body.name,
            img: "book/" + req.file.originalname,
            price: req.body.price,
            quantity: req.body.quantity,
            description: req.body.description,
            supplier: req.body.supplier,
            publishing: req.body.publishing,
            author: req.body.author,
            year: req.body.year,
            page: req.body.page,
            cover: req.body.cover 
        })
        res.redirect(`/admin/books/${id}`);
    }
}
exports.loadCreateBook = async (req, res) => {
    const userLogin = await User.find({_id: req.cookies.adminID});
    res.render("admin/book/create-book", {userLogin: userLogin });
}
exports.createBook = async (req, res) => {
    console.log(req.file, req.body)
    const book = new Book({
        name: req.body.name,
        img: "book/" + req.file.originalname,
        price: req.body.price,
        quantity: req.body.quantity,
        description: req.body.description,
        supplier: req.body.supplier,
        publishing: req.body.publishing,
        author: req.body.author,
        year: req.body.year,
        page: req.body.page,
        cover: req.body.cover
    });
    book.save();
    res.redirect('/admin/books');
}