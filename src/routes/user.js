const express = require('express');
const userController = require('../controllers/user');

const router = express.Router();

router.get("/", userController.getUsers);
router.post("/create", userController.createUser);
router.put("/update/:id", userController.updateUser);

module.exports = router;