const cloudinary = require("../middleware/cloudinary");
const express = require("express");
const Lost = require("../models/Lost");

module.exports = {
  getAddLost: async (req, res) => {
    res.render("add-lost.ejs");
  },
  addLost: async (req, res) => {
    try {
      console.log(req.body);
      console.log(req.file);
      const result = await cloudinary.uploader.upload(req.file.path);
      // const profile = await ProfileInfo.findOne({ user: req.user._id });

      await Lost.create({
        lostPersonName: req.body.lostName,
        postText: req.body.LostInfo,
        postedBy: 43653464534444444444444444444, //req.user._id,
        userName: "admin", //req.user.userName,
        image: result.secure_url,
        cloudinaryId: result.public_id,
      });

      res.redirect("/losts/addLostPage");
    } catch (err) {
      console.log(err);
    }
  },
};
