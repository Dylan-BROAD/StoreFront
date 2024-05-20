const Clothes = require("../models/clothing");

const data = require("../models/placeHolder");

module.exports = {
  index,
  new: newClothes,
  create,
};

// index GET /products
async function index(req, res) {
  const clothes = await Clothes.find({});
  res.render("clothes/index", { title: "All THREADS", clothes });
}

// New

function newClothes(req, res) {
  res.render("clothes/new", { title: "Add THREADS", errorMsg: "" });
}

// Delete
// Update

// Create
async function create(req, res) {
  try {
    const clothes = await Clothes.create(req.body);
    res.redirect(`/clothes/`);
  } catch (err) {
    console.log(err);
    res.render("clothes/new", { errorMsg: err.message });
  }
}

// Edit
// Show
