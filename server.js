// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");
// Start up an instance of app
const app = express();
/* Middleware*/
const bodyParser = require("body-parser");
const cors = require("cors");
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static("website"));

// Setup Server
const port = 8080;
app.listen(port, () => {
  console.log(`running on port ${port}`);
});

// GET route
app.get("/all", sendData);
// GET route callback function
function sendData(request, response) {
  response.send(projectData);
  console.log(projectData);
}

// POST route
app.post("/uploadData", callBack);
// POST route callback function
function callBack(request, response) {
  projectData = {
    temp: request.body.temp,
    feelings: request.body.feelings,
    date: request.body.date,
  };
  console.log(projectData);
  response.send(projectData);
}
