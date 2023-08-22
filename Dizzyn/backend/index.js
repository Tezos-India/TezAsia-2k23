const express = require("express");
const app = require("express")();
require("dotenv").config();
const port = process.env.PORT || 4001;
const router = require("./router/index.js");
const cors = require("cors");

app.use(express.json());

const corsOptions = {
  origin: "*", // Replace this with the actual frontend origin(s) you want to allow
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

app.use(cors(corsOptions)); // Set up CORS middleware

app.use("/api", router);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
