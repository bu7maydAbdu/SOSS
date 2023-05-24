const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const lostsController = require("../controllers/lostsController");
const { ensureAuth, ensureGuest } = require("../middleware/auth.js");

router.get("/addLostPage", ensureAuth, lostsController.getAddLost);
router.post("/addLost", upload.single("file"), lostsController.addLost);
router.get("/editLostPostPage/:id", lostsController.getLostEditPage);
router.post(
  "/editLostPost/:_id",
  upload.single("file"),
  lostsController.editLostPost
);
router.get("/lostPost/:id", lostsController.getLostPost);
router.delete("/deleteLost/:id", lostsController.deleteLost);

module.exports = router;
