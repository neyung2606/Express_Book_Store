const express = require('express');
const router = express.Router();
const indexController = require('../controllers/index')

router.get("/shop", indexController.loadShop);
router.get("/login", indexController.loadLogin);
router.post("/login", indexController.checkLogin);
router.get("/logout", indexController.logOut);
router.get("/register", indexController.registerUser);
router.post("/register", indexController.insertUser);
router.get("/", indexController.loadIndex);
router.get("/:name", indexController.loadBook);

module.exports = router;