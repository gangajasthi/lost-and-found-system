// const User = require("../models/User");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const nodemailer = require("nodemailer");


// // REGISTER
// exports.registerUser = async (req, res) => {

//     try {

//         console.log(req.body);

//         const { name, email, mobile, password } = req.body;

//         // Check university email
//         if (!email.endsWith("@adityauniversity.in")) {

//             return res.status(400).json({
//                 message: "Use university email only"
//             });

//         }

//         // Check existing user
//         const existingUser = await User.findOne({ email });

//         if (existingUser) {

//             return res.status(400).json({
//                 message: "User already exists"
//             });

//         }

//         // Hash password
//         const hashedPassword = await bcrypt.hash(password, 10);

//         // Create user
//         const user = await User.create({
//             name,
//             email,
//             mobile,
//             password: hashedPassword
//         });

//         res.status(201).json({
//             message: "User Registered Successfully",
//             user
//         });

//     } catch (error) {

//         console.log(error);

//         res.status(500).json({
//             message: error.message
//         });

//     }

// };


// // LOGIN
// exports.loginUser = async (req, res) => {

//     try {

//         const { email, password } = req.body;

//         // Check user
//         const user = await User.findOne({ email });

//         if (!user) {

//             return res.status(400).json({
//                 message: "User not found"
//             });

//         }

//         // Compare password
//         const isMatch = await bcrypt.compare(password, user.password);

//         if (!isMatch) {

//             return res.status(400).json({
//                 message: "Invalid password"
//             });

//         }

//         // Generate token
//         const token = jwt.sign(
//             { id: user._id },
//             process.env.JWT_SECRET,
//             { expiresIn: "7d" }
//         );

//         res.status(200).json({
//             message: "Login Successful",
//             token,
//             user
//         });

//     } catch (error) {

//         console.log(error);

//         res.status(500).json({
//             message: error.message
//         });

//     }

// };

const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

let otpStore = {};


// REGISTER
exports.registerUser = async (req, res) => {

    try {

        console.log(req.body);

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

        console.log(error);

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

        console.log(error);

        res.status(500).json({
            message: error.message
        });

    }

};


// SEND OTP
exports.sendOtp = async (req, res) => {

    try {

        const { email } = req.body;

        const user = await User.findOne({ email });

        if (!user) {

            return res.status(400).json({
                message: "Email not registered"
            });

        }

        const otp =
            Math.floor(
                100000 + Math.random() * 900000
            );

        otpStore[email] = otp;

        const transporter =
            nodemailer.createTransport({

                service: "gmail",

                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS
                }

            });

        await transporter.sendMail({

            from: process.env.EMAIL_USER,

            to: email,

            subject: "Lost & Found Password Reset OTP",

            text:
                `Your OTP for password reset is: ${otp}`

        });

        res.status(200).json({
            message: "OTP sent successfully"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: error.message
        });

    }

};
// VERIFY OTP
exports.verifyOtp = async (req, res) => {

    try {

        const { email, otp } = req.body;

        if (
            otpStore[email] != otp
        ) {

            return res.status(400).json({
                message: "Invalid OTP"
            });

        }

        res.status(200).json({
            message: "OTP verified successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};


// RESET PASSWORD
exports.resetPassword = async (req, res) => {

    try {

        const {
            email,
            newPassword
        } = req.body;

        const user =
            await User.findOne({
                email
            });

        if (!user) {

            return res.status(400).json({
                message:
                    "User not found"
            });

        }

        const hashedPassword =
            await bcrypt.hash(
                newPassword,
                10
            );

        user.password =
            hashedPassword;

        await user.save();

        delete otpStore[email];

        res.status(200).json({
            message:
                "Password reset successful"
        });

    } catch (error) {

        res.status(500).json({
            message:
                error.message
        });

    }

};