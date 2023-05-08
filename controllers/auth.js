const passport = require("passport");
const validator = require("validator");
const User = require("../models/User");

module.exports = {
  getLogin: (req, res) => {
    if (req.user) {
      return res.redirect("/");
    }
    res.render("login.ejs", {
      title: "Login",
    });
  },

  postLogin: async (req, res, next) => {
    const validationErrors = [];
    if (!validator.isEmail(req.body.email))
      validationErrors.push({ msg: "Please enter a valid email address." });
    if (validator.isEmpty(req.body.password))
      validationErrors.push({ msg: "Password cannot be blank." });

    if (validationErrors.length) {
      req.flash("errors", validationErrors);
      return res.redirect("/login");
    }
    req.body.email = validator.normalizeEmail(req.body.email, {
      gmail_remove_dots: false,
    });

    try {
      const user = await new Promise((resolve, reject) => {
        passport.authenticate("local", (err, user, info) => {
          if (err) {
            reject(err);
          }
          if (!user) {
            req.flash("errors", info);
            return res.redirect("/login");
          }
          req.logIn(user, (err) => {
            if (err) {
              reject(err);
            }
            req.flash("success", { msg: "Success! You are logged in." });
            res.redirect(req.session.returnTo || "/"); // recommended path to  /profile
          });
          resolve(user);
        })(req, res, next);
      });
    } catch (err) {
      return next(err);
    }
  },

  // logout: async (req, res) => {
  //   req.logout(() => {
  //     console.log("User has logged out.");
  //   });
  //   req.session.destroy((err) => {
  //     if (err)
  //       console.log(
  //         "Error : Failed to destroy the session during logout.",
  //         err
  //       );
  //     req.user = null;
  //     res.redirect("/");
  //   });
  // },
  logout: (req, res, next) => {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      console.log("User has logged out.");
      req.session.destroy((err) => {
        if (err)
          console.log(
            "Error : Failed to destroy the session during logout.",
            err
          );
        req.user = null;
        res.redirect("/");
      });
    });
  },

  getSignup: (req, res) => {
    if (req.user) {
      return res.redirect("/logout"); // recommended path to   /profile
    }
    res.render("signup.ejs", {
      title: "Create Account",
    });
  },

  postSignup: async (req, res, next) => {
    const validationErrors = [];
    if (!validator.isEmail(req.body.email))
      validationErrors.push({ msg: "Please enter a valid email address." });
    if (!validator.isLength(req.body.password, { min: 8 }))
      validationErrors.push({
        msg: "Password must be at least 8 characters long",
      });
    if (req.body.password !== req.body.confirmPassword)
      validationErrors.push({ msg: "Passwords do not match" });

    if (validationErrors.length) {
      req.flash("errors", validationErrors);
      return res.redirect("../accountDataUpload"); //../signup
    }
    req.body.email = validator.normalizeEmail(req.body.email, {
      gmail_remove_dots: false,
    });

    const user = new User({
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password,
    });

    try {
      const existingUser = await User.findOne({
        $or: [{ email: req.body.email }, { userName: req.body.userName }],
      });
      if (existingUser) {
        req.flash("errors", {
          msg: "Account with that email address or username already exists.",
        });
        return res.redirect("../signup");
      }
      await user.save();
      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        res.redirect("/"); // recommended path to    /profile
      });
    } catch (err) {
      return next(err);
    }
  },
};
