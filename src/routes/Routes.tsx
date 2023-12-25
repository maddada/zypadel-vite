import { createBrowserRouter } from "react-router-dom";
import ForgotPassword from "src/pages/auth/ForgotPassword";
import Login from "src/pages/auth/Login";
import Register from "src/pages/auth/Register";
import Home from "src/pages/auth/Home";
import BookFitnessClass from "src/pages/booking/BookFitnessClass";
import BookMeetingRoom from "src/pages/booking/BookMeetingRoom";
import BookPadelCourt from "src/pages/booking/BookPadelCourt";
import BookPadelClass from "src/pages/booking/BookPadelClass";
import ManageFitnessClass from "src/pages/management/ManageFitnessClasses";
import ManagePadelCourts from "src/pages/management/ManagePadelCourts";
import ManageMeetingRoom from "src/pages/management/ManageMeetingRoom";
import ManagePadelClasses from "src/pages/management/ManagePadelClasses";
import ErrorPage from "src/routes/ErrorPage";
import Root from "src/routes/Root";
import ProtectedRoute from "./ProtectedRoute";
import AdminProtectedRoute from "./AdminProtectedRoute";

export const links = [
    // { link: "/", label: "Home" },
    { link: "/login", label: "Login", logInRequired: false },
    { link: "/register", label: "Register", logInRequired: false },
    { link: "/book-padel-court", label: "Padel Court", logInRequired: true },
    { link: "/book-fitness-class", label: "Fitness Class", logInRequired: true },
    { link: "/book-padel-class", label: "Padel Class", logInRequired: true },
    { link: "/book-meeting-room", label: "Meeting Room", logInRequired: true },
    { link: "/manage-padel-courts", label: "Manage Padel Courts", adminLogInRequired: true },
    { link: "/manage-fitness-classes", label: "Manage Fitness Classes", adminLogInRequired: true },
    { link: "/manage-padel-classes", label: "Manage Padel Classes", adminLogInRequired: true },
    { link: "/manage-meeting-room", label: "Manage Meeting Room", adminLogInRequired: true },
];

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "",
                element: <Home />,
            },
            {
                path: "login",
                element: <Login />,
            },
            {
                path: "register",
                element: <Register />,
            },
            {
                path: "forgot-password",
                element: <ForgotPassword />,
            },
            {
                path: "book-padel-court",
                element: (
                    <ProtectedRoute>
                        <BookPadelCourt />
                    </ProtectedRoute>
                ),
            },
            {
                path: "book-fitness-class",
                element: (
                    <ProtectedRoute>
                        <BookFitnessClass />
                    </ProtectedRoute>
                ),
            },
            {
                path: "book-padel-class",
                element: (
                    <ProtectedRoute>
                        <BookPadelClass />
                    </ProtectedRoute>
                ),
            },
            {
                path: "book-meeting-room",
                element: (
                    <ProtectedRoute>
                        <BookMeetingRoom />
                    </ProtectedRoute>
                ),
            },
            {
                path: "manage-padel-classes",
                element: (
                    <AdminProtectedRoute>
                        <ManagePadelClasses />
                    </AdminProtectedRoute>
                ),
            },
            {
                path: "manage-padel-courts",
                element: (
                    <AdminProtectedRoute>
                        <ManagePadelCourts />
                    </AdminProtectedRoute>
                ),
            },
            {
                path: "manage-fitness-classes",
                element: (
                    <AdminProtectedRoute>
                        <ManageFitnessClass />
                    </AdminProtectedRoute>
                ),
            },
            {
                path: "manage-meeting-room",
                element: (
                    <AdminProtectedRoute>
                        <ManageMeetingRoom />
                    </AdminProtectedRoute>
                ),
            },
        ],
    },
]);

/*
{
    link: "#1",
    label: "Learn",
    links: [
        { link: "/docs", label: "Documentation" },
        { link: "/resources", label: "Resources" },
        { link: "/community", label: "Community" },
        { link: "/blog", label: "Blog" },
    ],
},
{
    link: "#2",
    label: "Support",
    links: [
        { link: "/faq", label: "FAQ" },
        { link: "/demo", label: "Book a demo" },
        { link: "/forums", label: "Forums" },
    ],
},*/
