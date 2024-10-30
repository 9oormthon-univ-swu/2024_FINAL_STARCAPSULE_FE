import { create } from 'zustand';

export const useToastStore = create((set) => ({
    open: false,
    text: '',
    severity: 'warning',
    setClose: () => set({ open: false, text: '', severity: 'warning' }),
    setToastOpen: ({ text, severity }) =>
        set({ text: text, severity: severity, open: true }),
}));
