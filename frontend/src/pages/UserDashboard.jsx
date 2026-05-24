import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/aditya-logo.png";

const UserDashboard = () => {

    const navigate = useNavigate();
    const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");

};

    return (

        <div className="min-h-screen bg-[#F4F7FB]">

            {/* Navbar */}
            <nav className="bg-white shadow-md px-10 py-4 flex items-center justify-between">

                {/* Left */}
                <div className="flex items-center gap-4">

                    <img
                        src={logo}
                        alt="Aditya University"
                        className="w-14 h-14 object-contain"
                    />

                    <div>

                        <h1 className="text-2xl font-bold text-[#0D47A1]">
                            USER DASHBOARD
                        </h1>

                        <p className="text-sm text-gray-500">
                            Lost & Found Portal
                        </p>

                    </div>

                </div>

                {/* Right */}
                <button
                    onClick={handleLogout}
                    className="bg-[#FF6F00] text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition"
                >
                    Logout
                </button>

            </nav>

            {/* Main Section */}
            <div className="px-10 py-12">

                {/* Welcome */}
                <div className="bg-white rounded-3xl shadow-lg p-10">

                    <h1 className="text-4xl font-bold text-[#0D47A1]">
                        Welcome Back 👋
                    </h1>

                    <p className="mt-4 text-gray-600 text-lg">
                        Manage your lost and found activities securely.
                    </p>

                </div>

                {/* Dashboard Cards */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">

                    {/* Lost Item */}
                    <div className="bg-white rounded-3xl shadow-lg p-8 hover:shadow-2xl transition">

                        <h2 className="text-2xl font-bold text-[#0D47A1]">
                            Report Lost Item
                        </h2>

                        <p className="mt-4 text-gray-600">
                            Submit details about your lost item.
                        </p>

                        <button
                            onClick={() => navigate("/report-lost")}
                            className="mt-6 bg-[#0D47A1] text-white px-5 py-3 rounded-xl hover:bg-blue-800 transition"
                        >
                            Open
                        </button>

                    </div>

                    {/* Found Item */}
                    <div className="bg-white rounded-3xl shadow-lg p-8 hover:shadow-2xl transition">

                        <h2 className="text-2xl font-bold text-[#FF6F00]">
                            Report Found Item
                        </h2>

                        <p className="mt-4 text-gray-600">
                            Inform administration about found items.
                        </p>

                        <button
                            onClick={() => navigate("/report-found")}
                            className="mt-6 bg-[#FF6F00] text-white px-5 py-3 rounded-xl hover:bg-orange-600 transition"
                        >
                            Open
                        </button>

                    </div>

                    {/* My Reports */}
                    <div className="bg-white rounded-3xl shadow-lg p-8 hover:shadow-2xl transition">

                        <h2 className="text-2xl font-bold text-[#0D47A1]">
                            My Reports
                        </h2>

                        <p className="mt-4 text-gray-600">
                            Track all your submitted reports.
                        </p>

                        <button
                            onClick={() => navigate("/my-reports")}
                            className="mt-6 bg-[#0D47A1] text-white px-5 py-3 rounded-xl hover:bg-blue-800 transition"
                        >
                            View
                        </button>

                    </div>

                    {/* Claims */}
                    <div className="bg-white rounded-3xl shadow-lg p-8 hover:shadow-2xl transition">

                        <h2 className="text-2xl font-bold text-[#FF6F00]">
                            Claim Status
                        </h2>

                        <p className="mt-4 text-gray-600">
                            Check your item claim verification.
                        </p>

                        <button
                            onClick={() => navigate("/claims")}
                            className="mt-6 bg-[#FF6F00] text-white px-5 py-3 rounded-xl hover:bg-orange-600 transition"
                        >
                            Check
                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default UserDashboard;