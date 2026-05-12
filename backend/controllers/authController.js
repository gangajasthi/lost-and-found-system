const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// REGISTER
exports.registerUser = async (req, res) => {
    try {

        const { name, email, mobile, password } = req.body;

        // Check university email
        if (!email.endsWith("@adityauniversity.in")) {
            return res.status(400).json({
                message: "Use university email only"
            });
        }

        // Check existing user
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = await User.create({
            name,
            email,
            mobile,
            password: hashedPassword
        });

        res.status(201).json({
            message: "User Registered Successfully",
            user
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


// LOGIN
exports.loginUser = async (req, res) => {

    try {

        const { email, password } = req.body;

        // Check user
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "User not found"
            });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid password"
            });
        }

        // Generate token
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.status(200).json({
            message: "Login Successful",
            token,
            user
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};