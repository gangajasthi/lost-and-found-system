const Item = require("../models/Item");


// GET PENDING ITEMS
exports.getPendingItems = async (req, res) => {

    try {

        const items = await Item.find({
            approved: false
        });

        res.status(200).json(items);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};


// APPROVE ITEM
exports.approveItem = async (req, res) => {

    try {

        const item = await Item.findByIdAndUpdate(
            req.params.id,
            {
                approved: true,
                status: "approved"
            },
            { new: true }
        );

        res.status(200).json({
            message: "Item Approved",
            item
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};


// REJECT ITEM
exports.rejectItem = async (req, res) => {

    try {

        const item = await Item.findByIdAndUpdate(
            req.params.id,
            {
                approved: false,
                status: "rejected"
            },
            { new: true }
        );

        res.status(200).json({
            message: "Item Rejected",
            item
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};


// UPDATE STATUS
exports.updateStatus = async (req, res) => {

    try {

        const item = await Item.findByIdAndUpdate(
            req.params.id,
            {
                status: req.body.status
            },
            { new: true }
        );

        res.status(200).json({
            message: "Status Updated",
            item
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};