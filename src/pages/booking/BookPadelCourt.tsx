import useGuardProtectedPage from "src/hooks/useGuardProtectedPage";

export default function BookPadelCourt() {
    useGuardProtectedPage();
    return <p>hiii</p>;
}
