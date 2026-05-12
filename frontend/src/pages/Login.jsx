import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/aditya-logo.png";

const Login = () => {
    return (
        <div className="min-h-screen bg-[#F4F7FB] flex items-center justify-center px-6">

            <div className="grid md:grid-cols-2 bg-white rounded-3xl shadow-2xl overflow-hidden max-w-6xl w-full">

                {/* Left Side */}
                <div className="bg-[#0D47A1] text-white p-14 flex flex-col justify-center">

                    <img
                        src={logo}
                        alt="Aditya University"
                        className="w-24 mb-8 bg-white p-2 rounded-xl"
                    />

                    <h1 className="text-5xl font-extrabold leading-tight">
                        User Login
                    </h1>

                    <p className="mt-6 text-lg text-blue-100 leading-8">

                        Access the university lost and found portal
                        to report and manage lost or found items securely.

                    </p>

                </div>

                {/* Right Side */}
                <div className="p-14">

                    <h2 className="text-4xl font-bold text-[#0D47A1] text-center">
                        Welcome Back
                    </h2>

                    <p className="text-center text-gray-500 mt-3">
                        Login to continue
                    </p>

                    <form className="mt-10 space-y-6">

                        <div>
                            <label className="block mb-2 font-medium text-gray-700">
                                College Email
                            </label>

                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full border border-gray-300 rounded-xl px-5 py-4 outline-none focus:border-[#0D47A1]"
                            />
                        </div>

                        <div>
                            <label className="block mb-2 font-medium text-gray-700">
                                Password
                            </label>

                            <input
                                type="password"
                                placeholder="Enter your password"
                                className="w-full border border-gray-300 rounded-xl px-5 py-4 outline-none focus:border-[#0D47A1]"
                            />
                        </div>

                        <button
                            className="w-full bg-[#0D47A1] text-white py-4 rounded-xl text-lg font-semibold hover:bg-blue-800 transition"
                        >
                            Login
                        </button>

                    </form>

                    <p className="text-center mt-6 text-gray-600">
                        Don’t have an account?

                        <Link
                            to="/register"
                            className="text-[#FF6F00] font-semibold ml-2"
                        >
                            Register
                        </Link>
                    </p>

                </div>

            </div>

        </div>
    );
};

export default Login;