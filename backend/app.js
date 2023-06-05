const express = require("express");
const cors = require("cors");
const connectDatabase = require("./database/connectDatabase");

require("dotenv").config({ path: "./env" });
const port = process.env.PORT || 8000;

const app = express();

// middleware
app.use(express.json());
app.use(cors());

// database
connectDatabase();

// router
app.use("/todo", require("./routes/todoRouter"));

app.listen(port, () => {
  console.log(`listening to port ${port}`);
});
