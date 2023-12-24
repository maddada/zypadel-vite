import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "src/state/Store";
import { Notification } from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import { useAuth } from 'reactfire';
import firebase from 'firebase/compat/app';

export default function useGuardProtectedPage() {
    const navigate = useNavigate();
    const setActiveLink = useStore((state: any) => state.setActiveLink);

    let auth = useAuth(firebase);

    useEffect(() => {
        if (!auth.currentUser) {
            navigate("/login");
            setActiveLink("/login");
        }
    });

    return (
        <Notification icon={<IconX size="1.1rem" />} color="red">
            Bummer! Notification without title
        </Notification>
    );
    // return isOnline;
}
