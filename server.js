const express = require("express");
const path = require("path");
const shapes = require("./services/shapes");
const bodyParser = require("body-parser");
const makeShapeFile = require("./services/makeShapeFile");

const app = express();

app.use(express.static(path.join(__dirname, "client/build")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname + "/client/build/index.html"))
);

app.get("/shapes", (req, res) => res.send(shapes));
app.post("/shapes", (req, res) => {
  makeShapeFile(req.body);
  res.send("ok");
});
const port = process.env.PORT || 5000;
app.listen(port);

console.log("App listening on port " + port);
