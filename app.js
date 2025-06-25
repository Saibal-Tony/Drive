const express = require("express");
const app = express();
const dotenv = require("dotenv");

dotenv.config();

const connectToDb = require("./config/db");
connectToDb();

const userRoutes = require("./routes/user.routes");

app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user", userRoutes); // /user/test

app.listen(3000, () => {
  console.log("The server is running on port 3000");
});
