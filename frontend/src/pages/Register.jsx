import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/aditya-logo.png";

const Register = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {

            const response = await axios.post(
                "http://localhost:5000/api/auth/register",
                {
                    name,
                    email,
                    mobile,
                    password
                }
            );

            alert(response.data.message);

            console.log(response.data);

        } catch (error) {

            console.log(error);

            alert(error.response?.data?.message || "Registration Failed");
        }
    };

    return (
        <div className="min-h-screen bg-[#F4F7FB] flex items-center justify-center px-6 py-10">

            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-6xl w-full grid md:grid-cols-2">

                {/* Left Side */}
                <div className="bg-[#0D47A1] text-white p-14 flex flex-col justify-center">

                    <img
                        src={logo}
                        alt="Aditya University"
                        className="w-24 mb-8 bg-white p-2 rounded-xl"
                    />

                    <h1 className="text-5xl font-extrabold leading-tight">
                        User Registration
                    </h1>

                    <p className="mt-6 text-lg text-blue-100 leading-8">

                        Create your university portal account
                        to report lost or found items securely
                        inside the campus.

                    </p>

                </div>

                {/* Right Side */}
                <div className="p-14">

                    <h2 className="text-4xl font-bold text-[#0D47A1] text-center">
                        Create Account
                    </h2>

                    <p className="text-center text-gray-500 mt-3">
                        Fill your details to continue
                    </p>

                    <form
                        onSubmit={handleSubmit}
                        className="mt-10 space-y-5"
                    >

                        {/* Full Name */}
                        <div>

                            <label className="block mb-2 font-medium text-gray-700">
                                Full Name
                            </label>

                            <input
                                type="text"
                                placeholder="Enter full name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full border border-gray-300 rounded-xl px-5 py-4 outline-none focus:border-[#0D47A1]"
                            />

                        </div>

                        {/* Email */}
                        <div>

                            <label className="block mb-2 font-medium text-gray-700">
                                College Email
                            </label>

                            <input
                                type="email"
                                placeholder="example@adityauniversity.in"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full border border-gray-300 rounded-xl px-5 py-4 outline-none focus:border-[#0D47A1]"
                            />

                        </div>

                        {/* Mobile */}
                        <div>

                            <label className="block mb-2 font-medium text-gray-700">
                                Mobile Number
                            </label>

                            <input
                                type="text"
                                placeholder="Enter mobile number"
                                value={mobile}
                                onChange={(e) => setMobile(e.target.value)}
                                className="w-full border border-gray-300 rounded-xl px-5 py-4 outline-none focus:border-[#0D47A1]"
                            />

                        </div>

                        {/* Password */}
                        <div>

                            <label className="block mb-2 font-medium text-gray-700">
                                Password
                            </label>

                            <input
                                type="password"
                                placeholder="Create password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full border border-gray-300 rounded-xl px-5 py-4 outline-none focus:border-[#0D47A1]"
                            />

                        </div>

                        {/* Confirm Password */}
                        <div>

                            <label className="block mb-2 font-medium text-gray-700">
                                Confirm Password
                            </label>

                            <input
                                type="password"
                                placeholder="Confirm password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full border border-gray-300 rounded-xl px-5 py-4 outline-none focus:border-[#0D47A1]"
                            />

                        </div>

                        {/* Button */}
                        <button
                            type="submit"
                            className="w-full bg-[#0D47A1] text-white py-4 rounded-xl text-lg font-semibold hover:bg-blue-800 transition"
                        >
                            Register
                        </button>

                    </form>

                    {/* Login Link */}
                    <p className="text-center mt-6 text-gray-600">

                        Already have an account?

                        <Link
                            to="/login"
                            className="text-[#FF6F00] font-semibold ml-2"
                        >
                            Login
                        </Link>

                    </p>

                </div>

            </div>

        </div>
    );
};

export default Register;