const express = require("express");
const PORT = 8000;
const app = express();

app.set("view engine", "ejs");
app.listen(PORT || process.env.PORT, () => {
  console.log(`server is running on ${PORT}`);
});
