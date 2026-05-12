const express = require("express");

const router = express.Router();

const {
    getPendingItems,
    approveItem,
    rejectItem,
    updateStatus
} = require("../controllers/adminController");


// GET PENDING ITEMS
router.get("/pending", getPendingItems);

// APPROVE ITEM
router.put("/approve/:id", approveItem);

// REJECT ITEM
router.put("/reject/:id", rejectItem);

// UPDATE STATUS
router.put("/status/:id", updateStatus);

module.exports = router;