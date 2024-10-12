import { create } from 'zustand';

//  로그인 정보를 저장하는 store
export const useUserStore = create((set) => {
    const setUserId = (userId) => set({ userId });
    const setSnowball = (snowball) => set({ snowball });

    return {
        userId: null,
        setUserId,
        snowball: '',
        setSnowball,
    };
});
