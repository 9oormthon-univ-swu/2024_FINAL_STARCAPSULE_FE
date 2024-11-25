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
    height: 100vh;
    width: 100vw;
    max-width: 600px;
    background: linear-gradient(180deg, #0b0a1b 0%, #27405e 100%);
    position: relative;
    overflow: hidden;
    margin: 0 auto;
    background-color: white;
`;

const Title = styled.h1`
    font-family: 'Rage';
    src: url('/assets/fonts/RAGE_1.TTF') format('truetype');
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
    color: #fff;
    position: absolute;
    top: 270px;
    transform: translateX(-50%);
    left: 185px;
    line-height: 1.4;
    margin: 5px 0;
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
    color: #d5d1cd;
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
    height: 100vh;
    bottom: -335px;
    width: 100vw;
    max-width: 600px;
    object-fit: contain;
`;

const LoginPage = () => {
    const navigate = useNavigate();

    const getTokenFromURL = () => {
        const token = new URL(window.location.href).searchParams.get('token');
        if (token) {
            localStorage.setItem('token', token);
            navigate('/main');
        }
    };

    useEffect(() => {
        getTokenFromURL();
    }, []);

<<<<<<< HEAD
=======
    const checkNotificationPermission = async () => {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
            if (!localStorage.getItem('notificationGranted')) {
                setOpenPWA(true); // 알림 권한을 처음 허용한 경우에만 모달을 띄운다
                localStorage.setItem('notificationGranted', 'true'); // 알림 허용 상태를 기록
            }
            await getDeviceToken();
        } else {
            console.log('알림 권한이 거부되었습니다.');
        }
    };

    const getDeviceToken = async () => {
        try {
            const currentToken = await getToken(messaging, {
                vapidKey:
                    'BNBLWswHiYVgBr4Y9xwgAbUgx8xIb6nj66gCGn0SYkq8zZ0kneMi9Uudb7o9CJ2ADXnRn1IBtArREBi4ffSmgSU',
            });
            if (currentToken) {
                // 토큰을 서버로 전송하거나 UI 업데이트
                console.log('토큰:', currentToken);
            } else {
                console.log(
                    '토큰을 가져오지 못했습니다. 권한을 다시 요청하세요.'
                );
            }
        } catch (err) {
            console.error('토큰을 가져오는 중 에러 발생:', err);
        }
    };

>>>>>>> a24c6e9d57b4d83672280daeb06079397071dd6f
    const handleShare = async () => {
        try {
            await navigator.share({
                title: 'Snow Log',
                text: '스노우볼에 오늘의 추억을 공유해보세요!',
                url: 'http://localhost:3000',
            });
            console.log('공유되었습니다!');
        } catch (err) {
            console.error('공유 실패:', err);
        }
    };

    const handleButtonClick = () => {
        window.location.href =
            'http://34.64.85.134:8888/oauth2/authorization/kakao';
    };

    return (
<<<<<<< HEAD
        <Container>
            <Helmet>
                <title>스노로그 - 로그인 화면</title>
                <meta
                    name='description'
                    content='스노로그를 카카오 계정으로 로그인하세요.'
=======
        <>
            <Container>
                <Helmet>
                    <title>스노로그 - 로그인 화면</title>
                    <meta
                        name='description'
                        content='스노로그를 카카오 계정으로 로그인하세요.'
                    />
                    <meta property='og:title' content='SnowLog 로그인 화면' />
                    <meta
                        property='og:description'
                        content='스노로그를 카카오 계정으로 로그인하세요.'
                    />
                    <meta property='og:type' content='website' />
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
>>>>>>> a24c6e9d57b4d83672280daeb06079397071dd6f
                />
                <meta property='og:title' content='SnowLog 로그인 화면' />
                <meta
                    property='og:description'
                    content='스노로그를 카카오 계정으로 로그인하세요.'
                />
                <meta property='og:type' content='website' />
            </Helmet>
            <Snowfall
                color='#ffffffaa'
                snowflakeCount={70}
                speed={[0, 0.5]}
                wind={[0, 0.5]}
                radius={[0.5, 3]}
            />
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
    );
};

export default LoginPage;