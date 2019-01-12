const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var NextId = new Schema(
  {
    id: {
      type: Number
    }
  },
  {
    collection: "nextId"
  }
);

module.exports = mongoose.model("NextId", NextId);
