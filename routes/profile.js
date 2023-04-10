const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const profileController = require("../controllers/profileController");

router.post(
  "/addAccountData",
  upload.single("file"),
  profileController.addAccountData
);

module.exports = router;
