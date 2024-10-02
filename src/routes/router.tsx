import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import About from "../pages/About";
import Login from "../pages/Login";
import Registration from "../pages/Registration";
import Dashboard from "../pages/Dashboard";
import DashboardLayout from "../components/layout/DashboardLayout";
import Booking from "../pages/Booking";
import UserManagement from "../pages/UserManagement";
import MyBookings from "../pages/MyBookings";
import UserProfile from "../pages/UserProfile";
import DashboardWish from "../pages/DashboardWish";
import GetRooms from "../pages/Admin/GetRooms";
import AddSlot from "../pages/Admin/AddSlot";
import AddRoom from "../pages/Admin/AddRoom";
import GetSlots from "../pages/Admin/GetSlots";
import GetUsers from "../pages/Admin/GetUsers";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: "/about-us",
                element: <About />,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/signup",
                element: <Registration />,
            },
            {
                path: "/dashboard",
                element: <Dashboard />,
            },
        ],
    },
    {
        path: "/dashboard",
        element: <DashboardLayout />,
        children: [
            {
                index: true,
                element: <DashboardWish />,
            },
            {
                path: "addslot",
                element: <AddSlot />,
            },
            {
                path: "addroom",
                element: <AddRoom />,
            },
            {
                path: 'allroom',
                element: <GetRooms />
            },
            {
                path: 'allslot',
                element: <GetSlots />
            },
            {
                path: "bookings",
                element: <Booking />,
            },
            {
                path: "users",
                element: <GetUsers/> ,
            },
            {
                path: "mybookings",
                element: <MyBookings />,
            },
            {
                path: "myprofile",
                element: <UserProfile />,
            },
        ],
    },
])