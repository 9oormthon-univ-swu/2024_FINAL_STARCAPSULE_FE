import { create } from 'zustand';

export const useSnackbarStore = create((set) => ({
    open: false,
    text: '',
    severity: 'warning',
    setClose: () => set({ open: false, text: '', severity: 'warning' }),
    setSnackbarOpen: (props) => set({ ...props, open: true }),
}));
