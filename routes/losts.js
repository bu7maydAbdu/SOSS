const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const lostsController = require("../controllers/lostsController");

router.get("/addLostPage", lostsController.getAddLost);
router.post("/addLost", upload.single("file"), lostsController.addLost);
router.get("/editLostPostPage/:id", lostsController.getLostEditPage);
router.post(
  "/editLostPost/:_id",
  upload.single("file"),
  lostsController.editLostPost
);
router.get("/lostPost/:id", lostsController.getLostPost);

module.exports = router;
