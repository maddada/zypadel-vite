import useGuardProtectedPage from "src/hooks/useGuardProtectedPage";

export default function ManageFitnessLessons() {
    useGuardProtectedPage();
    return <p>hiii</p>;
}
