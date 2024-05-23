const express = require("express");
const router = express.Router();
const clothesCtrl = require("../controllers/clothes");

// GET /clothes
router.get("/", clothesCtrl.index);

// GET /clothes/new
router.get("/new", clothesCtrl.new);

router.get("/:id/edit", clothesCtrl.edit);
router.put("/:id", clothesCtrl.update);

// // GET /clothes/:id (show functionality) MUST be below new route
router.get("/:id", clothesCtrl.show);

// // POST /clothes
router.post("/", clothesCtrl.create);

// delete
router.delete("/:id", clothesCtrl.delete);

module.exports = router;
