const axios = require("axios");
const Claim = require("../models/Claim");
const nodemailer = require("nodemailer");
const Item = require("../models/Item");

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
// exports.createClaim = async (req, res) => {

//     console.log("CLAIM API HIT");
//     console.log(req.body);

//     try {

//         const claim = await Claim.create({
//             ...req.body,
//             userId: req.body.userId
//         });

//         res.status(201).json({
//             message: "Claim Submitted Successfully",
//             claim
//         });

//     // } catch (error) {

//     //     res.status(500).json({
//     //         message: error.message
//     //     });

//     // }

//       } catch (error) {

//     console.log("CLAIM ERROR:");
//     console.log(error);

//     res.status(500).json({
//         message: error.message
//     });

// }

// };

exports.createClaim = async (req, res) => {

    console.log("CLAIM API HIT");
    console.log(req.body);

    try {

        let verificationScore = 0;

        try {

            const item = await Item.findById(
                req.body.itemId
            );

            const userAnswers =
                req.body.answers
                    ?.map(a => a.answer)
                    .join(" ") || "";

            const aiResponse =
                await axios.post(
                    "http://127.0.0.1:8000/text-similarity",
                    {
                        text1:
                            item.adminDescription ||
                            item.description,

                        text2:
                            userAnswers
                    }
                );

            verificationScore =
                Math.round(
                    aiResponse.data.similarity * 100
                );

            console.log(
                "AI Similarity:",
                verificationScore
            );

        } catch (aiError) {

            console.log(
                "AI Similarity Error:",
                aiError.message
            );

        }

        const claim = await Claim.create({

            ...req.body,

            userId:
                req.body.userId,

            verificationScore

        });

        res.status(201).json({

            message:
                "Claim Submitted Successfully",

            claim

        });

    } catch (error) {

        console.log(
            "CLAIM ERROR:"
        );

        console.log(
            error
        );

        res.status(500).json({

            message:
                error.message

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

//claims resolved
exports.markResolved = async (req, res) => {
  try {

    const claim = await Claim.findById(req.params.id);

    if (!claim) {
      return res.status(404).json({
        message: "Claim not found"
      });
    }

    const item = await Item.findById(claim.itemId);

    if (!item) {
      return res.status(404).json({
        message: "Item not found"
      });
    }

    item.handoverCompleted = true;

    await item.save();

    res.status(200).json({
      message: "Item marked as resolved"
    });

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

      if (req.body.status === "approved") {

          await Item.findByIdAndUpdate(
            claim.itemId._id,
            {
              resolved: true
            }
          );

        }

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