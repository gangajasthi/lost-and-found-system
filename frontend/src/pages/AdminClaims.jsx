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

  const [rejectModal, setRejectModal] =
  useState(null);

const [rejectReason, setRejectReason] =
  useState("");

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

    const handleRejectClaim = async () => {


  try {

    await axios.put(
      `http://localhost:5000/api/claims/${rejectModal._id}`,
      {
        status: "rejected",
        rejectionReason: rejectReason
      }
    );

    fetchClaims();

    setRejectModal(null);
    setRejectReason("");

  } catch (error) {

    console.log(error);

  }

};

const handleResolve = async (id) => {

  try {

    await axios.put(
      `http://localhost:5000/api/claims/resolve/${id}`
    );

    fetchClaims();

    alert("Item marked as resolved");

  } catch (error) {

    console.log(error);

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
    setRejectModal(claim)
  }
  className="px-3 py-1 rounded-lg bg-red-600 text-white text-xs font-semibold hover:bg-red-700"
>
  Reject
</button>

    </div>

  )}

{claim.status === "approved" && !claim.itemId?.handoverCompleted && (
  <button
    onClick={() =>
      handleResolve(claim._id)
    }
    className="px-3 py-1 rounded-lg bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700"
  >
    Mark Resolved
  </button>
)}

{claim.status === "approved" && claim.itemId?.handoverCompleted && (
  <span className="px-3 py-1 rounded-lg bg-green-100 text-green-700 text-xs font-semibold">
    Resolved ✓
  </span>
)}

</div>

            </div>

          </div>

        ))}

      </div>


      {rejectModal && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

    <div className="bg-white rounded-2xl p-6 w-full max-w-md">

      <h2 className="text-lg font-bold mb-4">
        Reject Claim
      </h2>

      <textarea
        value={rejectReason}
        onChange={(e) =>
          setRejectReason(e.target.value)
        }
        placeholder="Enter rejection reason..."
        className="w-full border rounded-xl p-3 min-h-[120px]"
      />

      <div className="flex justify-end gap-2 mt-4">

        <button
          onClick={() => {
            setRejectModal(null);
            setRejectReason("");
          }}
          className="px-4 py-2 border rounded-xl hover:bg-gray-100 transition"
        >
          Cancel
        </button>

        <button
          onClick={handleRejectClaim}
          className="px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition"
        >
          Submit
        </button>

      </div>

    </div>

  </div>
)}

    </DashboardLayout>
  );
}