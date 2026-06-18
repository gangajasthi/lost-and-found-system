const express = require("express");

const router = express.Router();

const {
    createClaim,
    getAllClaims,
    updateClaimStatus,
    markResolved
} = require("../controllers/claimController");


// CREATE CLAIM
router.post("/", createClaim);

// GET ALL CLAIMS
router.get("/", getAllClaims);

// UPDATE CLAIM STATUS
router.put("/:id", updateClaimStatus);

router.put("/resolve/:id", markResolved);


module.exports = router;