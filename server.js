const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const mongoose = require("mongoose");
const app = express();
const Analysis = require("./model/Analysis");
const NextId = require("./model/NextId");

mongoose
  .connect(
    "mongodb://localhost:27017/entityExtractor",
    { useNewUrlParser: true }
  )
  .then(
    () => {
      console.log("Database is connected");
    },
    err => {
      console.log("Can not connect to the database" + err);
    }
  );

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/analysis/analyze", function(req, res) {
  if (req.query.apiKey === undefined) {
    res.send("Please provide apiKey");
  }
  let queryText = req.body.text;
  axios
    .get(
      `https://api.dandelion.eu/datatxt/nex/v1/?text=${encodeURIComponent(
        req.body.text
      )}&include=types%2Cabstract%2Ccategories&token=${req.query.apiKey}`
    )
    .then(response => {
      let entities = extractEntitiesFromAnnotations(response.data.annotations);
      saveAnalysisInDatabase(queryText, entities).then(analysis =>
        res.send(analysis)
      );
    })
    .catch(error => {
      res.send({ error });
    });
});

app.get("/analysis/:analysisId", function(req, res) {
  Analysis.findOne({ analysisId: req.params.analysisId })
    .then(analysis => {
      res.send(analysis);
    })
    .catch(error => {
      res.send({ error });
    });
});

app.listen(3000, function() {
  console.log("App listening on port 3000!");
});

const extractEntitiesFromAnnotations = annotations => {
  let entities = [];
  annotations.forEach(annotation => {
    entities.push({ name: annotation.title, uri: annotation.uri });
  });
  return entities;
};

const saveAnalysisInDatabase = async (queryText, entities) => {
  let analysisId = await getNextId();
  let analysisObj = { analysisId, queryText, entities };
  let analysis = new Analysis(analysisObj);
  await analysis.save();
  return analysisObj;
};

const getNextId = async () => {
  let nextId = await NextId.findOne({});
  let idToBeReturned = nextId.id;
  await incrementAndSave(nextId);
  return idToBeReturned;
};

const incrementAndSave = async toBeIncrementedNextId => {
  toBeIncrementedNextId.id++;
  await toBeIncrementedNextId.save();
};
