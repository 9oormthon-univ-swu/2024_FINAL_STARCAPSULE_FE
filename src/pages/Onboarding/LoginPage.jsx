import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Snowfall from 'react-snowfall';
import ShareIcon from '../../components/icons/ShareIcon';
import { Helmet } from 'react-helmet-async';
import useAuthStore from '@/stores/useAuthStore';
import { useSnackbarStore } from '@/stores/useSnackbarStore';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100dvh;
    width: 100vw;
    max-width: 600px;
    background: var(
        --background,
        linear-gradient(0deg, #93c2df 0%, #c3def7 59%, #b6d8e1 100%)
    );
    position: relative;
    overflow: hidden;
    margin: 0 auto;
    background-color: white;
`;

const Title = styled.h1`
    font-family: 'Rage';
    font-size: 76px;
    color: #fff;
    position: absolute;
    top: 150px;
    left: 190px;
    transform: translateX(-50%);
    white-space: nowrap;
`;

const SubTitle = styled.p`
    font-size: 22px;
    font-family: 'Noto Sans';
    color: #5a5a5a;
    position: absolute;
    top: 270px;
    transform: translateX(-50%);
    left: 185px;
    font-weight: 700;
    line-height: 1.4;
    margin: 5px 0;

    @media (max-width: 490px) {
        font-size: 16px;
        white-space: normal;
        color: #5a5a5a;
        font-weight: 600;
        position: absolute;
        top: 270px;
        transform: translateX(-50%);
        left: 155px;
        line-height: 1.4;
        margin: 5px 0;
    }

    @media (max-width: 360px) {
        font-size: 14px;
        white-space: normal;
        color: #5a5a5a;
        font-weight: 500;
        position: absolute;
        top: 270px;
        transform: translateX(-50%);
        left: 140px;
        line-height: 1.4;
        margin: 5px 0;
    }
`;

const KakaoButton = styled.button`
    background-color: #fee500;
    color: #3c1e1e;
    display: flex;
    width: 312px;
    height: 62px;
    padding: 0px 14px;
    justify-content: center;
    align-items: center;
    border: none;
    border-radius: 12px;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    box-shadow: 0px 0px 4px 0px rgba(40, 40, 40, 0.2);
    position: absolute;
    bottom: 40px;
    z-index: 10;

    &:hover {
        background-color: #f7df00;
    }
`;

const KakaoIcon = styled.span`
    display: inline-block;
    margin-right: 10px;
    width: 24px;
    height: 24px;
`;

const KakaoSVG = () => (
    <svg
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 24 24'
        fill='black'
        width='24px'
        height='24px'
    >
        <path d='M12,2C6.48,2,2,5.58,2,10.14c0,2.58,1.78,4.87,4.45,6.24C6.15,17.85,5.4,19.81,5.27,19.81c0,0,0,0,0,0c0.26,0.02,3.35-1.24,4.92-2.09c0.61,0.11,1.25,0.18,1.91,0.18c5.52,0,10-3.58,10-8.14S17.52,2,12,2z' />
    </svg>
);

const ShareButton = styled.button`
    position: absolute;
    top: 50px;
    right: 22px;
    background-color: transparent;
    color: #282828;
    border: none;
    cursor: pointer;
    z-index: 10;

    &:hover {
        opacity: 0.7;
    }
`;

const BottomImage = styled.img`
    position: absolute;
    bottom: 0;
    width: 100vw;
    max-width: 600px;
    object-fit: contain;
`;

const LoginPage = () => {
    const navigate = useNavigate();
    const { isLoggedIn } = useAuthStore();

    const { setSnackbarOpen } = useSnackbarStore();

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (isLoggedIn && userId) {
            navigate(`/main/${userId}`);
        }
    }, []);

    const handleShare = async () => {
        try {
            await navigator.share({
                title: '⛄ 눈이 펑펑 내리는 추운 겨울,',
                text: ` 한 해의 추억을 돌아보며 자신만의 스노우볼을 만들어 볼까요? ⛄\n${import.meta.env.VITE_BASE_URL}`,
                // url: `${import.meta.env.VITE_BASE_URL}`,
            });
        } catch (err) {
            setSnackbarOpen({
                text: '공유하기를 지원하지 않는 브라우저입니다.',
                severity: 'error',
            });
        }
    };

    const handleButtonClick = () => {
        window.location.href = `${import.meta.env.VITE_API_URL}/oauth2/authorization/kakao`;
    };

    return (
        <>
            <Container>
                <Helmet>
                    {/* 동적으로 변경될 HTML Meta Tags */}
                    <title>스노로그 - 2024의 추억이 쌓이는 곳</title>
                    <meta
                        name='description'
                        content='스노로그에서 남은 2024의 추억을 쌓아보세요.'
                    />

                    {/* Open Graph 동적 Meta Tags */}
                    <meta
                        property='og:url'
                        content={`${import.meta.env.VITE_BASE_URL}/`}
                    />

                    {/* Twitter 동적 Meta Tags */}
                    <meta
                        property='twitter:url'
                        content={`${import.meta.env.VITE_BASE_URL}/`}
                    />
                </Helmet>

                <Title>Snow Log</Title>
                <SubTitle>
                    추억을 보관하고 공유받아
                    <br />
                    나만의 스노우볼을 완성해요
                </SubTitle>
                <ShareButton onClick={handleShare}>
                    <ShareIcon style={{ width: '33px', height: '33px' }} />
                </ShareButton>
                <KakaoButton onClick={handleButtonClick}>
                    <KakaoIcon>
                        <KakaoSVG />
                    </KakaoIcon>
                    카카오 로그인
                </KakaoButton>
                <BottomImage
                    src={'/assets/background_bottom.svg'}
                    alt='Snow background'
                />
            </Container>
            <Snowfall
                color='#ffffffaa'
                snowflakeCount={70}
                speed={[0, 0.5]}
                wind={[0, 0.5]}
                radius={[0.5, 3]}
            />
        </>
    );
};

export default LoginPage;
