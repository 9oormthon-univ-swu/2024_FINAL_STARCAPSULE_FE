import { create } from 'zustand';

// Zustand를 활용한 로그인 상태 관리
const useAuthStore = create((set) => ({
    token: localStorage.getItem('token') || null,
    isLoggedIn: !!localStorage.getItem('token'),
    login: (token) => {
        set({
            token,
            isLoggedIn: true,
        });
    },
    logout: () => {
        localStorage.removeItem('token');
        set({ token: null, isLoggedIn: false });
    },
}));

export default useAuthStore;
