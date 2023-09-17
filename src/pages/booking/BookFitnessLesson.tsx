import useGuardProtectedPage from 'src/hooks/useGuardProtectedPage';

export default function BookFitnessLesson() {
    useGuardProtectedPage();
    return <p>hiii</p>;
}
