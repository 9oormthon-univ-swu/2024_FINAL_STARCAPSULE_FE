import { create } from 'zustand';

//  로그인 정보를 저장하는 store
export const useUserStore = create((set) => {
    const setUserId = (userId) => {
        localStorage.setItem('userId', userId);
        set((prev) => ({ ...prev, userId }));
    };
    const setSnowball = (snowball) => set((prev) => ({ ...prev, snowball }));

    const setHasWritten = (written) => {
        localStorage.setItem('hasWritten', written);

        set((prev) => ({
            ...prev,
            hasWritten: written,
        }));
    };

    return {
        userId: localStorage.getItem('userId'),
        setUserId,
        snowball: '',
        setSnowball,
        hasWritten: localStorage.getItem('hasWritten'),
        setHasWritten,
    };
});
