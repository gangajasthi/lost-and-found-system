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
exports.createItem = async (req, res) => {

    try {

        console.log(req.body);
        console.log(req.file);

        const newItem = await Item.create({
            ...req.body,
            userId: req.body.userId,
            image: req.file
                ? req.file.filename
                : ""
        });

        const oppositeType =
            newItem.type === "lost"
                ? "found"
                : "lost";

        const items =
            await Item.find({
                type: oppositeType,
                resolved: { $ne: true }
            });

        let bestMatch = null;
        let bestScore = 0;

        for (let item of items) {

            const textResponse =
                await axios.post(
                    "http://127.0.0.1:8000/text-similarity",
                    {
                        text1:
                            newItem.description,

                        text2:
                            item.description
                    }
                );

            const textSimilarity =
                textResponse.data.similarity;

            let imageSimilarity = 0;

            if (
                newItem.image &&
                item.image
            ) {

                const imageResponse =
                    await axios.post(
                        "http://127.0.0.1:8000/image-similarity",
                        {
                            image1:
                                `../backend/uploads/${newItem.image}`,

                            image2:
                                `../backend/uploads/${item.image}`
                        }
                    );

                imageSimilarity =
                    imageResponse.data.similarity;
            }

            let similarity = 0;

            if (
                textSimilarity >= 0.50 &&
                imageSimilarity >= 30
            ) {

                similarity =
                    (
                        textSimilarity +
                        (imageSimilarity / 100)
                    ) / 2;
            }

            console.log(
                "FINAL SCORE:",
                similarity
            );

            if (
                similarity >= 0.30 &&
                similarity > bestScore
            ) {

                bestScore =
                    similarity;

                bestMatch =
                    item;
            }
        }

        let matchedItems = [];

        if (bestMatch) {

            matchedItems.push({
                item:
                    bestMatch,

                similarity:
                    bestScore
            });

        }

        const validMatches =
            matchedItems.filter(
                (match) =>
                    match.item &&
                    match.item._id
            );

        newItem.matchedItems =
            validMatches.map(
                (match) => ({
                    itemId:
                        match.item._id,

                    similarity:
                        match.similarity
                })
            );

        await newItem.save();

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
