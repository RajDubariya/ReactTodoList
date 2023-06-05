const mongoose = require("mongoose");

const URI = "mongodb://127.0.0.1:27017/todolist-mongo";

const connectDatabase = () => {
  mongoose
    .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log("connected to database");
    });
};

module.exports = connectDatabase;
