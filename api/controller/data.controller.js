const Data = require("../model/data");

/* Get all dump data*/
module.exports = {
  board: async (req, res) => {
    let data = await Data.find();
    if (!data) {
      res.status(400).send({ message: "Cant get data" });
    } else {
      return await res.json(data);
    }
  }
};
