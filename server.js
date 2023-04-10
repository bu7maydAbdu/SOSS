const express = require("express");
// const cors = require("cors")
const PORT = 8000;
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const methodOverride = require("method-override");
const flash = require("express-flash");
const logger = require("morgan");
const multer = require("multer");
require("dotenv").config({ path: "./config/.env" });

const mainRoute = require("./routes/main");
const lostsRoute = require("./routes/losts");
const profileRoute = require("./routes/profile");

const connectDB = require("./config/database");

require("./config/passport")(passport);

const app = express();

connectDB();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(logger("dev"));

//Use forms for put / delete
app.use(methodOverride("_method"));

// Sessions
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.DB_STRING }),
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use("/", mainRoute);
app.use("/losts", lostsRoute);
app.use("/profile", profileRoute);

app.listen(process.env.PORT || PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
