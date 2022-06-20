const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = 7000;
let projectData = {};

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("Front-End"));

app.listen(port, () => {
  console.log(`Server Listening on Port ${port}`);
});

app.get("/", (req, res) => {
  res.send("index.html");
});
app.post("/addWeather", (req, res) => {
  if (req.body.cod == 200) {
    projectData = {
      cityName: req.body.name,
      date: req.body.dt,
      temp: req.body.main.temp,
      feeling: req.body.main.feels_like,
    };
  } else {
    projectData = req.body;
  }

  res.send(JSON.stringify(projectData));
});
app.get("/all", (req, res) => {
  res.send(JSON.stringify(projectData));
});
