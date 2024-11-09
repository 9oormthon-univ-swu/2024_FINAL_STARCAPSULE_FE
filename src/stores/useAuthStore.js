import { create } from 'zustand';

const useAuthStore = create((set) => ({
    token: localStorage.getItem('token') || null,
    isLoggedIn: !!localStorage.getItem('token'),
    login: (token) => {
        set({
            token: token,
            isLoggedIn: true,
        });
    },
    logout: () => {
        localStorage.clear();
        set({ token: null, isLoggedIn: false });
    },
}));

export default useAuthStore;
