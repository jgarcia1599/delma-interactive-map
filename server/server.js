const csvToJson = require("csvtojson");
const express = require("express");
const app = express();
const port = 5000;
const path = require("path");

//path to csv file we want to make into json
const path_to_csv = "data/delmaSeven.csv";

// using production build of main react app
app.use(express.static(path.join(__dirname, "../client/build")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

app.get("/api/delmadata", (req, res) => {
  csvToJson()
    .fromFile(path_to_csv)
    .then(jsonObj => {
      res.send(jsonObj);
    });
});

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
