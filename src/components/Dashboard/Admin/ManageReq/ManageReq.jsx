import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function ManageRequests() {
  const [requests, setRequests] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    axios
      .get(`${API_URL}/admin/requests`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((res) => setRequests(res.data));
  }, []);

  const handleRequest = async (id, approve) => {
    try {
      await axios.patch(
        `${API_URL}/admin/requests/${id}`,
        { approve },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      Swal.fire(
        "Success",
        `Request ${approve ? "approved" : "rejected"}`,
        "success"
      );

      setRequests((prev) =>
        prev.map((r) =>
          r._id === id
            ? { ...r, status: approve ? "approved" : "rejected" }
            : r
        )
      );
    } catch (err) {
      Swal.fire("Error", "Something went wrong", "error");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-extrabold mb-8 text-center text-gray-800">
        Manage Requests
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-xl shadow-lg overflow-hidden">
          <thead className="bg-gradient-to-r from-orange-400 to-red-500 text-white">
            <tr>
              <th className="py-3 px-6 text-left uppercase tracking-wider text-sm">
                Name
              </th>
              <th className="py-3 px-6 text-left uppercase tracking-wider text-sm">
                Email
              </th>
              <th className="py-3 px-6 text-left uppercase tracking-wider text-sm">
                Request Type
              </th>
              <th className="py-3 px-6 text-left uppercase tracking-wider text-sm">
                Status
              </th>
              <th className="py-3 px-6 text-center uppercase tracking-wider text-sm">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {requests.map((r) => (
              <tr
                key={r._id}
                className="hover:bg-gray-50 transition-colors duration-200"
              >
                <td className="py-4 px-6 font-medium text-gray-800">{r.userName}</td>
                <td className="py-4 px-6 text-gray-600">{r.userEmail}</td>
                <td className="py-4 px-6 capitalize text-gray-700">{r.requestStatus}</td>
                <td className="py-4 px-6">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold text-white ${
                      r.status === "approved"
                        ? "bg-green-500"
                        : r.status === "rejected"
                        ? "bg-red-500"
                        : "bg-yellow-500"
                    }`}
                  >
                    {r.status}
                  </span>
                </td>
                <td className="py-4 px-6 text-center">
                  {r.status === "pending" && (
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => handleRequest(r._id, true)}
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow-md transition duration-200"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleRequest(r._id, false)}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-md transition duration-200"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {requests.length === 0 && (
        <p className="mt-8 text-center text-gray-500 text-lg">
          No chef requests available.
        </p>
      )}
    </div>
  );
}
