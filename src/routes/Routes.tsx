import { createBrowserRouter } from "react-router-dom";
import ForgotPassword from "src/pages/auth/ForgotPassword";
import Home from "src/pages/auth/Home";
import Login from "src/pages/auth/Login";
import Register from "src/pages/auth/Register";
import BookFitnessClass from "src/pages/booking/BookFitnessClass";
import BookMeetingRoom from "src/pages/booking/BookMeetingRoom";
import BookPadelCourt from "src/pages/booking/BookPadelCourt";
import BookPadelLesson from "src/pages/booking/BookPadelLesson";
import ErrorPage from "src/pages/error/ErrorPage";
import ManageFitnessClass from "src/pages/management/ManageFitnessClasses";
import ManageMeetingRoom from "src/pages/management/ManageMeetingRoom";
import ManagePadelCourts from "src/pages/management/ManagePadelCourts";
import ManagePadelLessons from "src/pages/management/ManagePadelLessons";
import Root from "src/routes/Root";
import AdminProtectedRoute from "./AdminProtectedRoute";
import ProtectedRoute from "./ProtectedRoute";

export const links = [
    // { link: "/", label: "Home" },
    { link: "/login", label: "Login", logInRequired: false },
    { link: "/register", label: "Register", logInRequired: false },
    { link: "/book-padel-court", label: "Padel Court", logInRequired: true },
    { link: "/book-padel-lesson", label: "Padel Lesson", logInRequired: true },
    // { link: "/book-fitness-class", label: "Fitness Class", logInRequired: true },
    // { link: "/book-meeting-room", label: "Meeting Room", logInRequired: true },
    { link: "/manage-padel-courts", label: "Manage Padel Courts", adminLogInRequired: true },
    { link: "/manage-padel-lessons", label: "Manage Padel Lessons", adminLogInRequired: true },
    // { link: "/manage-fitness-classes", label: "Manage Fitness Classes", adminLogInRequired: true },
    // { link: "/manage-meeting-room", label: "Manage Meeting Room", adminLogInRequired: true },
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
                path: "book-padel-lesson",
                element: (
                    <ProtectedRoute>
                        <BookPadelLesson />
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
                path: "manage-padel-lessons",
                element: (
                    <AdminProtectedRoute>
                        <ManagePadelLessons />
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
