const express = require("express");
const bodyParser = require("body-parser");
const usersRoutes = require("./api/routes/user");
const questionsRoutes = require("./api/routes/question");
const answersRoutes = require("./api/routes/answer");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

var cors = require("cors");

mongoose.set("strictQuery", false);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_CONNECTION, { useNewUrlParser: true })

  .then(console.log("Connected successfully"))

  .catch((error) => {
    console.log(error, "Something went wrong");
  });

app.use(usersRoutes);
app.use(questionsRoutes);
app.use(answersRoutes);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.listen(3002);
