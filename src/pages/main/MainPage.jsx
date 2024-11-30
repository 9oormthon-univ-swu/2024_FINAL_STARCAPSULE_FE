import useAuthStore from '@/stores/useAuthStore';
import { useUserStore } from '@/stores/useUserStore';
import { useParams, useSearchParams } from 'react-router-dom';
import Main from './Main';
import Guest from './guest/Guest';
import { saveTokenFromURL } from '@/utils/saveTokenFromURL';
import { useEffect } from 'react';

const MainPage = () => {
    const params = useParams();
    const [searchParams] = useSearchParams();
    const { setUserId, userId } = useUserStore();
    const { login, isLoggedIn } = useAuthStore();

    useEffect(() => {
        if (params.userId && searchParams.get('token')) {
            saveTokenFromURL(login);
            setUserId(params.userId);
        }
    }, [login, params.userId, setUserId]);

    console.log('isLoggedIn:', isLoggedIn);
    console.log('userId:', userId);

    if (isLoggedIn && userId === params.userId) {
        return <Main />;
    } else {
        return <Guest />;
    }
};

export default MainPage;
