import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/aditya-logo.png";

const Home = () => {
  return (
    <div className="min-h-screen bg-[#F4F7FB]">

      {/* Navbar */}
      <nav className="bg-white shadow-md px-10 py-4 flex items-center justify-between">

        <div className="flex items-center gap-4">

          <img
            src={logo}
            alt="Aditya University"
            className="w-16 h-16 object-contain"
          />

          <div>
            <h1 className="text-2xl font-bold text-[#0D47A1]">
              LOST & FOUND PORTAL
            </h1>

            <p className="text-sm text-gray-500">
              Aditya University
            </p>
          </div>

        </div>

      </nav>

      {/* Main Section */}
      <div className="flex items-center justify-center px-6 py-20">

        <div className="grid md:grid-cols-2 gap-10 items-center w-full max-w-6xl">

          {/* Left Side */}
          <div>

            <h1 className="text-6xl font-extrabold leading-tight text-[#0D47A1]">

              University
              <span className="text-[#FF6F00]"> Lost & Found </span>
              System

            </h1>

            <p className="mt-8 text-lg text-gray-600 leading-8">

              A secure university portal for reporting and managing
              lost and found items inside the campus with
              admin verification and smart claim handling.

            </p>

          </div>

          {/* Right Side */}
          <div className="bg-white p-10 rounded-3xl shadow-xl">

            <h2 className="text-3xl font-bold text-center text-[#0D47A1]">
              Portal Access
            </h2>

            <p className="text-center text-gray-500 mt-3">
              Select your login portal
            </p>

            <div className="mt-10 space-y-5">

              {/* User Login
              <Link
                to="/login"
                className="block bg-[#0D47A1] text-white text-center py-4 rounded-xl text-lg font-semibold hover:bg-[#1565C0] transition"
              >
                User Login
              </Link> */}
              {/* Adityan Login */}
              <Link
                to="/login"
                  className="block bg-[#0D47A1] text-white text-center py-4 rounded-xl text-lg font-semibold hover:bg-[#1565C0] transition"
        >
              Adityan Login
              </Link>

              {/* Visitor Login */}
              <Link
                //to="/login"
                to="/visitor-login"
                className="block bg-[#0D47A1] text-white text-center py-4 rounded-xl text-lg font-semibold hover:bg-[#1565C0] transition"
            >
                Visitor Login
              </Link>

              {/* Admin Login */}
              <Link
                to="/admin-login"
                className="block border-2 border-[#FF6F00] text-[#FF6F00] text-center py-4 rounded-xl text-lg font-semibold hover:bg-[#FF6F00] hover:text-white transition"
              >
                Admin Login
              </Link>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Home;