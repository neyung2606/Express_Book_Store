const User = require("../models/user")
exports.indexAdmin = async (req, res) => {
    const users = await User.find({});
    return res.render("admin/index", {users: users});
}
exports.editAdmin = async (req, res) => {
    const user = await User.find({_id: req.params.id});
    const header = await req._parsedOriginalUrl.pathname;
    header.indexOf("edit") !== -1 ? (
        res.render("admin/edit", {user: user, check: false})
    ) : (
        res.render("admin/edit", {user: user, check: true})
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
exports.loadCreate = (req, res) => {
    res.render("admin/create-user");
}
exports.createAdmin = async (req, res) => {
    const user = await User.create(req.body)
    user.save();
    res.redirect("/admin/users");
}