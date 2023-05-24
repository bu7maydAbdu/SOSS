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
        lostPersonInfo: req.body.LostInfo,
        postedBy: req.user._id,
        status: false,
        userName: req.user.userName,
        image: result.secure_url,
        cloudinaryId: result.public_id,
      });

      res.redirect("/"); // /losts/addLostPage
    } catch (err) {
      console.log(err);
    }
  },
  getLostEditPage: async (req, res) => {
    try {
      // console.log(req.params);
      const postToEdit = await Lost.findById({ _id: req.params.id }).lean();

      // console.log(postToEdit);
      res.render("editLostPost.ejs", {
        postToEdit: postToEdit,
        userData: req.user,
      });
    } catch (err) {
      console.log(err);
    }
  },
  editLostPost: async (req, res) => {
    try {
      console.log(req.body);
      const filter = { _id: req.params._id };
      const update = {
        lostPersonName: req.body.lostName,
        lostPersonInfo: req.body.LostInfo,
      };

      await Lost.findOneAndUpdate(filter, update, {
        new: true,
        upsert: true,
        // Return the raw result from the MongoDB driver
      });

      res.redirect("/");
    } catch (err) {
      console.log(err);
    }
  },
  getLostPost: async (req, res) => {
    try {
      const lostPost = await Lost.findById({ _id: req.params.id }).lean();
      console.log(lostPost);
      res.render("lost-post.ejs", { lostPost: lostPost, userData: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  deleteLost: async (req, res) => {
    try {
      let lost = await Lost.findById({ _id: req.params.id });

      if (lost.image) {
        await cloudinary.uploader.destroy(lost.cloudinaryId);
      }

      await Lost.deleteOne({ _id: req.params.id });
      console.log("Deleted Lost");
      res.redirect("/");
    } catch (err) {
      // res.redirect("/");
      console.log(err);
    }
  },
};
