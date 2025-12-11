import Home from "../pages/Home/Home";
import ErrorPage from "../pages/ErrorPage";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import PrivateRoute from "./PrivateRoute";
import MainLayout from "../layouts/MainLayout";
import { createBrowserRouter } from "react-router";
import Meals from "../pages/Meals/Meals";
import MealDetails from "../pages/MealDetails/MealDetails";
import FavoritesPage from "../pages/Favorites/Favorites";
import Order from "../pages/Order/Order";
import AdminStatistics from "../components/Dashboard/Statistics/AdminStatistics";
import ManageUser from "../components/Dashboard/ManageUser/ManageUser";
import ManageRequest from "../components/Dashboard/ManageReq/ManageReq";
import UserProfile from "../components/Dashboard/UserProfile";
import MyProfile from "../components/Dashboard/MyProfile";
import Dashboard from '../pages/Dashboard/Dashboard'

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/meals",
        element: <Meals />,
      },
      {
        path: "/meals/:id",
        element: (
          <PrivateRoute>
            <MealDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/favorites",
        element: (
          <PrivateRoute>
            <FavoritesPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/order/:id",
        element: (
          <PrivateRoute>
            <Order />
          </PrivateRoute>
        ),
      },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <SignUp /> },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      
      {
    index: true,
    element: (
      <PrivateRoute>
        <AdminStatistics />
      </PrivateRoute>
    ),
  },
  {
    path: "request",
    element: <PrivateRoute>
      <ManageRequest />
    </PrivateRoute>
  },
  {
    path: 'manage-users',
    element: (
      <PrivateRoute>
        <ManageUser />
      </PrivateRoute>
    )
  },
  {
    path: 'my-profile',
    element: <PrivateRoute>
      <MyProfile />
    </PrivateRoute>
  },
  {
    path: "update-profile",
    element: <PrivateRoute>
      <UserProfile />
    </PrivateRoute>
  }

    ]
  },
]);
