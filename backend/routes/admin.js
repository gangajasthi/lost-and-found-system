const express = require("express");

const router = express.Router();

// const {
//     getPendingItems,
//     approveItem,
//     rejectItem,
//     updateStatus
// } = require("../controllers/adminController");

const {
    getPendingItems,
    approveItem,
    rejectItem,
    updateStatus,
    getApprovedItems,
    getRejectedItems
} = require("../controllers/adminController");


// GET PENDING ITEMS
router.get("/pending", getPendingItems);

// APPROVE ITEM
router.put("/approve/:id", approveItem);

// REJECT ITEM
router.put("/reject/:id", rejectItem);

// UPDATE STATUS
router.put("/status/:id", updateStatus);

// GET APPROVED ITEMS
router.get(
    "/approved",
    getApprovedItems
);

// GET REJECTED ITEMS
router.get(
    "/rejected",
    getRejectedItems
);

module.exports = router;