const Item = require("../models/Item");
const axios = require("axios");

// CREATE ITEM
// exports.createItem = async (req, res) => {
//     try {

//         console.log(req.body);
//         console.log(req.file);

//         const newItem = await Item.create({
//             ...req.body,
//             userId: req.body.userId,
//             image: req.file ? req.file.filename : ""
//         });

//         const oppositeType =
//             newItem.type === "lost" ? "found" : "lost";

//         const items = await Item.find({
//             type: oppositeType
//         });

//        let bestMatch = null;
//         let bestScore = 0;

//         for (let item of items) {

//         const response =
//             await axios.post(
//             "http://127.0.0.1:8000/text-similarity",
//             {
//                 text1: newItem.description,
//                 text2: item.description
//             }
//             );

//         const similarity =
//             response.data.similarity;

//         console.log(
//             "SIMILARITY SCORE:",
//             similarity
//         );

//         if (
//             similarity >= 0.65 &&
//             similarity > bestScore
//         ) {
//             bestScore = similarity;
//             bestMatch = item;
//         }
//         }

//         let matchedItems = [];

//         if (bestMatch) {

//     matchedItems.push({
//         item:
//             bestMatch,

//         similarity:
//             bestScore
//     });

// }
//         const validMatches = matchedItems.filter(
//             (match) => match.item && match.item._id
//         );

//         newItem.matchedItems = validMatches.map((match) => ({
//             itemId: match.item._id,
//             similarity: match.similarity,
//         }));


// CREATE ITEM
// CREATE ITEM
exports.createItem = async (req, res) => {
    try {
        console.log(req.body);
        console.log(req.files);

        // const newItem = await Item.create({
        //     ...req.body,
        //     userId: req.body.userId,
        //     image: req.file
        //         ? req.file.filename
        //         : ""
        // });
        const newItem = await Item.create({
    ...req.body,

    userId: req.body.userId,

    image:
        req.files?.image?.[0]?.filename || "",

    placeImage:
        req.files?.placeImage?.[0]?.filename || "",

    latitude:
        req.body.latitude || "",

    longitude:
        req.body.longitude || ""
});

const oppositeType =
    newItem.type === "lost"
        ? "found"
        : "lost";

const items = await Item.find({
    type: oppositeType,
    resolved: { $ne: true },
    approved: { $ne: true },
    status: { $ne: "approved" }
});


        let bestMatch = null;
        let bestScore = 0;

        for (let item of items) {

            // Requirement 2: Compare using BOTH title and description
            const text1 = `${newItem.title} ${newItem.description}`;
            const text2 = `${item.title} ${item.description}`;

            // Debug: current vs compared
            console.log("─────────────────────────────────────");
            console.log("Comparing:", newItem.title, "→", item.title);

            const textResponse = await axios.post(
                "http://127.0.0.1:8000/text-similarity",
                { text1, text2 }
            );

            const textSimilarity = textResponse.data.similarity;
            const textScore = textSimilarity * 100; // convert to percentage

            let imageSimilarity = 0;
            let finalScore = 0;

            // Requirement 3 & 4: Image similarity rules + score calculation
            if (newItem.image && item.image) {
                // Both have images → use text + image
                try {
                    const imageResponse = await axios.post(
                        "http://127.0.0.1:8000/image-similarity",
                        {
                            image1: `../backend/uploads/${newItem.image}`,
                            image2: `../backend/uploads/${item.image}`
                        }
                    );
                    imageSimilarity = imageResponse.data.similarity;
                    // Requirement 4: finalScore = (textScore + imageScore) / 2
                    finalScore = (textScore + imageSimilarity) / 2;
                } catch (imgErr) {
                    console.warn("Image similarity failed, falling back to text only:", imgErr.message);
                    // Fallback to text only if image call fails
                    finalScore = textScore;
                }
            } else {
                // One or both images missing → text only (Req 3: never reject for missing image)
                finalScore = textScore;
            }

            // Clamp finalScore to 0–100 range (Requirement 4)
            finalScore = Math.min(100, Math.max(0, finalScore));

            // Requirement 7: Debug logs
            console.log("  Current item  :", newItem.title);
            console.log("  Compared item :", item.title);
            console.log("  Text similarity  :", textSimilarity.toFixed(4));
            console.log("  Image similarity :", imageSimilarity.toFixed(4));
            console.log("  Final score      :", finalScore.toFixed(2));

            // Requirement 5 & 6: Threshold >= 30, keep only best match
            if (finalScore >= 30 && finalScore > bestScore) {
                bestScore = finalScore;
                bestMatch = item;
            }
        }

        // Requirement 7: Print best match summary
        console.log("═════════════════════════════════════");
        console.log("BEST MATCH :", bestMatch ? bestMatch.title : "None");
        console.log("BEST SCORE :", bestScore.toFixed(2));
        console.log("═════════════════════════════════════");

        // Requirement 6: Save only the best match
        let matchedItems = [];

        if (bestMatch) {
            matchedItems.push({
                item: bestMatch,
                similarity: bestScore
            });
        }

        const validMatches = matchedItems.filter(
            (match) => match.item && match.item._id
        );

        newItem.matchedItems = validMatches.map((match) => ({
            itemId: match.item._id,
            similarity: match.similarity
        }));

        await newItem.save();

        res.status(201).json({
            message: "Item Posted Successfully",
            newItem,
            matchedItems
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// GET ALL ITEMS
exports.getAllItems = async (req, res) => {

    try {

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

        const item =
            await Item.findById(
                req.params.id
            );

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
exports.updateItem = async (req, res) => {

    try {

        const existingItem =
            await Item.findById(
                req.params.id
            );

        if (!existingItem) {

            return res.status(404).json({
                message: "Item not found"
            });

        }

        // LOST ITEM
        if (existingItem.type === "lost") {

            let resolvedWith = null;

            if (
                existingItem.matchedItems?.length > 0
            ) {

                const matchedId =
                    existingItem.matchedItems[0].itemId;

                const matchedItem =
                    await Item.findById(matchedId);

                if (matchedItem) {

                    matchedItem.status =
                        "approved";

                    matchedItem.approved =
                        true;

                    matchedItem.resolved =
                        true;

                    matchedItem.resolvedWith =
                        existingItem._id;

                    await matchedItem.save();

                    resolvedWith =
                        matchedItem._id;
                }
            }

            const item =
                await Item.findByIdAndUpdate(
                    req.params.id,
                    {
                        status: "approved",
                        approved: true,
                        resolved: true,
                        resolvedWith
                    },
                    { new: true }
                );

            return res.status(200).json({
                message:
                    "Lost item approved successfully",
                item
            });

        }

        // FOUND ITEM
        let adminImage = "";

        if (req.file) {

            adminImage =
                req.file.filename;

        } else if (
            req.body.useExistingImage === "true"
        ) {

            adminImage =
                existingItem.image || "";

        }

        let resolvedWith = null;

        if (
            existingItem.matchedItems?.length > 0
        ) {

            const matchedId =
                existingItem.matchedItems[0].itemId;

            const matchedItem =
                await Item.findById(matchedId);

            if (matchedItem) {

                matchedItem.status =
                    "approved";

                matchedItem.approved =
                    true;

                matchedItem.resolved =
                    true;

                matchedItem.resolvedWith =
                    existingItem._id;

                await matchedItem.save();

                resolvedWith =
                    matchedItem._id;

            }

        }

        const item =
            await Item.findByIdAndUpdate(
                req.params.id,
                {
                    status: "approved",
                    approved: true,
                    resolved: true,
                    resolvedWith,

                    adminTitle:
                        req.body.adminTitle || "",

                    adminDescription:
                        req.body.adminDescription || "",

                    adminImage
                },
                { new: true }
            );

        res.status(200).json({
            message:
                "Found item approved successfully",
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

        await Item.findByIdAndDelete(
            req.params.id
        );

        res.status(200).json({
            message:
                "Item Deleted Successfully"
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

        await Item.findByIdAndDelete(
            req.params.id
        );

        res.status(200).json({
            message:
                "Item Deleted Successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

exports.removeMatch = async (req, res) => {

    try {

        const item = await Item.findById(
            req.params.id
        );

        if (!item) {

            return res.status(404).json({
                message: "Item not found"
            });

        }

        item.matchedItems = [];

        await item.save();

        res.status(200).json({
            message: "Suggestion removed successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

exports.rejectItem = async (req, res) => {

    try {

        const item =
            await Item.findByIdAndUpdate(
                req.params.id,
                {
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
