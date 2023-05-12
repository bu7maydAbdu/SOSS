const mongoose = require("mongoose");

const profileDataSchema = new mongoose.Schema({
  bio: {
    type: String,
  },
  profession: {
    type: String,
  },
  twitter: {
    type: String,
  },
  facebook: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  profilePic: {
    type: String,
  },
  cloudinaryId: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("ProfileData", profileDataSchema);
