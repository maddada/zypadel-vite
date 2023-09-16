import { createBrowserRouter } from "react-router-dom";
import ForgotPassword from "src/pages/auth/ForgotPassword";
import Login from "src/pages/auth/Login";
import Register from "src/pages/auth/Register";
import BookFitnessLesson from "src/pages/booking/BookFitnessLesson";
import BookPadelCourt from "src/pages/booking/BookPadelCourt";
import BookPadelLesson from "src/pages/booking/BookPadelLesson";
import ManageFitnessLessons from "src/pages/management/ManageFitnessLessons";
import ManagePadelCourts from "src/pages/management/ManagePadelCourts";
import ManagePadelLessons from "src/pages/management/ManagePadelLessons";
import ErrorPage from "src/routes/ErrorPage";
import Root from "src/routes/Root";

export const links = [
    // { link: "/", label: "Home" },
    { link: "/login", label: "Login" },
    { link: "/register", label: "Register" },
    { link: "/book-padel-court", label: "Book Padel Court" },
    { link: "/book-fitness-lesson", label: "Book Fitness Lesson" },
    { link: "/book-padel-lesson", label: "Book Padel Lesson" },
];

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
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
                element: <BookPadelCourt />,
            },
            {
                path: "book-fitness-lesson",
                element: <BookFitnessLesson />,
            },
            {
                path: "book-padel-lesson",
                element: <BookPadelLesson />,
            },
            {
                path: "manage-padel-lessons",
                element: <ManagePadelLessons />,
            },
            {
                path: "manage-padel-courts",
                element: <ManagePadelCourts />,
            },
            {
                path: "manage-fitness-lessons",
                element: <ManageFitnessLessons />,
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
