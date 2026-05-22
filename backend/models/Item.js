// const mongoose = require("mongoose");

// const itemSchema = new mongoose.Schema({

//     title: {
//         type: String,
//         required: true
//     },

//     description: {
//         type: String,
//         required: true
//     },

//     category: {
//         type: String,
//         required: true
//     },

//     location: {
//         type: String,
//         required: true
//     },

//     date: {
//         type: Date,
//         required: true
//     },

//     type: {
//         type: String,
//         enum: ["lost", "found"],
//         required: true
//     },

//     status: {
//         type: String,
//         default: "pending"
//     },

//     approved: {
//         type: Boolean,
//         default: false
//     },

//     image: {
//         type: String,
//         default: ""
//     }

// }, { timestamps: true });

// module.exports = mongoose.model("Item", itemSchema);
const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    category: {
        type: String,
        required: true
    },

    location: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        required: true
    },

    type: {
        type: String,
        enum: ["lost", "found"],
        required: true
    },

    // FIXED USER ID
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    status: {
        type: String,
        default: "pending"
    },

    approved: {
        type: Boolean,
        default: false
    },

    image: {
        type: String,
        default: ""
    }

}, { timestamps: true });

module.exports = mongoose.model("Item", itemSchema);