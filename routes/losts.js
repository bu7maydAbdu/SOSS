const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const lostsController = require("../controllers/lostsController");

router.get("/addLostPage", lostsController.getAddLost);
router.post("/addLost", upload.single("file"), lostsController.addLost);

module.exports = router;
