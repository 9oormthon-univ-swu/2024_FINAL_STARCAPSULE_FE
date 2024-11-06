import { create } from 'zustand';

const useAuthStore = create((set) => ({
    token: localStorage.getItem('token') || null,
    isLoggedIn: !!localStorage.getItem('token'),
    login: (token) => {
        console.log('login:', token);
        localStorage.setItem('token', token);
        set({
            token: token,
            isLoggedIn: true,
        });
    },
    logout: () => {
        // TODO: 로컬스토리지 정리
        // localStorage.removeItem('token');
        // set({ token: null, isLoggedIn: false });
    },
}));

export default useAuthStore;
