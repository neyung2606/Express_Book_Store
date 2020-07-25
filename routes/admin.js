const express = require('express');
const adminController = require('../controllers/admin');
const auth = require("../middleware/auth.middleware");
const router = express.Router();

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


module.exports = router;