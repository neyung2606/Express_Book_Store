const User = require("../models/user");
const bcrypt = require('bcryptjs');

exports.indexAdmin = async (req, res) => {
    const userLogin = await User.find({_id: req.cookies.userID});
    const users = await User.find({});
    return res.render("admin/index", {users: users, userLogin: userLogin});
}
exports.editAdmin = async (req, res) => {
    const userLogin = await User.find({_id: req.cookies.userID});
    const user = await User.find({_id: req.params.id});
    const header = await req._parsedOriginalUrl.pathname;
    header.indexOf("edit") !== -1 ? (
        res.render("admin/edit", {user: user, check: false, userLogin: userLogin})
    ) : (
        res.render("admin/edit", {user: user, check: true, userLogin: userLogin})
    );
}
exports.updateAdmin = async (req, res) => {
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
    const userLogin = await User.find({_id: req.cookies.userID});
    res.render("admin/create-user", {userLogin: userLogin});
}
exports.createAdmin = async (req, res) => {
    const user = await User.create(req.body)
    user.save();
    res.redirect("/admin/users");
}
exports.logOut = async (req, res) => {
    res.clearCookie("userID");
    res.redirect('/admin/login')
}


exports.loadLoginPage = async (req, res) => {
    const id = await req.cookies.userID;
    id === undefined ? user = undefined : user = await User.find({_id: id});
    return user === undefined ? res.render("admin/login") : res.redirect('/admin/users')
}
exports.checkLogin = async (req, res) => {
    console.log(await req.body);
    const { username, password } = await req.body
    const user = await User.find({username: username});
    if (user[0].password !== undefined) {
        const isPasswordMatch = await bcrypt.compare(password, user[0].password);
        if (isPasswordMatch) {
            if (user[0].role === "user") res.redirect("/admin/login");
            else {
                res.cookie('userID', user[0]._id );
                res.redirect('/admin/users');
            }
        }
        else res.redirect('/admin/login');
    }
    else {
        res.redirect('/admin/login');
    }
}