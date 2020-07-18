const express = require('express');
const bookController = require('../controllers/book');

const router = express.Router();

router.get("/", bookController.getBooks);
router.post("/create", bookController.createBook);
router.put("/update/:id", bookController.updateBook);
router.delete("/delete/:id", bookController.deleteBook)

module.exports = router;