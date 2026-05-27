const Item = require("../models/Item");
const nodemailer =require("nodemailer");
const User =require("../models/User");

const transporter =
nodemailer.createTransport({

    service: "gmail",

    auth: {

        user:
            process.env.EMAIL_USER,

        pass:
            process.env.EMAIL_PASS

    }

});

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

        console.log("APPROVE CLICKED");

        const item =
            await Item.findByIdAndUpdate(
                req.params.id,
                {
                    approved: true,
                    status: "approved",

                    notification:
                        "✅ Your item has been approved"
                },
                { new: true }
            );

        console.log(
            "ITEM FOUND:",
            item.title
        );

        const user =
            await User.findById(
                item.userId
            );

        console.log(
            "USER EMAIL:",
            user.email
        );

        await transporter.sendMail({

            from:
                process.env.EMAIL_USER,

            to:
                user.email,

            subject:
                "Lost & Found Item Approved",

            text:
`Hello ${user.name},

Your ${item.type} item "${item.title}" has been approved by admin.

Please login and check your reports.

Thank you,
Lost & Found Team`
        });

        console.log(
            "EMAIL SENT SUCCESSFULLY"
        );

        res.status(200).json({
            message:
                "Item Approved & Email Sent",
            item
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message:
                error.message
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

exports.getApprovedItems =
async (req, res) => {

    try {

        const items =
            await Item.find({
                status: "approved"
            });

        res.status(200).json(
            items
        );

    } catch (error) {

        res.status(500).json({
            message:
                error.message
        });

    }

};


exports.getRejectedItems =
async (req, res) => {

    try {

        const items =
            await Item.find({
                status: "rejected"
            });

        res.status(200).json(
            items
        );

    } catch (error) {

        res.status(500).json({
            message:
                error.message
        });

    }

};