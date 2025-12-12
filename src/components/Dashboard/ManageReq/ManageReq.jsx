import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function ManageRequests() {
  const [requests, setRequests] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    axios.get(`${API_URL}/admin/requests`, { headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` } })
      .then((res) => setRequests(res.data));
  }, []);

  const handleRequest = (id, approve = true) => {
    axios.patch(`${API_URL}/admin/requests/${id}`, { approve }, { headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` } })
      .then(() => {
        Swal.fire("Success", `Request ${approve ? "approved" : "rejected"}`, "success");
        setRequests((prev) => prev.map((r) => r._id === id ? { ...r, requestStatus: approve ? "approved" : "rejected" } : r));
      });
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Manage Requests</h2>
      <table className="w-full border">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2">Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">Request Type</th>
            <th className="p-2">Status</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((r) => (
            <tr key={r._id} className="border-t">
              <td className="p-2">{r.userName}</td>
              <td className="p-2">{r.userEmail}</td>
              <td className="p-2">{r.requestType}</td>
              <td className="p-2">{r.requestStatus}</td>
              <td className="p-2 flex gap-2">
                {r.requestStatus === "pending" && (
                  <>
                    <button onClick={() => handleRequest(r._id, true)} className="bg-green-500 text-white px-2 py-1 rounded">Accept</button>
                    <button onClick={() => handleRequest(r._id, false)} className="bg-red-500 text-white px-2 py-1 rounded">Reject</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
