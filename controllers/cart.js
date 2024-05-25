const User = require("../models/user");
const Clothes = require("../models/clothing");

module.exports = {
  cart,
  addItem,
  deleteItem,
  editItem,
};

async function addItem(req, res) {
  try {
    const userId = req.user._id;
    const itemId = req.body.itemId;

    // Find the clothing item by ID
    const item = await Clothes.findById(itemId);

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).render("error", { message: "User not found" });
    }

    user.cart.push(item);

    await user.save();
    console.log("HELLO");

    res.render("clothes/orders/new", { title: "Your Cart" });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .render("error", { message: "Failed to add item", error: err });
  }
}

async function deleteItem(req, res) {
  try {
    const userId = req.user._id;
    const itemId = req.params.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).render("error", { message: "User not found" });
    }

    user.cart.pull({ _id: itemId });

    await user.save();
    res.redirect("/cart");
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .render("error", { message: "Failed to delete item", error: err });
  }
}

async function editItem(req, res) {
  try {
    const user = await User.findById(req.user._id);
    const item = user.cart.id(req.params._id);

    await user.save();
    res.redirect("orders/new");
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .render("error", { message: "Failed to edit item", error: err });
  }
}

function cart(req, res) {
  res.render("clothes/orders/new", { title: "Add THREADS", errorMsg: "" });
}
