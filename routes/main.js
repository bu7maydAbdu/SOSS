const express = require("express");
const router = express.Router();
const mainController = require("../controllers/mainController");
const authController = require("../controllers/auth");
const { ensureAuth, ensureGuest } = require("../middleware/auth.js");

router.get("/", mainController.getHome);
router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);
router.get("/logout", authController.logout);
router.get("/accountDataUpload", mainController.getAccountDataUpload);

module.exports = router;
