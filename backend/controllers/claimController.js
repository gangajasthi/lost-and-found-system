const Claim = require("../models/Claim");


// CREATE CLAIM
exports.createClaim = async (req, res) => {

    try {

        const claim = await Claim.create({
            ...req.body,
            userId: req.body.userId
        });

        res.status(201).json({
            message: "Claim Submitted Successfully",
            claim
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};


// GET ALL CLAIMS
exports.getAllClaims = async (req, res) => {

    try {

        const claims = await Claim.find().populate("itemId");

        res.status(200).json(claims);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};


// UPDATE CLAIM STATUS
exports.updateClaimStatus = async (req, res) => {

    try {

        const claim = await Claim.findByIdAndUpdate(
            req.params.id,
            {
                status: req.body.status
            },
            { new: true }
        );

        res.status(200).json({
            message: "Claim Status Updated",
            claim
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};