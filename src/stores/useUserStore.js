import { create } from 'zustand';

export const useUserStore = create((set) => {
    const setUserId = (userId) => set({ userId });

    return {
        userId: null,
        setUserId,
    };
});
