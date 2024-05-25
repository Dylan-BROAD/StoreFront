const express = require("express");
const router = express.Router();
const cartCtrl = require("../controllers/cart");
const ensureLoggedIn = require("../config/ensureLoggedIn");

router.get("/cart", ensureLoggedIn, cartCtrl.cart);
router.post("/clothes/addToCart", ensureLoggedIn, cartCtrl.addItem);
router.delete("/cart/delete/:id", ensureLoggedIn, cartCtrl.deleteItem);
router.put("/cart/edit/:id", ensureLoggedIn, cartCtrl.editItem);

module.exports = router;
