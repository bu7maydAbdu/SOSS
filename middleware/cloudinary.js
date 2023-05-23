const cloudinary = require("cloudinary").v2;

require("dotenv").config({ path: "./config/.env" });

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});
cloudinary.config({
  cloud_name: "dtdgzfjpt",
  api_key: "866399881797535",
  api_secret: "9GZGaaG1C_K0UmXPgZibLjELRdE",
});

module.exports = cloudinary;
