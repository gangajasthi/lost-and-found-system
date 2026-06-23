import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import VisitorLogin from "./pages/VisitorLogin";
import Register from "./pages/Register";
import VisitorRegister from "./pages/VisitorRegister";
import AdminLogin from "./pages/AdminLogin";
import UserDashboard from "./pages/UserDashboard";
import ReportLost from "./pages/ReportLost";
import ReportFound from "./pages/ReportFound";
import MyReports from "./pages/MyReports";
import Claims from "./pages/Claims";
import AdminDashboard from "./pages/AdminDashboard";
import ApprovedItems from "./pages/ApprovedItems";
import RejectedItems from "./pages/RejectedItems";
import ForgotPassword from "./pages/ForgotPassword";
import AdminClaims from "./pages/AdminClaims";
import AdminOverview from "./pages/AdminOverview";
import ResolvedItems from "./pages/ResolvedItems";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* User Auth */}
        <Route path="/login" element={<Login />} />

        <Route path="/visitor-login" element={<VisitorLogin />} />

        <Route path="/register" element={<Register />} />

        <Route path="/visitor-register" element={<VisitorRegister />} />

        {/* User Dashboard */}
        <Route path="/dashboard" element={<UserDashboard />} />

        <Route path="/report-lost" element={<ReportLost />} />

        <Route path="/report-found" element={<ReportFound />} />

        <Route path="/my-reports" element={<MyReports />} />

        <Route path="/claims" element={<Claims />} />

        {/* Admin */}
        <Route path="/admin-login" element={<AdminLogin />} />

        <Route path="/admin-dashboard" element={<AdminDashboard />} />

        <Route path="/approved-items" element={<ApprovedItems />} />

        <Route path="/rejected-items" element={<RejectedItems />} />

        {/* <Route path="/forgot-password" element={<ForgotPassword />} /> */}

        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route path="/admin-claims" element={<AdminClaims />} />

        <Route path="/admin-overview" element={<AdminOverview />}/>

        <Route path="/resolved-items"  element={<ResolvedItems />}/>

      </Routes>

    </BrowserRouter>
  );
}

export default App;