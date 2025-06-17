import { createBrowserRouter, Navigate } from "react-router-dom";
import { BOOKING_PATH, HOME_PATH, LOGIN_PATH, MY_RIDES_PATH, REGISTER_PATH, ROOT_PATH } from "./path";
import { DashboardLayout } from "../dashboard";
import { HomePage } from "../dashboard/pages/HomePage";
import { BookingPage } from "../dashboard/pages/BookingPage";
import { MyRides } from "../myRides/MyRides";
import { Login } from "../auth/pages/Login";
import { Register } from "../auth/pages/Register";

export const routes = createBrowserRouter([
  {
    children: [
      {
        element: <HomePage />,
        path: HOME_PATH,
      },
      {
        element: <Navigate to={HOME_PATH} replace />,
        path: ROOT_PATH,
      },
      {
        element: <BookingPage />,
        path: BOOKING_PATH,
      },
      {
        element: <MyRides />,
        path: MY_RIDES_PATH,
      },
      {
        element: <Login />,
        path: LOGIN_PATH,
      },
      {
        element: <Register />,
        path: REGISTER_PATH,
      },
    ],
    element: <DashboardLayout />,
  }
])