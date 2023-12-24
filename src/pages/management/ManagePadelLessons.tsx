import useGuardProtectedPage from "src/hooks/useGuardProtectedPage";

export default function ManagePadelLessons() {
    useGuardProtectedPage();
    return <p>hiii</p>;
}
