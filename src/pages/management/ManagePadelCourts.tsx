import useGuardProtectedPage from "src/hooks/useGuardProtectedPage";

export default function ManagePadelCourts() {
    useGuardProtectedPage();
    return <p>hiii</p>;
}
