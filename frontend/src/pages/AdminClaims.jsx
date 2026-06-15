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
{/* //       <div className="bg-red-500 text-white p-5">
//   TEST
// </div> */}
      {/* <div className="mb-6"> */}
      <div className="container mx-auto">

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

                {claim.answers?.length > 0 && (
  <div className="mt-4 p-3 rounded-xl bg-blue-50 border border-blue-200">

    <h4 className="text-sm font-bold text-blue-900 mb-3">
      Claimant Answers
    </h4>

    <div className="space-y-2">

      {claim.answers.map((ans, index) => (
        <div
          key={index}
          className="bg-white rounded-lg p-2 border border-blue-100"
        >
          <p className="text-xs font-semibold text-gray-700">
            Q: {ans.question}
          </p>

          <p className="text-xs text-blue-700 mt-1">
            A: {ans.answer}
          </p>
        </div>
      ))}

    </div>

  </div>
)}

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