const mongoose = require("mongoose");

const claimSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    itemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item",
        required: true
    },

    claimantName: {
        type: String,
        required: true
    },

    claimantEmail: {
        type: String,
        required: true
    },

    message: {
        type: String,
        required: true
    },

    adminNote: {
        type: String,
        default: ""
    },

    rejectionReason: {
    type: String,
    default: ""
},

    answers: [
        {
            question: String,
            answer: String
  }
],

    verificationScore: {
    type: Number,
    default: 0
},

    status: {
        type: String,
        default: "pending"
    },
    
}, { timestamps: true });

module.exports = mongoose.model("Claim", claimSchema);