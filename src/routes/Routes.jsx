import Home from "../pages/Home/Home";
import ErrorPage from "../pages/ErrorPage";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import PrivateRoute from "./PrivateRoute";
import MainLayout from "../layouts/MainLayout";
import { createBrowserRouter } from "react-router";
import Meals from "../pages/Meals/Meals";
import MealDetails from "../pages/MealDetails/MealDetails";
import Order from "../pages/Order/Order";
import PaymentSuccess from "../pages/PaymentSuccess/PaymentSuccess";
import AdminStatistics from "../components/Dashboard/Statistics/AdminStatistics";
import UserProfile from "../components/Dashboard/UserProfile";
import MyProfile from "../components/Dashboard/MyProfile";
import Dashboard from '../pages/Dashboard/Dashboard'
import DashboardRedirector from "../components/Dashboard/DashboardRedirector";
import MyOrders from "../components/Dashboard/User/MyOrders";
import Favoritesmeal from "../components/Dashboard/User/FavoritesMeals";
import MyReview from "../components/Dashboard/User/MyReview";
import ManageOrder from "../components/Dashboard/Chef/ManageOrder";
import CreateMeal from "../components/Dashboard/Chef/CreateMeal";
import MyMeals from "../components/Dashboard/Chef/MyMeals";
import UpdateMeal from "../components/Dashboard/Chef/UpdateMeal";
import ManageUsers from "../components/Dashboard/Admin/ManageReq/ManageUser/ManageUser";
import ManageRequests from "../components/Dashboard/Admin/ManageReq/ManageReq";

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
        path: "/order/:id",
        element: (
          <PrivateRoute>
            <Order />
          </PrivateRoute>
        ),
      },
      {
        path: "/payment-success",
        element: (
          <PrivateRoute>
            <PaymentSuccess />
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
        element: <PrivateRoute>
          <DashboardRedirector />
        </PrivateRoute>
      },
      {
        path: "statistics",
        element: (
          <PrivateRoute requiredRole="admin">
            <AdminStatistics />
          </PrivateRoute>
        ),
      },
      {
        path: "request",
        element: <PrivateRoute requiredRole="admin">
          <ManageRequests />
        </PrivateRoute>
      },
      {
        path: 'manage-users',
        element: (
          <PrivateRoute requiredRole="admin">
            <ManageUsers />
          </PrivateRoute>
        )
      },
      {
        path: 'manage-orders',
        element: (
          <PrivateRoute requiredRole="chef">
            <ManageOrder />
          </PrivateRoute>
        )
      },
      {
        path: 'create-meal',
        element: (
          <PrivateRoute requiredRole="chef">
            <CreateMeal />
          </PrivateRoute>
        )
      },
      {
        path: 'my-meals',
        element: (
          <PrivateRoute requiredRole="chef">
            <MyMeals />
          </PrivateRoute>
        )
      },
      {
        path: 'update-meal',
        element: (
          <PrivateRoute requiredRole="chef">
            <UpdateMeal />
          </PrivateRoute>
        )
      },
      {
        path: "my-orders",
        element: <PrivateRoute>
          <MyOrders />
        </PrivateRoute>
      },
      {
        path: "my-review",
        element: <PrivateRoute>
          <MyReview />
        </PrivateRoute>
      },
      {
        path: "favorites-meals",
        element: <PrivateRoute>
          <Favoritesmeal />
        </PrivateRoute>
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
