const express = require("express");
const router = express.Router();
const lostsController = require("../controllers/lostsController");

router.get("/addLostPage", lostsController.getAddLost);

module.exports = router;
