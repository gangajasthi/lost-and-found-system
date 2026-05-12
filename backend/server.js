const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const authRoutes = require("./routes/auth");
const itemRoutes = require("./routes/item");
const adminRoutes = require("./routes/admin");
const claimRoutes = require("./routes/claim");

const app = express();


// Middleware
app.use(cors());

app.use(express.json());


// Static Upload Folder
app.use("/uploads", express.static("uploads"));


// Routes
app.use("/api/auth", authRoutes);

app.use("/api/items", itemRoutes);

app.use("/api/admin", adminRoutes);

app.use("/api/claims", claimRoutes);


// Test Route
app.get("/test", (req, res) => {
    res.send("Test Route Working");
});


// Default Route
app.get("/", (req, res) => {
    res.send("Lost and Found Backend Running");
});


// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log(err));


// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});