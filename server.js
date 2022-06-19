const express = require("express");
const cors = require("cors");
var bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

let projectData = {};

port = 7000;
app.listen(port, () => {
  console.log(`Server Listening on Port ${port}`);
});

app.post("/weather", (req, res) => {
  //   projectData[req.body.city.id] = req.body;
  //   projectData = {
  //     [req.body.city.id]: req.body,
  //   };
  projectData = req.body;
  res.send(JSON.stringify(projectData));
});
