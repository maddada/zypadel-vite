/* eslint-disable @typescript-eslint/no-unused-vars */
import { create } from "zustand";
import { links } from "src/routes/Routes";

interface State {
    activeLink: string;
    setActiveLink: (link: string) => void;
}

export const useStore = create<State>((set) => ({
    activeLink: window.location.pathname,
    setActiveLink: (link) => set((state) => ({ activeLink: link })),
}));
