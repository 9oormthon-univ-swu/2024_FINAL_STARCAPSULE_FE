import { create } from 'zustand';

//  로그인 정보를 저장하는 store
export const useUserStore = create((set) => {
    const setUserId = (userId) => {
        if (userId !== null) {
            set((prev) => {
                if (prev.userId && prev.userId !== userId) {
                    return prev;
                }
                localStorage.setItem('userId', userId);
                return { ...prev, userId };
            });
        }
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
