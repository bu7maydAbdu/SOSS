const express = require("express");
const Lost = require("../models/Lost");
const ProfileData = require("../models/ProfileData");

module.exports = {
  getHome: async (req, res) => {
    try {
      console.log(req.user);
      const lostPeople = await Lost.find();
      if (req.user) {
        const accountData1 = await ProfileData.findOne({
          user: req.user._id,
        }).lean();
        console.log(accountData1);

        res.render("index.ejs", {
          lostPeople: lostPeople,
          userData: req.user,
          accountData: accountData1,
        });
      } else {
        res.render("index.ejs", {
          lostPeople: lostPeople,
          userData: "false",
          accountData: "false",
        });
      }
      // console.log(lostPeople[0].postedBy.toString());
      // console.log(req.user.id);

      // console.log(typeof req.user.id, typeof lostPeople[0].postedBy);
      // console.log(req.user.id === lostPeople[0].postedBy ? "true" : "false");
    } catch (err) {
      console.log(err);
    }
  },
  getLogin: async (req, res) => {
    res.render("login.ejs");
  },
  getSignUp: async (req, res) => {
    res.render("register.ejs");
  },
  getAccountDataUpload: async (req, res) => {
    try {
      res.render("accountDataUpload.ejs");
    } catch (err) {
      console.log(err);
    }
  },
};
