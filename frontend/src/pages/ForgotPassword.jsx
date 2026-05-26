import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {

    const navigate = useNavigate();

    const [email, setEmail] =
        useState("");

    const [otp, setOtp] =
        useState("");

    const [newPassword,
        setNewPassword] =
        useState("");

    const [otpSent,
        setOtpSent] =
        useState(false);

    const [otpVerified,
        setOtpVerified] =
        useState(false);


    // SEND OTP
    const handleSendOtp =
        async () => {

            try {

                const res =
                    await axios.post(
                        "http://localhost:5000/api/auth/send-otp",
                        { email }
                    );

                alert(
                    res.data.message
                );

                setOtpSent(true);

            } catch (error) {

                alert(
                    error.response?.data?.message
                );

            }

        };


    // VERIFY OTP
    const handleVerifyOtp =
        async () => {

            try {

                const res =
                    await axios.post(
                        "http://localhost:5000/api/auth/verify-otp",
                        {
                            email,
                            otp
                        }
                    );

                alert(
                    res.data.message
                );

                setOtpVerified(true);

            } catch (error) {

                alert(
                    error.response?.data?.message
                );

            }

        };


    // RESET PASSWORD
    const handleResetPassword =
        async () => {

            try {

                const res =
                    await axios.post(
                        "http://localhost:5000/api/auth/reset-password",
                        {
                            email,
                            newPassword
                        }
                    );

                alert(
                    res.data.message
                );

                navigate("/login");

            } catch (error) {

                alert(
                    error.response?.data?.message
                );

            }

        };


    return (

        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-5">

            <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">

                <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
                    Forgot Password
                </h2>


                {/* EMAIL */}
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) =>
                        setEmail(
                            e.target.value
                        )
                    }
                    className="w-full border rounded-lg p-3 mb-4"
                />

                {!otpSent && (

                    <button
                        onClick={handleSendOtp}
                        className="w-full bg-blue-600 text-white p-3 rounded-lg"
                    >
                        Send OTP
                    </button>

                )}


                {/* OTP */}
                {otpSent &&
                    !otpVerified && (

                        <>
                            <input
                                type="text"
                                placeholder="Enter OTP"
                                value={otp}
                                onChange={(e) =>
                                    setOtp(
                                        e.target.value
                                    )
                                }
                                className="w-full border rounded-lg p-3 mt-4 mb-4"
                            />

                            <button
                                onClick={handleVerifyOtp}
                                className="w-full bg-green-600 text-white p-3 rounded-lg"
                            >
                                Verify OTP
                            </button>
                        </>
                    )}


                {/* NEW PASSWORD */}
                {otpVerified && (

                    <>
                        <input
                            type="password"
                            placeholder="Enter new password"
                            value={newPassword}
                            onChange={(e) =>
                                setNewPassword(
                                    e.target.value
                                )
                            }
                            className="w-full border rounded-lg p-3 mt-4 mb-4"
                        />

                        <button
                            onClick={
                                handleResetPassword
                            }
                            className="w-full bg-orange-500 text-white p-3 rounded-lg"
                        >
                            Reset Password
                        </button>
                    </>
                )}

            </div>

        </div>
    );
};

export default ForgotPassword;