import { useEffect, useState } from "react";
import axios from "axios";
import DashboardLayout from "../components/DashboardLayout";

export default function ResolvedItems() {

  const [claims, setClaims] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  useEffect(() => {
    fetchClaims();
  }, []);

  const fetchClaims = async () => {

    try {

      const response =
        await axios.get(
          "http://localhost:5000/api/claims"
        );

      const resolved =
        response.data.filter(
          (claim) =>
            claim.itemId?.handoverCompleted === true
        );

      setClaims(resolved);

    } catch (error) {

      console.log(error);

    }

  };

  const filteredClaims = claims.filter((claim) =>
    JSON.stringify(claim)
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem =
    currentPage * itemsPerPage;

  const indexOfFirstItem =
    indexOfLastItem - itemsPerPage;

  const currentClaims =
    filteredClaims.slice(
      indexOfFirstItem,
      indexOfLastItem
    );

  const totalPages =
    Math.ceil(
      filteredClaims.length /
      itemsPerPage
    );

  return (

    <DashboardLayout isAdmin>

      <h1 className="text-2xl font-bold mb-6">
        Resolved Items
      </h1>

      <div className="mb-6">

        <input
          type="text"
          placeholder="🔍 Search resolved items..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full md:w-96 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
        />

      </div>

      <div className="space-y-4">

        {currentClaims.length === 0 ? (

          <div className="bg-white rounded-xl p-6 text-center text-gray-500">
            No resolved items found
          </div>

        ) : (

          currentClaims.map((claim) => (

            <div
              key={claim._id}
              className="bg-white rounded-2xl border p-5 shadow-sm"
            >

              <h3 className="font-bold text-lg">
                {claim.itemId?.title}
              </h3>

              <p className="text-gray-700 mt-2">
                <span className="font-semibold">
                  Claimant:
                </span>
                {" "}
                {claim.claimantName}
              </p>

              <p className="text-gray-700">
                <span className="font-semibold">
                  Email:
                </span>
                {" "}
                {claim.claimantEmail}
              </p>

              <span className="inline-block mt-3 px-3 py-1 rounded-lg bg-green-100 text-green-700 text-sm font-semibold">
                Resolved ✓
              </span>

            </div>

          ))

        )}

      </div>

      {totalPages > 1 && (

        <div className="flex justify-center items-center gap-4 mt-6">

          <button
            disabled={currentPage === 1}
            onClick={() =>
              setCurrentPage(currentPage - 1)
            }
            className="px-4 py-2 border rounded-xl disabled:opacity-50"
          >
            ← Previous
          </button>

          <span className="font-semibold">
            Page {currentPage} of {totalPages}
          </span>

          <button
            disabled={currentPage === totalPages}
            onClick={() =>
              setCurrentPage(currentPage + 1)
            }
            className="px-4 py-2 border rounded-xl disabled:opacity-50"
          >
            Next →
          </button>

        </div>

      )}

    </DashboardLayout>

  );

}