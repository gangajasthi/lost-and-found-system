import DashboardLayout from "../components/DashboardLayout";
import React, { useEffect, useState } from "react";
import axios from "axios";

const RejectedItems = () => {

  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  useEffect(() => {
    fetchRejectedItems();
  }, []);

  const fetchRejectedItems = async () => {

    try {

      const response = await axios.get(
        "http://localhost:5000/api/admin/rejected"
      );

      setItems(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  const filteredItems = items.filter((item) =>
    JSON.stringify(item)
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem =
    currentPage * itemsPerPage;

  const indexOfFirstItem =
    indexOfLastItem - itemsPerPage;

  const currentItems =
    filteredItems.slice(
      indexOfFirstItem,
      indexOfLastItem
    );

  const totalPages =
    Math.ceil(
      filteredItems.length /
      itemsPerPage
    );

  return (

    <DashboardLayout isAdmin>

      <div className="container mx-auto">

        <h1 className="text-3xl font-bold mb-6">
          Rejected Items
        </h1>

        <div className="mb-6">

          <input
            type="text"
            placeholder="🔍 Search rejected items..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full md:w-96 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500"
          />

        </div>

        <div className="space-y-4">

          {currentItems.length === 0 ? (

            <div className="bg-white rounded-xl p-6 text-center text-gray-500">
              No rejected items found
            </div>

          ) : (

            currentItems.map((item) => (

              <div
                key={item._id}
                className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5"
              >

                <div className="flex justify-between items-center">

                  <div>

                    <h2 className="text-lg font-bold">
                      {item.title}
                    </h2>

                    <p className="text-gray-600 mt-1">
                      {item.description}
                    </p>

                    <p className="text-sm text-gray-500 mt-2">
                      📍 {item.location}
                    </p>

                    <p className="text-sm text-gray-500">
                      📅{" "}
                      {new Date(
                        item.createdAt
                      ).toLocaleDateString()}
                    </p>

                    {item.rejectionReason && (
                      <div className="mt-3 p-3 rounded-xl bg-red-50 border border-red-200">
                        <p className="text-xs font-semibold text-red-700">
                          Rejection Reason
                        </p>

                        <p className="text-sm text-red-600 mt-1">
                          {item.rejectionReason}
                        </p>
                      </div>
                    )}

                  </div>

                  <span className="bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-semibold">
                    Rejected
                  </span>

                </div>

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

      </div>

    </DashboardLayout>

  );

};

export default RejectedItems;