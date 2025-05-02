const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

// Item Model
const Item = require("../../models/Item");

// @route  GET api/items
// @desc   Get All Items
// @access Public
router.get("/", (req, res) => {
  Item.find()
    .sort({ date: -1 })
    .then((items) => res.json(items));
});

// @route  POST api/items
// @desc   Create An Item
// @access Public
router.post("/", (req, res) => {
  const newItem = new Item({
    name: req.body.name,
  });

  newItem.save().then((item) => res.json(item));
});

// @route  DELETE api/items
// @desc   DELETE An Item
// @access Public
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  // Check if the ID is valid
  if (!ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid item ID format" });
  }

  // Proceed with deleting the item
  Item.findByIdAndDelete(id)
    .then((item) => {
      if (!item) {
        return res
          .status(404)
          .json({ success: false, message: "Item not found" });
      }
      res.json({ success: true });
    })
    .catch((err) => {
      console.error("Error deleting item:", err);
      res
        .status(500)
        .json({ success: false, message: "Server error", error: err });
    });
});

module.exports = router;
