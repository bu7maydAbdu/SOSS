const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const profileController = require("../controllers/profileController");
const { ensureAuth, ensureGuest } = require("../middleware/auth.js");

router.post(
  "/addAccountData",
  upload.single("file"),
  profileController.addAccountData
);
router.get("/myProfile/:id", ensureAuth, profileController.getMyProfile);

module.exports = router;
