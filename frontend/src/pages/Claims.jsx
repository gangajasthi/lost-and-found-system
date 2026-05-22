// import { useState } from "react";
// import DashboardLayout from "../components/DashboardLayout";
// import StatusBadge from "../components/StatusBadge";

// // Mock approved found items users can claim
// const CLAIMABLE_ITEMS = [
//   {
//     id: 1, title: "Student ID Card", category: "ID Card / Documents",
//     description: "Found near the canteen area. Has a blue lanyard attached.",
//     location: "Canteen", foundDate: "2025-01-12", foundBy: "Anonymous",
//   },
//   {
//     id: 2, title: "Black Leather Wallet", category: "Wallet / Purse",
//     description: "Contains some cash and cards. Found near the library entrance.",
//     location: "Library", foundDate: "2025-01-11", foundBy: "Anonymous",
//   },
//   {
//     id: 3, title: "Laptop Charger (Dell)", category: "Electronics",
//     description: "Dell 65W charger, black color, found in Lab 3.",
//     location: "Labs Complex", foundDate: "2025-01-10", foundBy: "Anonymous",
//   },
// ];

// // User's own claims
// const MY_CLAIMS = [
//   {
//     id: 101, itemTitle: "Silver House Keys", claimedOn: "2025-01-09",
//     status: "pending", adminNote: "Verification scheduled. Please bring your ID to Admin Office.",
//   },
//   {
//     id: 102, itemTitle: "OnePlus Earbuds Case", claimedOn: "2025-01-07",
//     status: "approved", adminNote: "Claim approved. Collect from Security Room.",
//   },
// ];

// export default function Claims() {
//   const [activeTab, setActiveTab] = useState("browse");
//   const [claimModal, setClaimModal] = useState(null);
//   const [claimReason, setClaimReason] = useState("");
//   const [claimSubmitted, setClaimSubmitted] = useState(false);

//   const handleClaim = (e) => {
//     e.preventDefault();
//     setClaimSubmitted(true);
//     setClaimModal(null);
//     setClaimReason("");
//     setTimeout(() => setClaimSubmitted(false), 4000);
//   };

//   return (
//     <DashboardLayout>
//       {/* Header */}
//       <div className="mb-6">
//         <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
//           <span>Dashboard</span>
//           <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//           </svg>
//           <span className="text-blue-600 font-semibold">Claims</span>
//         </div>
//         <h1 className="text-xl font-bold text-gray-900">Claims</h1>
//         <p className="text-sm text-gray-500 mt-0.5">Browse found items and claim your belongings</p>
//       </div>

//       {/* Success Toast */}
//       {claimSubmitted && (
//         <div className="mb-5 flex items-center gap-3 p-4 rounded-xl bg-emerald-50 border border-emerald-200 shadow-sm">
//           <svg className="w-5 h-5 text-emerald-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//           </svg>
//           <div>
//             <p className="text-sm font-semibold text-emerald-800">Claim submitted successfully!</p>
//             <p className="text-xs text-emerald-600">Admin will verify and contact you offline for physical verification.</p>
//           </div>
//         </div>
//       )}

//       {/* Tabs */}
//       <div className="flex gap-1 bg-gray-100 p-1 rounded-xl w-fit mb-6">
//         {[["browse", "Browse Found Items"], ["my-claims", "My Claims"]].map(([val, lbl]) => (
//           <button
//             key={val}
//             onClick={() => setActiveTab(val)}
//             className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all
//               ${activeTab === val ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
//           >
//             {lbl}
//             {val === "my-claims" && (
//               <span className="ml-1.5 text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-blue-100 text-blue-700">
//                 {MY_CLAIMS.length}
//               </span>
//             )}
//           </button>
//         ))}
//       </div>

//       {/* Browse Tab */}
//       {activeTab === "browse" && (
//         <div>
//           {/* Info */}
//           <div className="flex items-start gap-3 p-4 rounded-xl bg-blue-50 border border-blue-200 mb-5">
//             <svg className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//             </svg>
//             <p className="text-xs text-blue-700">
//               These are admin-approved found items. If you recognize something as yours, click "Claim" and provide proof of ownership. Admin will verify offline.
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
//             {CLAIMABLE_ITEMS.map((item) => (
//               <div key={item.id} className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all flex flex-col">
//                 {/* Image placeholder */}
//                 <div className="h-36 bg-gradient-to-br from-gray-100 to-gray-200 rounded-t-2xl flex items-center justify-center">
//                   <svg className="w-10 h-10 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
//                       d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                   </svg>
//                 </div>

//                 <div className="p-4 flex flex-col flex-1">
//                   <div className="flex items-start justify-between gap-2 mb-2">
//                     <h3 className="text-sm font-bold text-gray-900">{item.title}</h3>
//                     <StatusBadge status="found" />
//                   </div>
//                   <p className="text-xs text-gray-500 mb-3 flex-1 line-clamp-2">{item.description}</p>

//                   <div className="space-y-1.5 mb-4">
//                     <div className="flex items-center gap-2 text-xs text-gray-500">
//                       <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//                       </svg>
//                       {item.location}
//                     </div>
//                     <div className="flex items-center gap-2 text-xs text-gray-500">
//                       <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                       </svg>
//                       Found on {item.foundDate}
//                     </div>
//                     <div className="flex items-center gap-2 text-xs text-gray-500">
//                       <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
//                       </svg>
//                       {item.category}
//                     </div>
//                   </div>

//                   <button
//                     onClick={() => setClaimModal(item)}
//                     className="w-full py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition-colors shadow-sm"
//                   >
//                     Claim This Item
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* My Claims Tab */}
//       {activeTab === "my-claims" && (
//         <div className="space-y-4">
//           {MY_CLAIMS.length === 0 ? (
//             <div className="text-center py-20">
//               <p className="text-gray-400 font-medium">No claims submitted yet</p>
//             </div>
//           ) : (
//             MY_CLAIMS.map((claim) => (
//               <div key={claim.id} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
//                 <div className="flex items-start justify-between gap-4">
//                   <div>
//                     <h3 className="text-sm font-bold text-gray-900">{claim.itemTitle}</h3>
//                     <p className="text-xs text-gray-400 mt-0.5">Claimed on {claim.claimedOn}</p>
//                   </div>
//                   <StatusBadge status={claim.status} />
//                 </div>
//                 {claim.adminNote && (
//                   <div className="mt-4 flex items-start gap-2 p-3 rounded-xl bg-blue-50 border border-blue-100">
//                     <svg className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
//                     </svg>
//                     <div>
//                       <p className="text-xs font-semibold text-blue-800 mb-0.5">Admin Note</p>
//                       <p className="text-xs text-blue-700">{claim.adminNote}</p>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             ))
//           )}
//         </div>
//       )}

//       {/* Claim Modal */}
//       {claimModal && (
//         <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
//             <div className="bg-gradient-to-r from-blue-900 to-blue-700 px-6 py-5">
//               <h2 className="text-base font-bold text-white">Claim Item</h2>
//               <p className="text-xs text-blue-200 mt-1">{claimModal.title}</p>
//             </div>
//             <form onSubmit={handleClaim} className="p-6">
//               <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 mb-5">
//                 <p className="text-xs text-amber-700">
//                   ⚠️ Only claim items that genuinely belong to you. Admin will verify your claim offline with physical proof.
//                 </p>
//               </div>
//               <label className="block text-sm font-semibold text-gray-700 mb-2">
//                 Proof of Ownership <span className="text-red-500">*</span>
//               </label>
//               <textarea
//                 className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none min-h-[120px]"
//                 placeholder="Describe how you can prove this is yours. E.g., what's inside the wallet, serial number of the device, name written on the book..."
//                 value={claimReason}
//                 onChange={(e) => setClaimReason(e.target.value)}
//                 required
//               />
//               <div className="flex gap-3 mt-5">
//                 <button
//                   type="button"
//                   onClick={() => setClaimModal(null)}
//                   className="flex-1 py-3 rounded-xl border border-gray-200 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="flex-1 py-3 rounded-xl bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 transition-colors"
//                 >
//                   Submit Claim
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </DashboardLayout>
//   );
// }
import { useState, useEffect } from "react";
import axios from "axios";
import DashboardLayout from "../components/DashboardLayout";
import StatusBadge from "../components/StatusBadge";

const API = "http://localhost:5000/api";

export default function Claims() {
  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  const [activeTab, setActiveTab] = useState("browse");
  const [claimModal, setClaimModal] = useState(null);
  const [claimReason, setClaimReason] = useState("");
  const [claimSubmitted, setClaimSubmitted] = useState(false);

  // Browse tab state
  const [foundItems, setFoundItems] = useState([]);
  const [itemsLoading, setItemsLoading] = useState(true);
  const [itemsError, setItemsError] = useState("");

  // My Claims tab state
  const [myClaims, setMyClaims] = useState([]);
  const [claimsLoading, setClaimsLoading] = useState(true);
  const [claimsError, setClaimsError] = useState("");

  // Fetch approved found items
  // useEffect(() => {
  //   const fetchFoundItems = async () => {
  //     try {
  //       setItemsLoading(true);
  //       setItemsError("");
  //       const res = await axios.get(`${API}/items`);
  //       const filtered = res.data.filter(
  //         (item) => item.type === "found" && item.approved === true
  //       );
  //       setFoundItems(filtered);
  //     } catch (err) {
  //       setItemsError("Failed to load found items. Please try again.");
  //     } finally {
  //       setItemsLoading(false);
  //     }
  //   };
  //   fetchFoundItems();
  // }, [user?.email]);
  // Fetch approved found items
useEffect(() => {
  const fetchFoundItems = async () => {
    try {

      setItemsLoading(true);
      setItemsError("");

      const res = await axios.get(
        `${API}/items`
      );

      const filtered = res.data.filter(
        (item) =>
          item.type === "found" &&
          item.status === "approved"
      );

      setFoundItems(filtered);

    } catch (err) {

      setItemsError(
        "Failed to load found items. Please try again."
      );

    } finally {

      setItemsLoading(false);

    }
  };

  fetchFoundItems();

}, [user?.email]);

  // Fetch my claims
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
  }, [claimSubmitted, user?.email]); // re-fetch after a new claim is submitted

  const handleClaim = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/claims`, {
        itemId: claimModal._id,
        claimantName: user.name,
        claimantEmail: user.email,
        message: claimReason,
      });
      setClaimSubmitted(true);
      setClaimModal(null);
      setClaimReason("");
      setTimeout(() => setClaimSubmitted(false), 4000);
    } catch (err) {
      alert("Failed to submit claim. Please try again.");
    }
  };

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
          <span>Dashboard</span>
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-blue-600 font-semibold">Claims</span>
        </div>
        <h1 className="text-xl font-bold text-gray-900">Claims</h1>
        <p className="text-sm text-gray-500 mt-0.5">Browse found items and claim your belongings</p>
      </div>

      {/* Success Toast */}
      {claimSubmitted && (
        <div className="mb-5 flex items-center gap-3 p-4 rounded-xl bg-emerald-50 border border-emerald-200 shadow-sm">
          <svg className="w-5 h-5 text-emerald-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <p className="text-sm font-semibold text-emerald-800">Claim submitted successfully!</p>
            <p className="text-xs text-emerald-600">Admin will verify and contact you offline for physical verification.</p>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-xl w-fit mb-6">
        {[["browse", "Browse Found Items"], ["my-claims", "My Claims"]].map(([val, lbl]) => (
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

      {/* Browse Tab */}
      {activeTab === "browse" && (
        <div>
          {/* Info */}
          <div className="flex items-start gap-3 p-4 rounded-xl bg-blue-50 border border-blue-200 mb-5">
            <svg className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-xs text-blue-700">
              These are admin-approved found items. If you recognize something as yours, click "Claim" and provide proof of ownership. Admin will verify offline.
            </p>
          </div>

          {/* Loading */}
          {itemsLoading && (
            <div className="text-center py-20">
              <p className="text-gray-400 font-medium">Loading found items...</p>
            </div>
          )}

          {/* Error */}
          {!itemsLoading && itemsError && (
            <div className="text-center py-20">
              <p className="text-red-400 font-medium">{itemsError}</p>
            </div>
          )}

          {/* Empty */}
          {!itemsLoading && !itemsError && foundItems.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-400 font-medium">No approved found items available</p>
            </div>
          )}

          {/* Items Grid */}
          {!itemsLoading && !itemsError && foundItems.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {foundItems.map((item) => (
                <div key={item._id} className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all flex flex-col">
                  {/* Image */}
                  <div className="h-36 bg-gradient-to-br from-gray-100 to-gray-200 rounded-t-2xl flex items-center justify-center overflow-hidden">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover rounded-t-2xl"
                      />
                    ) : (
                      <svg className="w-10 h-10 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    )}
                  </div>

                  <div className="p-4 flex flex-col flex-1">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="text-sm font-bold text-gray-900">{item.title}</h3>
                      <StatusBadge status="found" />
                    </div>
                    <p className="text-xs text-gray-500 mb-3 flex-1 line-clamp-2">{item.description}</p>

                    <div className="space-y-1.5 mb-4">
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        </svg>
                        {item.location}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Found on {new Date(item.date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                        </svg>
                        {item.category}
                      </div>
                    </div>

                    <button
                      onClick={() => setClaimModal(item)}
                      className="w-full py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition-colors shadow-sm"
                    >
                      Claim This Item
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* My Claims Tab */}
      {activeTab === "my-claims" && (
        <div className="space-y-4">
          {/* Loading */}
          {claimsLoading && (
            <div className="text-center py-20">
              <p className="text-gray-400 font-medium">Loading your claims...</p>
            </div>
          )}

          {/* Error */}
          {!claimsLoading && claimsError && (
            <div className="text-center py-20">
              <p className="text-red-400 font-medium">{claimsError}</p>
            </div>
          )}

          {/* Empty */}
          {!claimsLoading && !claimsError && myClaims.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-400 font-medium">No claims submitted yet</p>
            </div>
          )}

          {/* Claims List */}
          {!claimsLoading && !claimsError && myClaims.map((claim) => (
            <div key={claim._id} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
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
              {claim.adminNote && (
                <div className="mt-4 flex items-start gap-2 p-3 rounded-xl bg-blue-50 border border-blue-100">
                  <svg className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                  <div>
                    <p className="text-xs font-semibold text-blue-800 mb-0.5">Admin Note</p>
                    <p className="text-xs text-blue-700">{claim.adminNote}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Claim Modal */}
      {claimModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
            <div className="bg-gradient-to-r from-blue-900 to-blue-700 px-6 py-5">
              <h2 className="text-base font-bold text-white">Claim Item</h2>
              <p className="text-xs text-blue-200 mt-1">{claimModal.title}</p>
            </div>
            <form onSubmit={handleClaim} className="p-6">
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 mb-5">
                <p className="text-xs text-amber-700">
                  ⚠️ Only claim items that genuinely belong to you. Admin will verify your claim offline with physical proof.
                </p>
              </div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Proof of Ownership <span className="text-red-500">*</span>
              </label>
              <textarea
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none min-h-[120px]"
                placeholder="Describe how you can prove this is yours. E.g., what's inside the wallet, serial number of the device, name written on the book..."
                value={claimReason}
                onChange={(e) => setClaimReason(e.target.value)}
                required
              />
              <div className="flex gap-3 mt-5">
                <button
                  type="button"
                  onClick={() => { setClaimModal(null); setClaimReason(""); }}
                  className="flex-1 py-3 rounded-xl border border-gray-200 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 transition-colors"
                >
                  Submit Claim
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}