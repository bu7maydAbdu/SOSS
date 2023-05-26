const cloudinary = require("../middleware/cloudinary");
const ProfileData = require("../models/ProfileData");
const User = require("../models/User");
const Lost = require("../models/Lost");

module.exports = {
  getMyProfile: async (req, res) => {
    try {
      console.log(req.params);
      const accountData = await ProfileData.findOne({ user: req.params.id });
      const myProfileData = await User.findOne({ _id: req.user.id });
      const myProfileLostPost = await Lost.find({
        postedBy: req.params.id,
      }).exec();

      console.log(myProfileLostPost);

      console.log(accountData);
      res.render("profile.ejs", {
        userData: req.user,
        accountData: accountData,
        myProfileData: myProfileData,
        myProfileLostPost: myProfileLostPost,
      });
    } catch (err) {
      console.log(err);
    }
  },
  addAccountData: async (req, res) => {
    try {
      console.log(req.body);
      console.log(req.file);

      if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path);

        await ProfileData.create({
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
        await ProfileData.create({
          bio: req.body.bio,
          profession: req.body.profession,
          twitter: req.body.twitter,
          facebook: req.body.facebook,
          phoneNumber: req.body.phonenumber,
          profilePic:
            "https://res.cloudinary.com/moabdu/image/upload/v1683816402/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV_qhqqn1.jpg",
          user: req.user._id,
        });
      }

      res.redirect("/");
    } catch (err) {
      console.log(err);
    }
  },
  getEditProfileData: async (req, res) => {
    try {
      const accountData = await ProfileData.findOne({ user: req.params.id });
      const myProfileData = await User.findOne({ _id: req.user.id });
      console.log(accountData);
      res.render("accountDataSettings.ejs", {
        userData: req.user,
        accountData: accountData,
      });
    } catch (err) {
      console.log(err);
    }
  },
  updateAccountData: async (req, res) => {
    try {
      console.log(req.file);
      console.log(req.body);
      // const filter = { _id: req.params._id };
      const profileDataPulled = await ProfileData.findOne({
        user: req.user._id,
      });
      const filter = { user: req.user._id };
      if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path);

        const update = {
          bio: req.body.bio,
          profession: req.body.profession,
          twitter: req.body.twitter,
          facebook: req.body.facebook,
          phoneNumber: req.body.phonenumber,
          profilePic: result.secure_url,
          cloudinaryId: result.public_id,
          user: req.user._id,
        };
        await ProfileData.findOneAndUpdate(filter, update, {
          new: true,
          upsert: true,
          // Return the raw result from the MongoDB driver
        });
      } else {
        const update = {
          bio: req.body.bio,
          profession: req.body.profession,
          twitter: req.body.twitter,
          facebook: req.body.facebook,
          phoneNumber: req.body.phonenumber,
          profilePic: profileDataPulled.profilePic,
          user: req.user._id,
        };
        await ProfileData.findOneAndUpdate(filter, update, {
          new: true,
          upsert: true,
          // Return the raw result from the MongoDB driver
        });
      }

      res.redirect(`/profile/myProfile/${req.user._id}`);
    } catch (err) {
      console.log(err);
    }
  },
};
