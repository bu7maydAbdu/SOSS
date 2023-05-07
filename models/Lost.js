const mongoose = require("mongoose");

const lostSchema = new mongoose.Schema({
  lostPersonName: {
    type: String,
    required: true,
  },
  lostPersonInfo: {
    type: String,
    required: true,
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  userName: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  status: {
    type: Boolean,
    required: true,
  },
  cloudinaryId: {
    type: String,
  },
  promotes: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Lost", lostSchema);
