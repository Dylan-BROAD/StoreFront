const Clothes = require("../models/clothing");

const data = require("../models/placeHolder");

module.exports = {
  index,
  new: newClothes,
  delete: deleteThreads,
  update,
  create,
  edit,
  show,
  addItem,
  charge,
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
async function deleteThreads(req, res) {
  try {
    await Clothes.findByIdAndDelete(req.params.id);

    res.redirect("/clothes");
  } catch (err) {
    res
      .status(500)
      .render("error", { message: "Failed to delete threads", error: err });
  }
}

// Update
async function update(req, res) {
  try {
    const filter = { _id: req.params.id };
    const update = {
      name: req.body.name ? req.body.name : undefined,
      image: req.body.image ? req.body.image : undefined,
      price: req.body.price ? req.body.price : undefined,
      desc: req.body.desc ? req.body.desc : undefined,
    };
    const clothes = await Clothes.findOneAndUpdate(filter, {
      ...update,
    });
    if (!clothes) {
      return res.status(404).send("Clothes not found");
    }
    res.redirect(`/clothes/${req.params.id}`);
  } catch (err) {
    res.status(500).send("Can't update clothes");
  }
}

// Create
async function create(req, res) {
  try {
    const clothes = await Clothes.create(req.body);

    res.redirect(`/clothes/`);
  } catch (err) {
    res.render("clothes/new", { errorMsg: err.message });
  }
}

// Edit
async function edit(req, res) {
  try {
    const clothes = await Clothes.findById(req.params.id);
    if (!clothes) {
      return res.status(404).send("Clothes not found");
    }
    res.render("clothes/edit", { title: "Edit THREADS", clothes });
  } catch (err) {
    res.status(500).send("Can't edit clothes");
  }
}

// Show
async function show(req, res) {
  const clothes = await Clothes.findById(req.params.id);

  res.render("clothes/show", { title: "THREADS Detail", clothes });
}

// Add to cart
function addItem(req, res) {
  req.user.cart.push(req.body);
  req.user.save(function (err) {
    res.render("/clothes");
  });
}

function charge(req, res) {
  res.render("/orders", { user: req.user });
}
