const express = require('express');
const adminController = require('../controllers/admin');
const router = express.Router();

router.get("/users/create", adminController.loadCreate);
router.get("/users", adminController.indexAdmin);
router.get("/users/:id", adminController.editAdmin);
router.get("/users/edit/:id", adminController.editAdmin);
router.put("/users/:id", adminController.updateAdmin);
router.delete("/users/:id", adminController.deleteAdmin);
router.post("/users/create", adminController.createAdmin);


module.exports = router;