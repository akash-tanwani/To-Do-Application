require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

const uri = process.env.ATLAS_URI;

const { response } = require("express");

app.use(cors());
app.use(express.json());

mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
})

const connection = mongoose.connection;

connection.once("open", () => {
    console.log("Mongo database connection established successfully");
    console.log("--------------------------------------------------");
});

const port = process.env.PORT || 5000;


module.exports = { app, port, connection }