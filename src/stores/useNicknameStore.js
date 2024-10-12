import { create } from 'zustand';

// 스노우볼의 주인의 닉네임을 저장하는 store (guest 입장)
export const useNicknameStore = create((set) => {
    const setNickname = (nickname) => set({ nickname });

    return {
        nickname: '',
        setNickname,
    };
});
