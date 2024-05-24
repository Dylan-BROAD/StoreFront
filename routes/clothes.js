const express = require("express");
const router = express.Router();
const clothesCtrl = require("../controllers/clothes");
const ensureLoggedIn = require("../config/ensureLoggedIn");

// GET /clothes
router.get("/", clothesCtrl.index);

// GET /clothes/new
router.get("/new", ensureLoggedIn, clothesCtrl.new);

router.get("/:id/edit", ensureLoggedIn, clothesCtrl.edit);
router.put("/:id", ensureLoggedIn, clothesCtrl.update);

// // GET /clothes/:id (show functionality) MUST be below new route
router.get("/:id", clothesCtrl.show);

// // POST /clothes
router.post("/", ensureLoggedIn, clothesCtrl.create);

// delete
router.delete("/:id", ensureLoggedIn, clothesCtrl.delete);

router.get("/orders", clothesCtrl.charge);
module.exports = router;
