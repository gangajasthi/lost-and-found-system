const express = require("express");
const router = express.Router();

const {
  createItem,
  getAllItems,
  getSingleItem,
  updateItem,
  deleteItem,
  removeMatch,
  rejectItem
} = require("../controllers/itemController");

const upload = require("../middleware/upload");

// CREATE ITEM
// router.post(
//   "/",
//   upload.single("image"),
//   createItem
// );
router.post(
  "/",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "placeImage", maxCount: 1 }
  ]),
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

router.put(
  "/remove-match/:id",
  removeMatch
);

router.put("/reject/:id",rejectItem);

module.exports = router;