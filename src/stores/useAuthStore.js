import { create } from 'zustand';

const useAuthStore = create((set) => ({
    token: localStorage.getItem('token') || null,
    isLoggedIn: !!localStorage.getItem('token'),
    login: (token) => {
        localStorage.setItem('token', token);
        set({
            token: token,
            isLoggedIn: true,
        });
    },
    logout: () => {
        Object.keys(localStorage).forEach((key) => {
            localStorage.removeItem(key);
        });
        set({ token: null, isLoggedIn: false });
    },
}));

export default useAuthStore;
