const express = require("express");

const router = express.Router();

const upload = require("../middleware/upload");

const {
    createItem,
    getAllItems,
    getSingleItem,
    updateItem,
    deleteItem
} = require("../controllers/itemController");


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
router.put("/:id", updateItem);

// DELETE ITEM
router.delete("/:id", deleteItem);

module.exports = router;