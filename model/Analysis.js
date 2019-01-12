const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var Entity = new Schema({
  name: {
    type: String
  },
  uri: {
    type: String
  }
});

const Analysis = new Schema(
  {
    analysisId: {
      type: Number
    },
    queryText: {
      type: String
    },
    entities: [Entity]
  },
  {
    collection: "analysis"
  }
);

module.exports = mongoose.model("Analysis", Analysis);
