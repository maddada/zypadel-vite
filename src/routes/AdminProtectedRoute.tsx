import { Navigate } from "react-router-dom";
import { useAuth } from "reactfire";

export default function AdminProtectedRoute({ redirectPath = "/login", children }) {
    const user = useAuth().currentUser;

    if (!user || (user && !user?.email?.includes("@zypadel.com"))) {
        alert("Only ZY Padel staff can access this page\n(email should contain @zypadel.com")
        return <Navigate to={redirectPath} replace />;
    }

    return children;
}
