// src/pages/dashboard/Dashboard.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Button from "../../components/Shared/Button/Button";
import useAuth from "../../hooks/useAuth";

import UserMenu from "../../components/Dashboard/Sidebar/Menu/UserMenu";
import AdminMenu from "../../components/Dashboard/Sidebar/Menu/AdminMenu";
import ChefMenu from "../../components/Dashboard/Sidebar/Menu/ChefMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { useTheme } from "../../providers/ThemeProvider";

export default function Dashboard() {
  const { user, role } = useAuth();
    const { theme, toggleTheme } = useTheme();
  const API_URL = import.meta.env.VITE_API_URL;

  if (!user) return <p>Login to see dashboard</p>;
  if (!role) return <p>no role</p>;

  const renderSidebarMenu = () => {
    switch (role) {
      case "admin":
        return <AdminMenu />;
      case "chef":
        return <ChefMenu />;
      case "user":
        return <UserMenu />;
      default:
        return <UserMenu />;
    }
  };

const targetRole = role === "user" ? "chef" : "admin";

const handleRequest = async () => {
  try {
    const res = await axios.post(`${API_URL}/chef-requests`, {
      userEmail: user.email,
      userName: user.displayName,
      requestedRole: targetRole,
    });

    if (res.data.alreadyRequested) {
      toast.error("You already requested");
    } else {
      toast.success("Request sent!");
    }
  } catch (err) {
    toast.error("Request failed");
    console.log(err);
  }
};


  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

      {/* Main Content */}
      <div className="drawer-content flex flex-col min-h-screen">
        {/* Navbar */}
        <nav className="navbar w-full">
          <label
            htmlFor="my-drawer-4"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost"
          >
            {/* Sidebar toggle icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeWidth="2"
              fill="none"
              stroke="currentColor"
              className="size-4"
            >
              <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z" />
              <path d="M9 4v16" />
              <path d="M14 10l2 2l-2 2" />
            </svg>
          </label>
          

          <div className="w-full flex flex-col md:flex-row md:justify-between">
            <div>
              <div className="px-4 font-bold text-3xl bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
                Dashboard
              </div>
              <h3 className="px-4 font-bold">
                {user.displayName} ({role})
              </h3>
            </div>
            <div className="flex items-center">
              <button onClick={toggleTheme} className="bg-gray-600 btn btn-ghost btn-md rounded-4xl">
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
        {role === "user" && (
              <div className="md:mx-6">
                <Button label="Become a Chef"  onClick={handleRequest}/>
              </div>
            )}

            {role === "chef" && (
              <div className="md:mx-6">
                <Button
                  label="Become Admin" onClick={handleRequest}
                />
              </div>
            )}
            </div>

            
          </div>
        </nav>

        <main className="grow p-4 md:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>

      {/* Sidebar */}
      <div className="drawer-side is-drawer-close:overflow-visible">
        <label htmlFor="my-drawer-4" className="drawer-overlay" aria-label="close sidebar"/>
        <div className="flex min-h-full flex-col items-start is-drawer-close:w-20 is-drawer-open:w-64">
          {renderSidebarMenu()}
        </div>
      </div>
    </div>
  );
}
