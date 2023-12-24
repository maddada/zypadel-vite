import useGuardProtectedPage from "src/hooks/useGuardProtectedPage";

export default function BookPadelLesson() {
    useGuardProtectedPage();
    return <p>hiii</p>;
}
