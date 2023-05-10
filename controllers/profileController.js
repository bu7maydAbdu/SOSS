const cloudinary = require("../middleware/cloudinary");
const AccountData = require("../models/AccountData");

module.exports = {
  getMyProfile: async (req, res) => {},
  addAccountData: async (req, res) => {
    try {
      console.log(req.body);
      console.log(req.file);

      if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path);

        await AccountData.create({
          bio: req.body.bio,
          profession: req.body.profession,
          twitter: req.body.twitter,
          facebook: req.body.facebook,
          phoneNumber: req.body.phonenumber,
          profilePic: result.secure_url,
          cloudinaryId: result.public_id,
          user: req.user._id,
        });
      } else {
        await AccountData.create({
          bio: req.body.bio,
          profession: req.body.profession,
          twitter: req.body.twitter,
          facebook: req.body.facebook,
          phoneNumber: req.body.phonenumber,
          profilePic:
            "https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg",
          user: req.user._id,
        });
      }

      res.redirect("/");
    } catch (err) {
      console.log(err);
    }
  },
};
