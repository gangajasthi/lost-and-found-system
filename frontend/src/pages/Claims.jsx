import { useState, useEffect } from "react";
import axios from "axios";
import DashboardLayout from "../components/DashboardLayout";
import StatusBadge from "../components/StatusBadge";

const API = "http://localhost:5000/api";

// ── Item Card ────────────────────────────────────────────────────
function ItemCard({ item, onAction, alreadyClaimed }) {
  const isLost = item.type === "lost";

  const displayTitle = item.title;
  const displayDescription = item.description;
  const displayImage = isLost ? item.image : null;
  const hasImage = isLost && Boolean(displayImage);

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all flex flex-col">
      {isLost && hasImage && (
        <div className="h-36 bg-gradient-to-br from-gray-100 to-gray-200 rounded-t-2xl flex items-center justify-center overflow-hidden">
          <img
            src={`http://localhost:5000/uploads/${displayImage}`}
            alt={displayTitle}
            className="w-full h-full object-contain bg-gray-100"
          />
        </div>
      )}

      {isLost && !hasImage && (
        <div className={`h-2 rounded-t-2xl ${isLost ? "bg-orange-200" : "bg-teal-200"}`} />
      )}

      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="text-sm font-bold text-gray-900">{displayTitle}</h3>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full capitalize flex-shrink-0
            ${isLost ? "bg-orange-100 text-orange-700" : "bg-teal-100 text-teal-700"}`}>
            {isLost ? "lost" : "found"}
          </span>
        </div>

        {isLost && (
          <p className="text-xs text-gray-500 mb-3 line-clamp-2">
            {displayDescription}
          </p>
        )}

        <div className="space-y-1.5 mb-4">
         {isLost && (
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <svg className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              </svg>
              {item.location}
            </div>
          )}
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <svg className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {isLost ? "Lost" : "Found"} on {new Date(item.date).toLocaleDateString()}
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <svg className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
            {item.category}
          </div>
        </div>

        <button
          disabled={alreadyClaimed}
          onClick={() => onAction(item)}
          className={`w-full py-2.5 rounded-xl text-xs font-bold transition-colors shadow-sm
            ${alreadyClaimed
              ? "bg-green-100 text-green-700 cursor-not-allowed"
              : isLost
              ? "bg-orange-500 hover:bg-orange-600 text-white"
              : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
        >
          {alreadyClaimed ? "Already Submitted ✅" : isLost ? "I Found This" : "Claim This Item"}
        </button>
      </div>
    </div>
  );
}

// ── Main Component ───────────────────────────────────────────────
export default function Claims() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const [activeTab, setActiveTab] = useState("browse");

  const [actionModal, setActionModal]       = useState(null);
  const [actionReason, setActionReason]     = useState("");
  const [actionSubmitted, setActionSubmitted] = useState(false);

  const [browseItems, setBrowseItems]   = useState([]);
  const [itemsLoading, setItemsLoading] = useState(true);
  const [itemsError, setItemsError]     = useState("");

  const [myClaims, setMyClaims]           = useState([]);
  const [searchTerm, setSearchTerm]       = useState("");
  const [claimsLoading, setClaimsLoading] = useState(true);
  const [claimsError, setClaimsError]     = useState("");

  // ── Fetch approved items ───────────────────────────────────────
  useEffect(() => {
    const fetchItems = async () => {
      try {
        setItemsLoading(true);
        setItemsError("");
        const res = await axios.get(`${API}/items`);
        const filtered = res.data.filter(
          (item) => item.status === "approved" && !item.resolved
        );
        setBrowseItems(filtered);
      } catch (err) {
        setItemsError("Failed to load items. Please try again.");
      } finally {
        setItemsLoading(false);
      }
    };
    fetchItems();
  }, [user?.email]);

  // ── Fetch my claims ────────────────────────────────────────────
  useEffect(() => {
    const fetchMyClaims = async () => {
      try {
        setClaimsLoading(true);
        setClaimsError("");
        const res = await axios.get(`${API}/claims`);
        const filtered = res.data.filter(
          (claim) => claim.claimantEmail === user?.email
        );
        setMyClaims(filtered);
      } catch (err) {
        setClaimsError("Failed to load your claims. Please try again.");
      } finally {
        setClaimsLoading(false);
      }
    };
    fetchMyClaims();
  }, [actionSubmitted, user?.email]);

  // ── Submit claim ───────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/claims`, {
        itemId:        actionModal._id,
        claimantName:  user.name,
        claimantEmail: user.email,
        message:       actionReason,
        userId:        user._id,
      });
      alert("✅ Claim submitted successfully");
      setActionSubmitted(true);
      setActionModal(null);
      setActionReason("");
      setTimeout(() => setActionSubmitted(false), 4000);
    } catch (err) {
      alert("Failed to submit. Please try again.");
    }
  };

  const isLostModal = actionModal?.type === "lost";

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
          <span>Dashboard</span>
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-blue-600 font-semibold">Browse Items</span>
        </div>
        <h1 className="text-xl font-bold text-gray-900">Browse Items</h1>
        <p className="text-sm text-gray-500 mt-0.5">
          Browse approved lost &amp; found items — claim yours or report a find
        </p>
      </div>

      {/* Success Toast */}
      {actionSubmitted && (
        <div className="mb-5 flex items-center gap-3 p-4 rounded-xl bg-emerald-50 border border-emerald-200 shadow-sm">
          <svg className="w-5 h-5 text-emerald-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <p className="text-sm font-semibold text-emerald-800">Submitted successfully!</p>
            <p className="text-xs text-emerald-600">Admin will verify and contact you offline.</p>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-xl w-fit mb-6">
        {[["browse", "Browse Items"], ["my-claims", "My Claims"]].map(([val, lbl]) => (
          <button
            key={val}
            onClick={() => setActiveTab(val)}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all
              ${activeTab === val ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
          >
            {lbl}
            {val === "my-claims" && (
              <span className="ml-1.5 text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-blue-100 text-blue-700">
                {myClaims.length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* ── Browse Tab ── */}
      {activeTab === "browse" && (
        <div>
          <div className="mb-5">
            <input
              type="text"
              placeholder="Search items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-96 px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-start gap-3 p-4 rounded-xl bg-blue-50 border border-blue-200 mb-5">
            <svg className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-xs text-blue-700">
              <strong>Lost items:</strong> if you found one, let us know. &nbsp;
              <strong>Found items:</strong> if something belongs to you, click "Claim This Item" and provide proof. Admin will verify offline.
            </p>
          </div>

          {itemsLoading && (
            <div className="text-center py-20">
              <p className="text-gray-400 font-medium">Loading items…</p>
            </div>
          )}

          {!itemsLoading && itemsError && (
            <div className="text-center py-20">
              <p className="text-red-400 font-medium">{itemsError}</p>
            </div>
          )}

          {!itemsLoading && !itemsError && browseItems.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-400 font-medium">No approved items available yet</p>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* Lost Items */}
            <div>
              <h2 className="text-lg font-bold text-orange-600 mb-4">
                Lost Items
              </h2>

              <div className="space-y-4">
                {browseItems
                  .filter(
                    (item) =>
                      item.type === "lost" &&
                      item.userId !== user?._id
                  )
                  .map((item) => {
                    const alreadyClaimed = myClaims.some(
                      (claim) => claim.itemId?._id === item._id
                    );

                    return (
                      <ItemCard
                        key={item._id}
                        item={item}
                        onAction={setActionModal}
                        alreadyClaimed={alreadyClaimed}
                      />
                    );
                  })}
              </div>
            </div>

            {/* Found Items */}
            <div>
              <h2 className="text-lg font-bold text-teal-600 mb-4">
                Found Items
              </h2>

              <div className="space-y-4">
                {browseItems
                  .filter(
                    (item) =>
                      item.type === "found" &&
                      item.userId !== user?._id
                  )
                  .map((item) => {
                    const alreadyClaimed = myClaims.some(
                      (claim) => claim.itemId?._id === item._id
                    );

                    return (
                      <ItemCard
                        key={item._id}
                        item={item}
                        onAction={setActionModal}
                        alreadyClaimed={alreadyClaimed}
                      />
                    );
                  })}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ── My Claims Tab ── */}
      {activeTab === "my-claims" && (
        <div>
          <div className="mb-5">
            <input
              type="text"
              placeholder="Search claims..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-96 px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-4">
            {claimsLoading && (
              <div className="text-center py-20">
                <p className="text-gray-400 font-medium">Loading your claims…</p>
              </div>
            )}

            {!claimsLoading && claimsError && (
              <div className="text-center py-20">
                <p className="text-red-400 font-medium">{claimsError}</p>
              </div>
            )}

            {!claimsLoading && !claimsError && myClaims.length === 0 && (
              <div className="text-center py-20">
                <p className="text-gray-400 font-medium">No claims submitted yet</p>
              </div>
            )}

            {!claimsLoading &&
              !claimsError &&
              myClaims
                .filter((claim) =>
                  (claim.itemId?.title || "")
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
                )
                .map((claim) => (
                  <div
                    key={claim._id}
                    className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-sm font-bold text-gray-900">
                          {claim.itemId?.title || "Item"}
                        </h3>
                        <p className="text-xs text-gray-400 mt-0.5">
                          Claimed on {new Date(claim.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <StatusBadge status={claim.status} />
                    </div>

                    {claim.message && (
                      <div className="mt-3">
                        <p className="text-xs text-gray-500">{claim.message}</p>
                      </div>
                    )}

                    {claim.adminNote && (
                      <div className="mt-4 flex items-start gap-2 p-3 rounded-xl bg-blue-50 border border-blue-100">
                        <svg className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                        </svg>
                        <div>
                          <p className="text-xs font-semibold text-blue-800 mb-0.5">Admin Note</p>
                          <p className="text-xs text-blue-700">{claim.adminNote}</p>
                        </div>
                      </div>
                    )}


                     {claim.status === "rejected" &&
                  claim.rejectionReason && (
                    <div className="mt-4 p-3 rounded-xl bg-red-50 border border-red-200">
                      <p className="text-xs font-semibold text-red-700">
                        Rejection Reason
                      </p>
                      <p className="text-xs text-red-600 mt-1">
                        {claim.rejectionReason}
                      </p>
                    </div>
                  )}
                    
                  </div>
                ))}

               
          </div>
        </div>
      )}

      {/* ── Action Modal ── */}
      {actionModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
            <div className={`px-6 py-5 bg-gradient-to-r
              ${isLostModal ? "from-orange-700 to-orange-500" : "from-blue-900 to-blue-700"}`}>
              <h2 className="text-base font-bold text-white">
                {isLostModal ? "I Found This Item" : "Claim Item"}
              </h2>
              <p className="text-xs opacity-80 text-white mt-1 truncate">
                {actionModal.title}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="p-6">
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 mb-5">
                <p className="text-xs text-amber-700">
                  {isLostModal
                    ? "⚠️ Only submit if you have actually found this item. Admin will contact you for handover."
                    : "⚠️ Only claim items that genuinely belong to you. Admin will verify your claim offline with physical proof."}
                </p>
              </div>

              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {isLostModal ? "Where / How did you find it?" : "Proof of Ownership"}{" "}
                <span className="text-red-500">*</span>
              </label>
              <textarea
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none min-h-[120px]"
                placeholder={
                  isLostModal
                    ? "Describe where you found it and how to identify it, so we can confirm with the owner…"
                    : "Describe how you can prove this is yours. E.g., what's inside the wallet, serial number of the device, name written on the book…"
                }
                value={actionReason}
                onChange={(e) => setActionReason(e.target.value)}
                required
              />

              <div className="flex gap-3 mt-5">
                <button
                  type="button"
                  onClick={() => { setActionModal(null); setActionReason(""); }}
                  className="flex-1 py-3 rounded-xl border border-gray-200 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`flex-1 py-3 rounded-xl text-white text-sm font-bold transition-colors
                    ${isLostModal ? "bg-orange-500 hover:bg-orange-600" : "bg-blue-600 hover:bg-blue-700"}`}
                >
                  {isLostModal ? "Submit Report" : "Submit Claim"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}