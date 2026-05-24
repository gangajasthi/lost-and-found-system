const express = require("express");
const router = express.Router();

const {
  createItem,
  getAllItems,
  getSingleItem,
  updateItem,
  deleteItem
} = require("../controllers/itemController");

const upload = require("../middleware/upload");

// CREATE ITEM
router.post(
  "/",
  upload.single("image"),
  createItem
);

// GET ALL ITEMS
router.get("/", getAllItems);

// GET SINGLE ITEM
router.get("/:id", getSingleItem);

// UPDATE ITEM
router.put(
  "/:id",
  upload.single("image"),
  updateItem
);

// DELETE ITEM
router.delete("/:id", deleteItem);

module.exports = router;