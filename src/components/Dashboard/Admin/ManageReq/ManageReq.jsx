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

  console.log(requests, 'req');
  

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Manage Chef Requests</h2>

      <table className="w-full border rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3">Name</th>
            <th className="p-3">Email</th>
            <th className="p-3">Request Type</th>
            <th className="p-3">Status</th>
            <th className="p-3">Action</th>
          </tr>
        </thead>

        <tbody>
          {requests.map((r) => (
            <tr key={r._id} className="border-t text-center">
              <td className="p-3">{r.userName}</td>
              <td className="p-3">{r.userEmail}</td>
              <td className="p-3 capitalize">{r.requestType}</td>
              <td className="p-3">
                <span
                  className={`px-2 py-1 rounded text-white text-sm ${
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

              <td className="p-3">
                {r.status === "pending" && (
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => handleRequest(r._id, true)}
                      className="bg-green-500 text-white px-3 py-1 rounded"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleRequest(r._id, false)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
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
  );
}
