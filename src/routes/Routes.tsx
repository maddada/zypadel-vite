import { createBrowserRouter } from "react-router-dom";
import ForgotPassword from "src/pages/auth/ForgotPassword";
import Login from "src/pages/auth/Login";
import Register from "src/pages/auth/Register";
import Home from "src/pages/auth/Home";
import BookFitnessLesson from "src/pages/booking/BookFitnessLesson";
import BookMeetingRoom from "src/pages/booking/BookMeetingRoom";
import BookPadelCourt from "src/pages/booking/BookPadelCourt";
import BookPadelLesson from "src/pages/booking/BookPadelLesson";
import ManageFitnessLessons from "src/pages/management/ManageFitnessLessons";
import ManagePadelCourts from "src/pages/management/ManagePadelCourts";
import ManageMeetingRoom from "src/pages/management/ManageMeetingRoom";
import ManagePadelLessons from "src/pages/management/ManagePadelLessons";
import ErrorPage from "src/routes/ErrorPage";
import Root from "src/routes/Root";
import ProtectedRoute from "./ProtectedRoute";
import AdminProtectedRoute from "./AdminProtectedRoute";

export const links = [
    // { link: "/", label: "Home" },
    { link: "/login", label: "Login", logInRequired: false },
    { link: "/register", label: "Register", logInRequired: false },
    { link: "/book-padel-court", label: "Padel Court", logInRequired: true },
    { link: "/book-fitness-lesson", label: "Fitness Lesson", logInRequired: true },
    { link: "/book-padel-lesson", label: "Padel Lesson", logInRequired: true },
    { link: "/book-meeting-room", label: "Meeting Room", logInRequired: true },
    { link: "/manage-padel-courts", label: "Manage Padel Courts", adminLogInRequired: true },
    { link: "/manage-fitness-lessons", label: "Manage Fitness Lessons", adminLogInRequired: true },
    { link: "/manage-padel-lessons", label: "Manage Padel Lessons", adminLogInRequired: true },
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
                path: "book-fitness-lesson",
                element: (
                    <ProtectedRoute>
                        <BookFitnessLesson />
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
                path: "manage-fitness-lessons",
                element: (
                    <AdminProtectedRoute>
                        <ManageFitnessLessons />
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
