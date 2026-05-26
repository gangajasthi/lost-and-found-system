import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";
import logo from "../assets/aditya-logo.png";

const Login = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    // const handleSubmit = async (e) => {

    //     e.preventDefault();

    //     try {

    //         const response = await API.post(
    //             "/auth/login",
    //             formData
    //         );

    //         console.log(response.data);

    //         // Save token
    //         localStorage.setItem(
    //             "token",
    //             response.data.token
    //         );

    //         // Save user
    //         localStorage.setItem(
    //             "user",
    //             JSON.stringify(response.data.user)
    //         );

    //         alert("Login Successful");

    //         navigate("/dashboard");

    //     } catch (error) {

    //         console.log(error);

    //         alert(
    //             error.response?.data?.message ||
    //             "Login Failed"
    //         );

    //     }

    // };
    const handleSubmit = async (e) => {

    e.preventDefault();

    try {

        const response = await API.post(
            "/auth/login",
            formData
        );

        console.log(response.data);

        // Save token
        localStorage.setItem(
            "token",
            response.data.token
        );

        // Save user
    localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
);

        alert("Login Successful");

        //navigate("/dashboard");
        if (response.data.user.role === "admin") {

    navigate("/admin-dashboard");

} else {

    navigate("/dashboard");

}

    } catch (error) {

        console.log(error);

        alert(
            error.response?.data?.message ||
            "Login Failed"
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

                    <form
                        className="mt-10 space-y-6"
                        onSubmit={handleSubmit}
                    >

                        {/* Email */}
                        <div>

                            <label className="block mb-2 font-medium text-gray-700">
                                College Email
                            </label>

                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
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
                                    placeholder="Enter your password"
                                    className="w-full border border-gray-300 rounded-xl px-5 py-4 outline-none focus:border-[#0D47A1]"
                                    required
                                />

                            {/* <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full border border-gray-300 rounded-xl px-5 py-4 outline-none focus:border-[#0D47A1]"
                                required
                            /> */}

                        </div>

                        
                        <div className="text-right mb-4">

                            <button
                                type="button"
                                onClick={() =>
                                    navigate(
                                        "/forgot-password"
                                    )
                                }
                                className="text-blue-600 text-sm hover:underline"
                            >
                                Forgot Password?
                            </button>

                            </div>

                        {/* Button */}
                        <button
                            type="submit"
                            className="w-full bg-[#0D47A1] text-white py-4 rounded-xl text-lg font-semibold hover:bg-blue-800 transition"
                        >
                            Login
                        </button>

                    </form>

                    {/* Register Link */}
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