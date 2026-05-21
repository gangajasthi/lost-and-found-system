const Item = require("../models/Item");
const axios = require("axios");


// CREATE ITEM
exports.createItem = async (req, res) => {

    try {
        console.log(req.body);

        const newItem = await Item.create({
            ...req.body,
            userId: req.body.userId
        });

        // Find opposite type items
        const oppositeType =
            newItem.type === "lost" ? "found" : "lost";

        const items = await Item.find({
            type: oppositeType
        });

        let matchedItems = [];

        for (let item of items) {

            const response = await axios.post(
                "http://127.0.0.1:8000/text-similarity",
                {
                    text1: newItem.description,
                    text2: item.description
                }
            );

            const similarity = response.data.similarity;

            console.log("SIMILARITY SCORE:", similarity);

            // TEMPORARY TEST CONDITION
            if (similarity > 0) {

                matchedItems.push({
                    item,
                    similarity
                });

            }

        }

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

        const items = await Item.find();

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
exports.updateItem = async (req, res) => {

    try {

        const item = await Item.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.status(200).json({
            message: "Item Updated Successfully",
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