const express = require("express");
const router = express.Router();
const cartCtrl = require("../controllers/cart");

router.get("/cart", cartCtrl.cart);
router.post("/clothes/addToCart", cartCtrl.addItem);
router.delete("/cart/delete/:id", cartCtrl.deleteItem);
router.put("/cart/edit/:id", cartCtrl.editItem);

module.exports = router;
