import { useEffect, useState } from "react";
import axios from "axios";
import DashboardLayout from "../components/DashboardLayout";
import StatusBadge from "../components/StatusBadge";

// export default function AdminClaims() {

//   const [claims, setClaims] =
//     useState([]);

//   useEffect(() => {
//     fetchClaims();
//   }, []);

//   const fetchClaims = async () => {
//     const handleClaimStatus =
//   async (
//     id,
//     status
//   ) => {

//     try {

//       await axios.put(
//         `http://localhost:5000/api/claims/${id}`,
//         {
//           status
//         }
//       );

//       fetchClaims();

//       alert(
//         `Claim ${status}`
//       );

//     } catch (error) {

//       console.log(
//         error
//       );

//     }

// };
export default function AdminClaims() {

  const [claims, setClaims] =
    useState([]);

  useEffect(() => {
    fetchClaims();
  }, []);

  const fetchClaims = async () => {

    try {

      const response =
        await axios.get(
          "http://localhost:5000/api/claims"
        );

      setClaims(
        response.data
      );

    } catch (error) {

      console.log(error);

    }

  };

  const handleClaimStatus =
    async (
      id,
      status
    ) => {

      try {

        await axios.put(
          `http://localhost:5000/api/claims/${id}`,
          {
            status
          }
        );

        fetchClaims();

        alert(
          `Claim ${status}`
        );

      } catch (error) {

        console.log(
          error
        );

      }

    };
  return (

    <DashboardLayout isAdmin>

      <div className="mb-6">

        <h1 className="text-xl font-bold text-gray-900">
          Claims
        </h1>

        <p className="text-sm text-gray-500">
          View and manage submitted claims
        </p>

      </div>

      <div className="space-y-4">

        {claims.map((claim) => (

          <div
            key={claim._id}
            className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5"
          >

            <div className="flex justify-between items-start">

              <div>

                <h3 className="text-lg font-bold text-gray-900">
                  {claim.itemId?.title || "Item"}
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  Claimed by:
                  {" "}
                  {claim.claimantName}
                </p>

                <p className="text-sm text-gray-500">
                  {claim.claimantEmail}
                </p>

                <p className="text-sm text-gray-700 mt-3">
                  <span className="font-semibold">
                    Proof:
                  </span>
                  {" "}
                  {claim.message}
                </p>

              </div>

              {/* <StatusBadge
                status={claim.status}
              /> */}
              <div className="flex flex-col items-end gap-2">
              <StatusBadge
                status={claim.status}
             />
            {claim.status === "pending" && (
            <div className="flex gap-2">
                <button
                    onClick={() =>
                    handleClaimStatus(
                    claim._id,
                    "approved"
          )
        }
        className="px-3 py-1 rounded-lg bg-green-600 text-white text-xs font-semibold hover:bg-green-700">
        Approve
      </button>
      <button
        onClick={() =>
          handleClaimStatus(
            claim._id,
            "rejected"
          )
        }
        className="px-3 py-1 rounded-lg bg-red-600 text-white text-xs font-semibold hover:bg-red-700"
      >
        Reject
      </button>

    </div>

  )}

</div>

            </div>

          </div>

        ))}

      </div>

    </DashboardLayout>
  );
}