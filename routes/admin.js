const express = require('express');
const adminController = require('../controllers/admin');
const auth = require("../middleware/auth.middleware");
const router = express.Router();
const multer = require("multer");
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './public/images/book');
    },
    filename: function(req, file, cb) {
      cb(null, file.originalname);
    }
});
const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(null, false);
    }
};
const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});
  

router.get("/login", adminController.loadLoginPage);
router.post("/login", adminController.checkLogin);
router.get("/logout", adminController.logOut);

router.get("/users/create", auth.requireAuth, adminController.loadCreate);
router.get("/users", auth.requireAuth, adminController.indexAdmin);
router.get("/users/:id", auth.requireAuth, adminController.editAdmin);
router.get("/users/edit/:id", auth.requireAuth, adminController.editAdmin);
router.put("/users/:id", auth.requireAuth, adminController.updateAdmin);
router.delete("/users/:id", auth.requireAuth, adminController.deleteAdmin);
router.post("/users/create", auth.requireAuth, adminController.createAdmin);

router.get("/books/create", auth.requireAuth,adminController.loadCreateBook);
router.get("/books", auth.requireAuth, adminController.indexBook);  
router.get("/books/:id", auth.requireAuth, adminController.editBook);
router.get("/books/edit/:id", auth.requireAuth, adminController.editBook);
router.put("/books/:id", auth.requireAuth, upload.single('image'), adminController.updateBook);
router.delete("/books/:id", auth.requireAuth, adminController.delBook);
router.post("/books/create", auth.requireAuth, upload.single('image'), adminController.createBook);


module.exports = router;