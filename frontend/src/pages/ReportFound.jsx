import axios from "axios";
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

const INPUT =
  "w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all";

const SELECT = INPUT + " appearance-none cursor-pointer";

const FIELD = ({ label, required, children, hint }) => (
  <div>
    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    {children}
    {hint && <p className="mt-1 text-xs text-gray-400">{hint}</p>}
  </div>
);

export default function ReportFound() {

  const navigate = useNavigate();

  const [submitted, setSubmitted] = useState(false);

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    category: "",
    description: "",
    dateFound: "",
    foundLocation: "",
    handedOver: "no",
    handedOverTo: "",
    contactPhone: "",
    additionalInfo: "",
    image: null,
  });

  const set = (key) => (e) =>
    setForm((f) => ({
      ...f,
      [key]: e.target.value
    }));


  const handleSubmit = async (e) => {

    e.preventDefault();

    setLoading(true);

    try {

      const formData = new FormData();

      formData.append("title", form.title);

      formData.append("description", form.description);

      formData.append("category", form.category);

      formData.append("location", form.foundLocation);

      formData.append("date", form.dateFound);

      formData.append("type", "found");

      if (form.image) {
        formData.append("image", form.image);
      }

      const response = await axios.post(
        "http://localhost:5000/api/items",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data);

      alert(response.data.message);

      setSubmitted(true);

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Failed to submit report"
      );

    } finally {

      setLoading(false);

    }
  };


  if (submitted) {

    return (
      <DashboardLayout>

        <div className="max-w-lg mx-auto mt-16 text-center">

          <div className="w-24 h-24 rounded-full bg-teal-100 flex items-center justify-center mx-auto mb-6">

            <svg
              className="w-12 h-12 text-teal-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>

          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Thank You!
          </h2>

          <p className="text-gray-500 text-sm mb-2">
            Your found item report has been submitted successfully.
          </p>

          <p className="text-xs text-blue-600 bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 mb-8">
            ℹ️ The admin will review and approve your report.
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
              className="px-5 py-2.5 rounded-xl bg-teal-600 text-white text-sm font-semibold hover:bg-teal-700 transition-colors"
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

      {/* Header */}
      <div className="mb-6">

        <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">

          <span>Dashboard</span>

          <svg
            className="w-3 h-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>

          <span className="text-teal-600 font-semibold">
            Report Found Item
          </span>

        </div>

        <div className="flex items-center gap-3">

          <div className="w-10 h-10 rounded-xl bg-teal-100 flex items-center justify-center flex-shrink-0">

            <svg
              className="w-5 h-5 text-teal-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>

          </div>

          <div>

            <h1 className="text-xl font-bold text-gray-900">
              Report a Found Item
            </h1>

            <p className="text-sm text-gray-500">
              Help someone recover their lost belongings
            </p>

          </div>

        </div>

      </div>

      {/* Form */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">

        <div className="bg-gradient-to-r from-teal-600 to-teal-500 px-6 py-4">

          <h2 className="text-sm font-bold text-white">
            Found Item Details
          </h2>

        </div>

        <form
          onSubmit={handleSubmit}
          className="p-6 space-y-6"
        >

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            <FIELD label="Item Title" required>

              <input
                className={INPUT}
                placeholder="What did you find?"
                value={form.title}
                onChange={set("title")}
                required
              />

            </FIELD>

            <FIELD label="Category" required>

              <select
                className={SELECT}
                value={form.category}
                onChange={set("category")}
                required
              >

                <option value="">
                  Select category
                </option>

                {CATEGORIES.map((c) => (
                  <option key={c}>
                    {c}
                  </option>
                ))}

              </select>

            </FIELD>

          </div>

          <FIELD label="Description" required>

            <textarea
              className={INPUT + " min-h-[110px] resize-y"}
              placeholder="Describe the found item..."
              value={form.description}
              onChange={set("description")}
              required
            />

          </FIELD>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            <FIELD label="Date Found" required>

              <input
                type="date"
                className={INPUT}
                value={form.dateFound}
                onChange={set("dateFound")}
                max={new Date().toISOString().split("T")[0]}
                required
              />

            </FIELD>

            <FIELD label="Found Location" required>

              <select
                className={SELECT}
                value={form.foundLocation}
                onChange={set("foundLocation")}
                required
              >

                <option value="">
                  Select location
                </option>

                {LOCATIONS.map((l) => (
                  <option key={l}>
                    {l}
                  </option>
                ))}

              </select>

            </FIELD>

          </div>

          <FIELD label="Contact Phone" required>

            <input
              type="tel"
              className={INPUT}
              placeholder="+91 XXXXX XXXXX"
              value={form.contactPhone}
              onChange={set("contactPhone")}
              required
            />

          </FIELD>

          <FileUpload
            label="Item Image"
            onChange={(file) =>
              setForm((f) => ({
                ...f,
                image: file
              }))
            }
          />

          <FIELD label="Additional Notes">

            <textarea
              className={INPUT + " min-h-[80px] resize-y"}
              placeholder="Any other details..."
              value={form.additionalInfo}
              onChange={set("additionalInfo")}
            />

          </FIELD>

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
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-sm font-bold transition-all shadow-md shadow-teal-200 disabled:opacity-70"
            >

              {loading ? "Submitting..." : "Submit Found Report"}

            </button>

          </div>

        </form>

      </div>

    </DashboardLayout>
  );
}