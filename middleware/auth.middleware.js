const User = require("../models/user");

module.exports.requireAuth = async (req, res, next) => {
    if(!req.cookies.adminID) {
        res.redirect("/admin/login");
        return;
    }
    const user = await User.find({_id: req.cookies.adminID});
    if (!user) {
        res.redirect("/admin/login");
        return;
    }
    next();
} 