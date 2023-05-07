const express = require("express");
const router = express.Router();
const mainController = require("../controllers/mainController");
const authController = require("../controllers/auth");

router.get("/", mainController.getHome);
router.get("/loginPage", mainController.getLogin);
router.get("/signUpPage", mainController.getSignUp);
router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);

module.exports = router;
