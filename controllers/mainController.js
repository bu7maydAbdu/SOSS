const express = require("express");

module.exports = {
  getHome: async (req, res) => {
    res.render("index.ejs");
  },
};
