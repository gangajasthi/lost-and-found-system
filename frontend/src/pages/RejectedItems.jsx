import DashboardLayout from "../components/DashboardLayout";
import React, {useEffect,useState} from "react";

import axios from "axios";

const RejectedItems = () => {

  const [items, setItems] =
    useState([]);

  useEffect(() => {

    fetchRejectedItems();

  }, []);

  const fetchRejectedItems =
    async () => {

      try {

        const response =
          await axios.get(
            "http://localhost:5000/api/admin/rejected"
          );

        setItems(
          response.data
        );

      } catch (error) {

        console.log(error);

      }

    };

  return (

  <DashboardLayout isAdmin>

    {/* <div className="p-6"> */}
    <div className="container mx-auto">

      <h1 className="text-3xl font-bold mb-6">
        Rejected Items
      </h1>

      <div className="space-y-4">

        {items.map((item) => (

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

              </div>

              <span className="bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-semibold">
                Rejected
              </span>

            </div>

          </div>

        ))}

      </div>

    </div>
     </DashboardLayout>

  );

};

export default RejectedItems;