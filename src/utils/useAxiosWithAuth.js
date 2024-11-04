import { useSnackbarStore } from '@/stores/useSnackbarStore';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useAuthStore from 'stores/useAuthStore';

const useAxiosWithAuth = () => {
    const { token } = useAuthStore(); // Zustand에서 토큰 가져오기
    const navigate = useNavigate();
    const { setSnackbarOpen } = useSnackbarStore();

    const axiosInstance = axios.create({
        baseURL: import.meta.env.VITE_API_URL,
    });

    if (!token) {
        navigate('/');
    }

    // 무한 요청 방지 flag
    let isRefreshing = false;

    // 요청 전 토큰을 Authorization 헤더에 추가
    axiosInstance.interceptors.request.use(
        (config) => {
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    // 응답 처리
    axiosInstance.interceptors.response.use(
        (response) => {
            return response;
        },
        async (error) => {
            // 401 에러 처리 (인증 실패)
            if (error.response?.status === 401) {
                if (!token || isRefreshing) {
                    // 이미 리프레시 중이거나 토큰이 없으면 로그아웃 후 리디렉션
                    // useAuthStore.getState().logout(isRefreshing);
                    // navigate('/');
                } else {
                    isRefreshing = true; // 무한 호출 방지 플래그
                    try {
                        // 만료된 토큰으로 인한 로그아웃 처리
                        // useAuthStore.getState().logout();
                        setSnackbarOpen({
                            text: '로그인이 만료되었어요. 다시 로그인해주세요.',
                            severity: 'warning',
                        });
                        // navigate('/'); // 로그인 페이지로 리디렉션
                    } catch (logoutError) {
                        console.error(
                            '로그아웃 처리 중 오류 발생:',
                            logoutError
                        );
                        return Promise.reject(logoutError);
                    }
                }
            }

            return Promise.reject(error);
        }
    );

    return axiosInstance;
};

export default useAxiosWithAuth;
