const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const clothesSchema = new Schema({
  name: { type: String },
  image: { type: String },
  price: { type: Number, min: 1 },
  desc: { type: String },
});

const userSchema = new Schema(
  {
    name: String,
    googleId: {
      type: String,
      required: true,
    },
    email: String,
    avatar: String,
    cart: [clothesSchema],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
