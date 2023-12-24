import useGuardProtectedPage from "src/hooks/useGuardProtectedPage";
import { Group } from "@mantine/core";
import { DatePicker } from "@mantine/dates";

export default function BookFitnessLesson() {
    useGuardProtectedPage();
    const [value, setValue] = useState<Date | null>(null);

    return (
        <Group position="center">
            <DatePicker value={value} onChange={setValue} />
        </Group>
    );
}
