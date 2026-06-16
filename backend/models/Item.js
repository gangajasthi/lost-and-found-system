const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    date: {
      type: Date,
      required: true,
    },

    type: {
      type: String,
      enum: ["lost", "found"],
      required: true,
    },

    status: {
      type: String,
      default: "pending",
    },

    approved: {
      type: Boolean,
      default: false,
    },

    image: {
      type: String,
      default: "",
    },

    placeImage: {
    type: String,
    default: "",
    },

    latitude: {
    type: String,
    default: "",
    },

    longitude: {
    type: String,
    default: "",
  },

    adminTitle: {
      type: String,
      default: "",
    },

    adminDescription: {
      type: String,
      default: "",
    },

    adminImage: {
      type: String,
      default: "",
    },
    notification: {
      type: String,
      default: ""
    },

    rejectionReason: {
      type: String,
      default: ""
    },
    matchedItems: [
  {
    itemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
    },

    similarity: {
      type: Number,
      default: 0,
    },
  },
],
resolved: {
  type: Boolean,
  default: false,
},

resolvedWith: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Item",
  default: null,
},

// verificationQuestions: [
//   {
//     question: String,
//     expectedAnswer: String
//   }
// ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Item", itemSchema);
