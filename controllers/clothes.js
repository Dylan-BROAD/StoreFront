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
    // Find the flight by its ID and remove it
    await Clothes.findByIdAndDelete(req.params.id);

    // Redirect to the flights page or any other appropriate page
    res.redirect("/clothes");
  } catch (err) {
    console.log(err);
    // Render the error template with an error message and status
    res
      .status(500)
      .render("error", { message: "Failed to delete threads", error: err });
  }
}

// Update
async function update(req, res) {
  try {
    console.log(req.params);
    const filter = { _id: req.params.id };
    const update = {
      name: req.body.name ? req.body.name : undefined,
      image: req.body.image ? req.body.image : undefined,
      price: req.body.price ? req.body.price : undefined,
      desc: req.body.desc ? req.body.desc : undefined,
      qty: req.body.qty ? req.body.qty : undefined,
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
    console.log(clothes);
    res.redirect(`/clothes/`);
  } catch (err) {
    console.log(err);
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
  console.log(clothes);
  res.render("clothes/show", { title: "THREADS Detail", clothes });
}
