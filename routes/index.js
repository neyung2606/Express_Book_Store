const express = require('express');
const router = express.Router();
const indexController = require('../controllers/index')

router.get("/shop", indexController.loadShop);
router.get("/login", indexController.loadLogin);
router.get("/", indexController.loadIndex);
router.get("/:name", indexController.loadBook);

module.exports = router;