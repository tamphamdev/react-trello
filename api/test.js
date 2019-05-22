const mongoose = require("mongoose");

const testSchema = new mongoose.Schema({
  title: String,
  tasks: [
    {
      id: String,
      title: String,
      startDate: String,
      endDate: String
    }
  ]
});

const test = mongoose.model("data", testSchema);
module.exports = test;