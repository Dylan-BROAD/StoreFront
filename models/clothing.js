const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const clothesSchema = new Schema({
  name: { type: String },
  image: { type: String },
  price: { type: Number, min: 1 },
  desc: { type: String },
});

module.exports = mongoose.model("Clothes", clothesSchema);
