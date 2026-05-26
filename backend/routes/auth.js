//const express = require("express");

// const router = express.Router();

// const {
//     registerUser,
//     loginUser
// } = require("../controllers/authController");

// router.post("/register", registerUser);

// router.post("/login", loginUser);

// module.exports = router;
// const express = require("express");

// const router = express.Router();

// const {
//     registerUser,
//     loginUser
// } = require("../controllers/authController");

// router.post("/register", registerUser);

// router.post("/login", loginUser);

// module.exports = router;
// const express = require("express");

// const router = express.Router();

// const {
//     registerUser,
//     loginUser,
//     sendOtp
// } = require("../controllers/authController");


// // REGISTER
// router.post(
//     "/register",
//     registerUser
// );

// // LOGIN
// router.post(
//     "/login",
//     loginUser
// );

// // SEND OTP
// router.post(
//     "/send-otp",
//     sendOtp
// );

// module.exports = router;

const express = require("express");

const router = express.Router();

const {
    registerUser,
    loginUser,
    sendOtp,
    verifyOtp,
    resetPassword
} = require("../controllers/authController");


// REGISTER
router.post(
    "/register",
    registerUser
);


// LOGIN
router.post(
    "/login",
    loginUser
);


// SEND OTP
router.post(
    "/send-otp",
    sendOtp
);


// VERIFY OTP
router.post(
    "/verify-otp",
    verifyOtp
);


// RESET PASSWORD
router.post(
    "/reset-password",
    resetPassword
);

module.exports = router;