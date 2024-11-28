import useAuthStore from '@/stores/useAuthStore';
import { useUserStore } from '@/stores/useUserStore';
import { useParams } from 'react-router-dom';
import Main from './Main';
import Guest from './guest/Guest';
import { saveTokenFromURL } from '@/utils/saveTokenFromURL';
import { useEffect } from 'react';

const MainPage = () => {
    const params = useParams();
    const { setUserId, userId } = useUserStore();
    const { login, isLoggedIn } = useAuthStore();

    useEffect(() => {
        if (params.userId) {
            saveTokenFromURL(login);
            setUserId(params.userId);
        }
    }, [login, params.userId, setUserId]);

    if (!isLoggedIn || !userId) {
        return null; // 로딩 상태를 보여주는 로직 추가 가능
    } else if (isLoggedIn && userId === params.userId) {
        return <Main />;
    } else {
        return <Guest />;
    }
};

export default MainPage;
