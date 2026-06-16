const Claim = require("../models/Claim");
const nodemailer = require("nodemailer");

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
// CREATE CLAIM
exports.createClaim = async (req, res) => {

    console.log("CLAIM API HIT");
    console.log(req.body);

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
exports.updateClaimStatus =
  async (req, res) => {

    try {

      const claim =
        await Claim.findByIdAndUpdate(
        req.params.id,
        {
          status: req.body.status,
          rejectionReason:
            req.body.rejectionReason || ""
        },
        {
          new: true
        }
      ).populate("itemId");

      await transporter.sendMail({

        from:
          process.env.EMAIL_USER,

        to:
          claim.claimantEmail,

        subject:
          `Claim ${req.body.status}`,

        text:
`Hello ${claim.claimantName},

Your claim for "${claim.itemId?.title}" has been ${req.body.status} by admin.

Please login and check your claim status.

Thank you,
Lost & Found Team`

      });

      res.status(200).json({

        message:
          "Claim Status Updated & Email Sent",

        claim

      });

    } catch (error) {

      res.status(500).json({

        message:
          error.message

      });

    }

};