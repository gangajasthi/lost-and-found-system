
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import logo from "../assets/aditya-logo.png";

const AdminLogin = () => {

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

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await API.post(
                "/auth/login",
                formData
            );

            console.log(response.data);

            // check admin role
            if (response.data.user.role !== "admin") {
                alert("Access denied. Admin only");
                return;
            }

            // save token
            localStorage.setItem(
                "token",
                response.data.token
            );

            // save user
            localStorage.setItem(
                "user",
                JSON.stringify(response.data.user)
            );

            alert("Admin Login Successful");

            navigate("/admin-dashboard");

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

            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-5xl w-full grid md:grid-cols-2">

                {/* Left Side */}
                <div className="bg-[#FF6F00] text-white p-14 flex flex-col justify-center">

                    <img
                        src={logo}
                        alt="Aditya University"
                        className="w-24 mb-8 bg-white p-2 rounded-xl"
                    />

                    <h1 className="text-5xl font-extrabold leading-tight">
                        Admin Portal
                    </h1>

                    <p className="mt-6 text-lg leading-8 text-orange-100">
                        Secure administrator access for managing
                        lost reports, found items, claims,
                        and verification requests.
                    </p>

                </div>

                {/* Right Side */}
                <div className="p-14">

                    <h2 className="text-4xl font-bold text-[#0D47A1] text-center">
                        Admin Login
                    </h2>

                    <p className="text-center text-gray-500 mt-3">
                        Authorized access only
                    </p>

                    <form
                        className="mt-10 space-y-6"
                        onSubmit={handleSubmit}
                    >

                        <div>
                            <label className="block mb-2 font-medium text-gray-700">
                                Admin Email
                            </label>

                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter admin email"
                                className="w-full border border-gray-300 rounded-xl px-5 py-4 outline-none focus:border-[#FF6F00]"
                                required
                            />
                        </div>

                        <div>
                            <label className="block mb-2 font-medium text-gray-700">
                                Password
                            </label>

                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter password"
                                className="w-full border border-gray-300 rounded-xl px-5 py-4 outline-none focus:border-[#FF6F00]"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-[#FF6F00] text-white py-4 rounded-xl text-lg font-semibold hover:bg-orange-600 transition"
                        >
                            Admin Login
                        </button>

                    </form>

                </div>

            </div>

        </div>
    );
};

export default AdminLogin;
// import React from "react";
// import logo from "../assets/aditya-logo.png";

// const AdminLogin = () => {
//     return (
//         <div className="min-h-screen bg-[#F4F7FB] flex items-center justify-center px-6">

//             <div className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-5xl w-full grid md:grid-cols-2">

//                 {/* Left Side */}
//                 <div className="bg-[#FF6F00] text-white p-14 flex flex-col justify-center">

//                     <img
//                         src={logo}
//                         alt="Aditya University"
//                         className="w-24 mb-8 bg-white p-2 rounded-xl"
//                     />

//                     <h1 className="text-5xl font-extrabold leading-tight">
//                         Admin Portal
//                     </h1>

//                     <p className="mt-6 text-lg leading-8 text-orange-100">

//                         Secure administrator access for managing
//                         lost reports, found items, claims,
//                         and verification requests.

//                     </p>

//                 </div>

//                 {/* Right Side */}
//                 <div className="p-14">

//                     <h2 className="text-4xl font-bold text-[#0D47A1] text-center">
//                         Admin Login
//                     </h2>

//                     <p className="text-center text-gray-500 mt-3">
//                         Authorized access only
//                     </p>

//                     <form className="mt-10 space-y-6">

//                         <div>
//                             <label className="block mb-2 font-medium text-gray-700">
//                                 Admin Email
//                             </label>

//                             <input
//                                 type="email"
//                                 placeholder="Enter admin email"
//                                 className="w-full border border-gray-300 rounded-xl px-5 py-4 outline-none focus:border-[#FF6F00]"
//                             />
//                         </div>

//                         <div>
//                             <label className="block mb-2 font-medium text-gray-700">
//                                 Password
//                             </label>

//                             <input
//                                 type="password"
//                                 placeholder="Enter password"
//                                 className="w-full border border-gray-300 rounded-xl px-5 py-4 outline-none focus:border-[#FF6F00]"
//                             />
//                         </div>

//                         <button
//                             className="w-full bg-[#FF6F00] text-white py-4 rounded-xl text-lg font-semibold hover:bg-orange-600 transition"
//                         >
//                             Admin Login
//                         </button>

//                     </form>

//                 </div>

//             </div>

//         </div>
//     );
// };

// export default AdminLogin;