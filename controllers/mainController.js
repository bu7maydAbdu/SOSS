const express = require("express");
const Lost = require("../models/Lost");

module.exports = {
  getHome: async (req, res) => {
    try {
      const lostPeople = await Lost.find();
      // console.log(lostPeople[0].postedBy.toString());
      // console.log(req.user.id);

      // console.log(typeof req.user.id, typeof lostPeople[0].postedBy);
      // console.log(req.user.id === lostPeople[0].postedBy ? "true" : "false");

      res.render("index.ejs", { lostPeople: lostPeople, userData: req.user });
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
