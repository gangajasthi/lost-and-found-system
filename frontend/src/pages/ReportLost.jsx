import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";
import FileUpload from "../components/FileUpload";

const CATEGORIES = [
    "Electronics", "Books & Notes", "ID Card / Documents",
    "Wallet / Purse", "Keys", "Clothing & Accessories",
    "Bag / Backpack", "Sports Equipment", "Stationery", "Other",
];

const LOCATIONS = [
    "Main Block", "Library", "Canteen", "Auditorium", "Hostel Block A",
    "Hostel Block B", "Labs Complex", "Sports Ground", "Parking Area",
    "Administrative Block", "Other",
];

const FIELD = ({ label, required, children, hint }) => (
    <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        {children}
        {hint && <p className="mt-1 text-xs text-gray-400">{hint}</p>}
    </div>
);

const INPUT = "w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all";
const SELECT = INPUT + " appearance-none cursor-pointer";

export default function ReportLost() {
    const navigate = useNavigate();
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        title: "", category: "", description: "", dateLost: "",
        lastLocation: "", contactPhone: "", additionalInfo: "", image: null,
    });

    const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        await new Promise((r) => setTimeout(r, 1500)); // Simulate API call
        setLoading(false);
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <DashboardLayout>
                <div className="max-w-lg mx-auto mt-16 text-center">
                    <div className="w-24 h-24 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-6">
                        <svg className="w-12 h-12 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Report Submitted!</h2>
                    <p className="text-gray-500 text-sm mb-2">
                        Your lost item report is under review by the admin.
                    </p>
                    <p className="text-xs text-blue-600 bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 mb-8">
                        ℹ️ Your report will be publicly visible only after admin approval.
                    </p>
                    <div className="flex gap-3 justify-center">
                        <button
                            onClick={() => setSubmitted(false)}
                            className="px-5 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                            Submit Another
                        </button>
                        <button
                            onClick={() => navigate("/my-reports")}
                            className="px-5 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors"
                        >
                            View My Reports
                        </button>
                    </div>
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            {/* Page Header */}
            <div className="mb-6">
                <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
                    <span>Dashboard</span>
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    <span className="text-orange-600 font-semibold">Report Lost Item</span>
                </div>
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-gray-900">Report a Lost Item</h1>
                        <p className="text-sm text-gray-500">Fill in the details to submit your lost item report</p>
                    </div>
                </div>
            </div>

            {/* Info Banner */}
            <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-50 border border-amber-200 mb-6">
                <svg className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-sm text-amber-700">
                    Your report will be reviewed by the admin before becoming publicly visible. Provide as much detail as possible to increase chances of recovery.
                </p>
            </div>

            {/* Form Card */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="bg-gradient-to-r from-orange-600 to-orange-500 px-6 py-4">
                    <h2 className="text-sm font-bold text-white">Lost Item Details</h2>
                    <p className="text-xs text-orange-100 mt-0.5">All fields marked with * are required</p>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {/* Row 1 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <FIELD label="Item Title" required hint="e.g. Black leather wallet, Samsung earbuds">
                            <input
                                className={INPUT}
                                placeholder="What did you lose?"
                                value={form.title}
                                onChange={set("title")}
                                required
                            />
                        </FIELD>
                        <FIELD label="Category" required>
                            <select className={SELECT} value={form.category} onChange={set("category")} required>
                                <option value="">Select category</option>
                                {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                            </select>
                        </FIELD>
                    </div>

                    {/* Description */}
                    <FIELD label="Description" required hint="Include color, brand, distinguishing marks, serial number if applicable">
                        <textarea
                            className={INPUT + " min-h-[110px] resize-y"}
                            placeholder="Describe the item in detail..."
                            value={form.description}
                            onChange={set("description")}
                            required
                        />
                    </FIELD>

                    {/* Row 2 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <FIELD label="Date Lost" required>
                            <input
                                type="date"
                                className={INPUT}
                                value={form.dateLost}
                                onChange={set("dateLost")}
                                max={new Date().toISOString().split("T")[0]}
                                required
                            />
                        </FIELD>
                        <FIELD label="Last Known Location" required>
                            <select className={SELECT} value={form.lastLocation} onChange={set("lastLocation")} required>
                                <option value="">Select location</option>
                                {LOCATIONS.map((l) => <option key={l}>{l}</option>)}
                            </select>
                        </FIELD>
                    </div>

                    {/* Contact */}
                    <FIELD label="Contact Phone" required hint="How can the finder reach you?">
                        <input
                            type="tel"
                            className={INPUT}
                            placeholder="+91 XXXXX XXXXX"
                            value={form.contactPhone}
                            onChange={set("contactPhone")}
                            required
                        />
                    </FIELD>

                    {/* Image Upload */}
                    <FileUpload
                        label="Item Image (Optional)"
                        onChange={(file) => setForm((f) => ({ ...f, image: file }))}
                    />

                    {/* Additional Info */}
                    <FIELD label="Additional Information">
                        <textarea
                            className={INPUT + " min-h-[80px] resize-y"}
                            placeholder="Any other details that may help..."
                            value={form.additionalInfo}
                            onChange={set("additionalInfo")}
                        />
                    </FIELD>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-2 border-t border-gray-100">
                        <button
                            type="button"
                            onClick={() => navigate("/dashboard")}
                            className="flex-1 sm:flex-none px-6 py-3 rounded-xl border border-gray-200 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold transition-all shadow-md shadow-orange-200 disabled:opacity-70"
                        >
                            {loading ? (
                                <>
                                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                                    </svg>
                                    Submitting...
                                </>
                            ) : (
                                <>
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                    </svg>
                                    Submit Lost Report
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </DashboardLayout>
    );
}
