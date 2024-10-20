const express = require("express");
const router = require("./routes/route");
const cookieParser = require("cookie-parser");
const app = express();
const jwt = require("jsonwebtoken")
const chatRouter = require("./routes/chatRoute")
const cors = require("cors")
const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config();
app.use(cors())
app.use(express.json());
app.use(cookieParser());

const messageRouter = require("./routes/messageRoute");

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // Replace with your frontend URL
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,PUT,POST,DELETE,UPDATE,OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept"
  );
  res.setHeader("Access-Control-Expose-Headers", "Set-Cookie");
  next();
});

app.use("/userProfiles", express.static(path.join(__dirname, "userProfiles")));

app.use(router);

app.use("/chat",chatRouter)

app.use("/message",messageRouter)


mongoose.connect("mongodb://localhost:27017/messagingApp").then(() => {
  app.listen(3000);
});
