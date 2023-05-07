const express = require("express");

module.exports = {
  getHome: async (req, res) => {
    res.render("index.ejs");
  },
  getLogin: async (req, res) => {
    res.render("login.ejs");
  },
  getSignUp: async (req, res) => {
    res.render("register.ejs");
  },
};
