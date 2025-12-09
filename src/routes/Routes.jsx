import Home from '../pages/Home/Home'
import ErrorPage from '../pages/ErrorPage'
import Login from '../pages/Login/Login'
import SignUp from '../pages/SignUp/SignUp'
import PrivateRoute from './PrivateRoute'
import MainLayout from '../layouts/MainLayout'
import { createBrowserRouter } from 'react-router'
import Meals from '../pages/Meals/Meals'
import MealDetails from '../pages/MealDetails/MealDetails'
import FavoritesPage from '../pages/Favorites/Favorites'
import { Dashboard } from '../pages/Dashboard/Dashboard'
import Order from '../pages/Order/Order'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/meals',
        element: <Meals />,
      },
      {
        path: '/meals/:id',
        element: <MealDetails />,
      },
      {
        path: '/favorites',
        element: <PrivateRoute>
                    <FavoritesPage />
                  </PrivateRoute>,
      },
      {
        path: '/order',
        element: <PrivateRoute>
          <Order />
        </PrivateRoute>
      }
    ],
  },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <SignUp /> },
  {
    path: '/dashboard',
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
  },
])
