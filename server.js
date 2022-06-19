const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = 7000;
let projectData = {};

app.use(cors());
app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`Server Listening on Port ${port}`);
});

app.post("/addWeather", (req, res) => {
  projectData = req.body;
  res.send(JSON.stringify(projectData));
});
