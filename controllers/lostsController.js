const express = require("express");

module.exports = {
  getAddLost: async (req, res) => {
    res.render("add-lost.ejs");
  },
};
