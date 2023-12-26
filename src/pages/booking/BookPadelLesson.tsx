import { Chip, Container, Group, Space, Stack, Title, Select } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useEffect, useState } from "react";
import generateClubTimes from "src/utils/generateClubTimes";

export default function BookPadelLesson() {
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [selectedDuration, setSelectedDuration] = useState<string | null>("60");
    const [selectedTime, setSelectedTime] = useState<string | string[]>();
    const [availableTimes, setAvailableTimes] = useState<string[]>([]);

    useEffect(() => {
        setAvailableTimes(generateClubTimes(selectedDuration));
    }, [selectedDate, selectedDuration]);

    return (
        <Container size={900} my={100} fluid>
            <Group justify="center" ta="center" style={{ display: "flex", flexDirection: "column" }}>
                <Title ta="center" order={1} style={{ fontWeight: 700 }}>
                    Book a Padel Lesson!
                </Title>
                <Space mt="xl" />
                <Title ta="center" order={2} style={{ fontWeight: 600 }}>
                    Pick a Date
                </Title>
                <DatePicker maxLevel="month" firstDayOfWeek={0} size="lg" hideOutsideDates defaultDate={new Date()} date={selectedDate} onDateChange={setSelectedDate} weekendDays={[0, 6]} minDate={new Date()} maxDate={new Date().addDays(7)} />
                <Title ta="center" order={2} mt={40} style={{ fontWeight: 600 }}>
                    Pick the Duration and Time
                </Title>
                <Select
                    size="lg"
                    placeholder="Pick one"
                    value={selectedDuration}
                    onChange={(val) => {
                        setSelectedDuration(val);
                    }}
                    data={[
                        { value: "60", label: "1 hour" },
                        { value: "90", label: "1 hour 30 mins" },
                        { value: "120", label: "2 hours" },
                        { value: "150", label: "2 hours 30 mins" },
                        { value: "180", label: "3 hours" },
                    ]}
                />
                <Stack ta="center" style={{ maxHeight: 400, width: 300, overflowX: "hidden", overflowY: "scroll", scrollbarWidth: "none" }}>
                    <Chip.Group
                        value={selectedTime}
                        onChange={(val) => {
                            setSelectedTime(val);
                        }}
                    >
                        {availableTimes.map((time) => (
                            <Chip variant="filled" size="xl" color="blue" radius="sm" key={time} value={time} styles={{ label: { width: "250px" } }}>
                                {time}
                            </Chip>
                        ))}
                    </Chip.Group>
                </Stack>

            </Group>
        </Container>
    );
}
