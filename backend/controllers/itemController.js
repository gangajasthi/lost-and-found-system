const Item = require("../models/Item");
const axios = require("axios");

// CREATE ITEM
exports.createItem = async (req, res) => {
    try {

        console.log(req.body);
        console.log(req.file);

        const newItem = await Item.create({
            ...req.body,
            userId: req.body.userId,
            image: req.file ? req.file.filename : ""
        });

        const oppositeType =
            newItem.type === "lost" ? "found" : "lost";

        const items = await Item.find({
            type: oppositeType
        });

        let matchedItems = [];

        for (let item of items) {

    try {

        const response =
            await axios.post(
                "http://127.0.0.1:8000/text-similarity",
                {
                    text1:
                        newItem.description,

                    text2:
                        item.description
                }
            );

        const similarity =
            response.data.similarity;

        console.log(
            "SIMILARITY SCORE:",
            similarity
        );

        if (similarity >= 0.40) {

            matchedItems.push({
                item,
                similarity
            });

        }

    } catch (err) {

        console.log(
            "AI service error"
        );

    }

}

newItem.matchedItems =
matchedItems.map(match => ({
    itemId:
        match.item._id,

    similarity:
        match.similarity
}));

await newItem.save();
console.log(
    "ITEM SAVED SUCCESSFULLY"
);
res.status(201).json({
    message:
        "Item Posted Successfully",

    newItem,
    matchedItems
});

    } catch (error) {

        res.status(500).json({
            message:
                error.message
        });

    }

};

        // for (let item of items) {

        //     const similarity = 0;

        //     console.log("SIMILARITY SCORE:", similarity);

        //     if (similarity > 0) {

        //         matchedItems.push({
        //             item,
        //             similarity
        //         });

        //     }
        // }
//                     for (let item of items) {

//                     const response =
//                         await axios.post(
//                             "http://127.0.0.1:8000/text-similarity",
//                             {
//                                 text1:
//                                     newItem.description,

//                                 text2:
//                                     item.description
//                             }
//                         );

//                     const similarity =
//                         response.data.similarity;

//                     console.log(
//                         "SIMILARITY SCORE:",
//                         similarity
//                     );

//                     // Threshold
//                     if (similarity >= 0.40) {

//                         matchedItems.push({
//                             item,
//                             similarity
//                         });

//                     }

//                 }
//                 newItem.matchedItems =
//                 matchedItems.map(match => ({
//                     itemId:
//                         match.item._id,

//                     similarity:
//                         match.similarity
//                 }));

//                 await newItem.save();

//         res.status(201).json({
//             message: "Item Posted Successfully",
//             newItem,
//             matchedItems
//         });

//     } catch (error) {

//         res.status(500).json({
//             message: error.message
//         });

//     }
// };

// for (let item of items) {

//     try {

//         const response =
//             await axios.post(
//                 "http://127.0.0.1:8000/text-similarity",
//                 {
//                     text1:
//                         newItem.description,

//                     text2:
//                         item.description
//                 }
//             );

//         const similarity =
//             response.data.similarity;

//         console.log(
//             "SIMILARITY SCORE:",
//             similarity
//         );

//         if (similarity >= 0.40) {

//             matchedItems.push({
//                 item,
//                 similarity
//             });

//         }

//     } catch (err) {

//         console.log(
//             "AI service error"
//         );

//     }

// }

// GET ALL ITEMS
exports.getAllItems = async (req, res) => {

    try {

        //const items = await Item.find();
        const items =
        await Item.find()
         .populate(
    "matchedItems.itemId"
   );

        res.status(200).json(items);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// GET SINGLE ITEM
exports.getSingleItem = async (req, res) => {

    try {

        const item = await Item.findById(req.params.id);

        if (!item) {
            return res.status(404).json({
                message: "Item not found"
            });
        }

        res.status(200).json(item);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// UPDATE ITEM
// Handles:
//   LOST  → approve directly (no extra fields needed)
//   FOUND → save adminTitle, adminDescription, adminImage before approving
//
// For found items, the frontend sends multipart/form-data so that an
// optional admin image file can be uploaded.  The route must use the
// same multer middleware that createItem uses (single("image")).
//
// adminImage resolution priority (found items only):
//   1. Admin uploaded a new file  → use req.file.filename
//   2. useExistingImage === "true" → use the original item.image
//   3. Otherwise                  → "" (no image shown to users)
exports.updateItem = async (req, res) => {

    try {

        const existingItem =
            await Item.findById(req.params.id);

        if (!existingItem) {
            return res.status(404).json({
                message: "Item not found"
            });
        }

        // ── LOST ITEM ─────────────────────────────────────────
        if (existingItem.type === "lost") {

            const item =
                await Item.findByIdAndUpdate(
                    req.params.id,
                    {
                        status: "approved",
                        approved: true
                    },
                    { new: true }
                );

            return res.status(200).json({
                message: "Lost item approved successfully",
                item
            });

        }

        // ── FOUND ITEM ────────────────────────────────────────
        // Determine which adminImage to persist
        let adminImage = "";

        if (req.file) {
            // Admin uploaded a new image
            adminImage = req.file.filename;
        } else if (req.body.useExistingImage === "true") {
            // Admin chose to reuse the original finder's image
            adminImage = existingItem.image || "";
        }
        // else: leave adminImage as "" → no image shown publicly

        const item =
            await Item.findByIdAndUpdate(
                req.params.id,
                {
                    status: "approved",
                    approved: true,
                    adminTitle:
                        req.body.adminTitle || "",
                    adminDescription:
                        req.body.adminDescription || "",
                    adminImage
                },
                { new: true }
            );

        res.status(200).json({
            message: "Found item approved successfully",
            item
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// DELETE ITEM
exports.deleteItem = async (req, res) => {

    try {

        await Item.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "Item Deleted Successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};
