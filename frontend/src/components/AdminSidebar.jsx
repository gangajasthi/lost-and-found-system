import { Link, useLocation } from "react-router-dom";
import logo from "../assets/aditya-logo.png";

export default function AdminSidebar() {
  const location = useLocation();

  const menus = [
    {
  name: "Dashboard",
  path: "/admin-overview"
},
    {
      name: "Pending Items & AI Matches",
      path: "/admin-dashboard",
    },
    {
      name: "Claims",
      path: "/admin-claims",
    },
    {
      name: "Resolved Items",
      path: "/resolved-items",
    },
    {
      name: "Approved Items",
      path: "/approved-items",
    },
    {
      name: "Rejected Items",
      path: "/rejected-items",
    },
  ];

  return (
    // <div className="w-64 bg-white border-r border-gray-200 min-h-screen p-5">
    <div className="fixed left-0 top-0 w-72 h-screen bg-slate-50 border-r border-gray-200 p-5 overflow-y-auto">
      {/* <h1 className="text-2xl font-bold text-blue-600 mb-8">
        Admin Panel
      </h1> */}
      <div className="mb-8 flex flex-col items-center">
  {/* <img
    src={logo}
    alt="Aditya University"
    className="w-52 mb-3"
  /> */}
  <img
  src={logo}
  alt="Aditya University"
  className="w-28 h-auto mb-2 object-contain"
/>

  <h1 className="text-2xl font-bold text-blue-600">
    Admin Panel
  </h1>
</div>

      <div className="space-y-2">
        {menus.map((menu) => (
          <Link
            key={menu.path}
            to={menu.path}
            className={`block px-4 py-3 rounded-xl font-medium transition
              ${
                location.pathname === menu.path
                //   ? "bg-blue-600 text-white"
                //   : "hover:bg-gray-100 text-gray-700"
                ? "bg-gradient-to-r from-slate-800 to-slate-700 text-white shadow-lg"
                : "text-slate-700 hover:bg-slate-100"
              }`}
          >
            {menu.name}
          </Link>
        ))}
      </div>
    </div>
  );
}

