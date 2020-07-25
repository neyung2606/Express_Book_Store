const User = require("../models/user");

module.exports.requireAuth = async (req, res, next) => {
    if(!req.cookies.userID) {
        res.redirect("/admin/login");
        return;
    }
    const user = await User.find({_id: req.cookies.userID});
    if (!user) {
        res.redirect("/admin/login");
        return;
    }
    next();
} 