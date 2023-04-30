const express = require("express");
const PORT = 8000;
const app = express();
const mongoose = "mongoose";

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(logger("dev"));

app.listen(PORT || process.env.PORT, () => {
  console.log(`server is running on ${PORT}`);
});
