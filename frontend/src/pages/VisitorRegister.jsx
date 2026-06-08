import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";
import logo from "../assets/aditya-logo.png";

const Register = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        mobile: "",
        password: "",
        confirmPassword: ""
    });

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {

            alert("Passwords do not match");
            return;

        }

        try {

            const response = await API.post(
                "/auth/register",
             {
                    name: formData.name,
                    email: formData.email,
                     mobile: formData.mobile,
                    password: formData.password,
                     role: "visitor"
    }
);
            alert(response.data.message);

            navigate("/login");

        } catch (error) {

            console.log(error);

            alert(
                error.response?.data?.message ||
                "Registration Failed"
            );

        }

    };

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

                    {/* <h1 className="text-5xl font-extrabold leading-tight">
                        User Registration
                    </h1> */}

                    <h1 className="text-5xl font-extrabold leading-tight">
                         Visitor Registration
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
                        Register
                    </h2>

                    <p className="text-center text-gray-500 mt-3">
                        Create your account
                    </p>

                    <form
                        className="mt-10 space-y-6"
                        onSubmit={handleSubmit}
                    >

                        {/* Full Name */}
                        <div>

                            <label className="block mb-2 font-medium text-gray-700">
                                Full Name
                            </label>

                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter full name"
                                className="w-full border border-gray-300 rounded-xl px-5 py-4 outline-none focus:border-[#0D47A1]"
                                required
                            />

                        </div>

                        {/* Email */}
                        <div>

                            <label className="block mb-2 font-medium text-gray-700">
                                Email Address
                            </label>

                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                //placeholder="example@adityauniversity.in"
                                placeholder="example@gmail.com"
                                className="w-full border border-gray-300 rounded-xl px-5 py-4 outline-none focus:border-[#0D47A1]"
                                required
                            />

                        </div>

                        {/* Mobile */}
                        <div>

                            <label className="block mb-2 font-medium text-gray-700">
                                Mobile Number
                            </label>

                            <input
                                type="text"
                                name="mobile"
                                value={formData.mobile}
                                onChange={handleChange}
                                placeholder="Enter mobile number"
                                className="w-full border border-gray-300 rounded-xl px-5 py-4 outline-none focus:border-[#0D47A1]"
                                required
                            />

                        </div>

                        {/* Password */}
                        <div>

                            <label className="block mb-2 font-medium text-gray-700">
                                Password
                            </label>

                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Create password"
                                className="w-full border border-gray-300 rounded-xl px-5 py-4 outline-none focus:border-[#0D47A1]"
                                required
                            />

                        </div>

                        {/* Confirm Password */}
                        <div>

                            <label className="block mb-2 font-medium text-gray-700">
                                Confirm Password
                            </label>

                            <input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder="Confirm password"
                                className="w-full border border-gray-300 rounded-xl px-5 py-4 outline-none focus:border-[#0D47A1]"
                                required
                            />

                        </div>

                        {/* Register Button */}
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