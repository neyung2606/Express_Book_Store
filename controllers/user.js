const User = require('../models/user')

exports.getUsers = (req, res) => {
    User.find((err, users) => {
        if(err) {
            res.json({
                error: err
            })
        }
        res.json({
            users: users
        })
    })
}

exports.createUser = (req, res) => {
    const user = new User(req.body);
    console.log("CREATING USER: ", req.body);
    user.save((err, result) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        res.status(200).json({
            user: result,
            message: "Create user successfully"
        })
    })
}

exports.updateUser = (req, res) => {
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

exports.deleteUser = (req, res) => {
    User.delete({_id: req.params.id}, (err, user) => {
        if (err) {
            res.status(400).json({
                error: err
            });
        }
        res.status(200).json({
            message: "User deleted succesfully"
        })
    })
}