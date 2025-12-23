// src/pages/Admin/ManageRequests.jsx
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axiosSecure from "../../../../api/AxiosSecure";

export default function ManageRequests() {
  useEffect(() => {
    document.title = "Manage Requests - Chef Bazar";
  }, []);

  const [requests, setRequests] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
  let isMounted = true;

  const fetchRequests = async () => {
    try {
      const res = await axiosSecure.get("/admin/requests", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      if (isMounted) {
        setRequests(res.data);
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to fetch requests", "error");
    }
  };

  fetchRequests();

  return () => {
    isMounted = false;
  };
}, [API_URL]);

const handleRequest = async (request, approve) => {
  try {
    await axiosSecure.patch(
      `/admin/requests/${request._id}`,
      { requestStatus: approve ? "approved" : "rejected" },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );

    Swal.fire(
      "Success",
      `Request ${approve ? "approved" : "rejected"} successfully`,
      approve ? "success" : "info"
    );

    setRequests((prev) =>
      prev.map((r) =>
        r._id === request._id
          ? { ...r, requestStatus: approve ? "approved" : "rejected" }
          : r
      )
    );
  } catch (err) {
    console.error(err);
    Swal.fire("Error", "Something went wrong", "error");
  }
};



  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Manage User Requests
      </h2>

      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="p-3">User Name</th>
              <th className="p-3">User Email</th>
              <th className="p-3">Request Type</th>
              <th className="p-3">Request Status</th>
              <th className="p-3">Request Time</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((r) => (
              <tr
                key={r._id}
                className="border-t transition-colors"
              >
                <td className="p-3">{r.userName}</td>
                <td className="p-3">{r.userEmail || "-"}</td>
                <td className="p-3 capitalize">{r.requestType || "-"}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded  text-sm ${
                      r.requestStatus === "approved"
                        ? "bg-green-500"
                        : r.requestStatus === "rejected"
                        ? "bg-red-500"
                        : "bg-yellow-500"
                    }`}
                  >
                    {r.requestStatus}
                  </span>
                </td>
                <td className="p-3">
                  {new Date(r.createdAt).toLocaleString()}
                </td>
                <td className="p-3 text-center">
                  {r.requestStatus === "pending" ? (
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => handleRequest(r, true)}
                        className="bg-green-500 px-3 py-1 rounded hover:bg-green-600 transition-colors"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleRequest(r, false)}
                        className="bg-red-500  px-3 py-1 rounded hover:bg-red-600 transition-colors"
                      >
                        Reject
                      </button>
                    </div>
                  ) : (
                    <span>Processed</span>
                  )}
                </td>
              </tr>
            ))}
            {requests.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="text-center p-6 font-medium"
                >
                  No requests found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
