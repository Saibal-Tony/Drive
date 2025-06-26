const express = require("express");
const dotenv = require("dotenv");
const cookieparser = require("cookie-parser");
dotenv.config();
const connectToDb = require("./config/db");
connectToDb();
const userRoutes = require("./routes/user.routes");
const indexRoutes = require("./routes/index.routes");

const app = express();

app.set("view engine", "ejs");

app.use(cookieparser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user", userRoutes); // /user/test

app.use("/", indexRoutes);

app.listen(3000, () => {
  console.log("The server is running on port 3000");
});
