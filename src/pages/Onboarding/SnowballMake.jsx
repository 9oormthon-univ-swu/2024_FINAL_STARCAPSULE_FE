import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import styled from 'styled-components';
import Snowfall from 'react-snowfall';
import axios from 'axios';
import '@dotlottie/player-component';
import useAuthStore from 'stores/useAuthStore';
import { saveTokenFromURL } from '@/utils/saveTokenFromURL';
import { useUserStore } from '@/stores/useUserStore';

const FullScreenSnowfall = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100dvh;
    pointer-events: none;
    z-index: 0;
`;

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
    z-index: 1;
`;

const SubTitle = styled.p`
    font-size: 19px;
    font-family: 'Noto Sans';
    color: #5a5a5a;
    font-weight: 700;
    position: absolute;
    bottom: 40%;
    transform: translateX(-50%);
    left: 50%;
    white-space: nowrap;
    line-height: 1.5;
`;

const Button = styled.button`
    display: inline-flex;
    height: 62px;
    padding: 20px 109px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
    border: none;
    border-radius: 20px;
    background: var(--main2, #6485cf);
    box-shadow: 0px 0px 4px 0px rgba(40, 40, 40, 0.2);
    font-size: 16px;
    font-weight: bold;
    color: #fffcfa;
    cursor: pointer;
    position: absolute;
    bottom: 40px;
    z-index: 10;
`;

const BottomImage = styled.img`
    position: absolute;
    bottom: 0;
    height: 100dvh;
    bottom: -335px;
    width: 100vw;
    max-width: 600px;
    object-fit: contain;
`;

const SnowballPage = () => {
    const navigate = useNavigate();
    const { login } = useAuthStore();
    const { setUserId } = useUserStore();

    useEffect(() => {
        saveTokenFromURL(login);
    }, [login]);
    // 버튼 클릭 시 스노우볼 생성 API 호출
    const handleCreateSnowball = () => {
        const token = localStorage.getItem('token');
        const snowballAPI = `${import.meta.env.VITE_API_URL}/api/capsule`;
        if (token) {
            axios
                .post(
                    snowballAPI,
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`, // Authorization 헤더에 토큰 포함
                        },
                    }
                )
                .then((response) => {
                    const snowballData = response.data.result;
                    console.log(snowballData);
                    localStorage.setItem(
                        'snowball_name',
                        snowballData.snowball_name
                    );
                    setUserId(snowballData.userId);
                    navigate(`/main/${snowballData.userId}?page=1`);
                })
                .catch((error) => {
                    //console.error('스노우볼 생성 실패:', error);
                });
        } else {
            //console.error('토큰이 URL에 없습니다');
        }
    };

    return (
        <>
            <FullScreenSnowfall>
                <Snowfall
                    color='#ffffffaa'
                    snowflakeCount={70}
                    speed={[0, 0.5]}
                    wind={[0, 0.5]}
                    radius={[0.5, 3]}
                />
            </FullScreenSnowfall>
            <Container>
                <Snowfall
                    color='#ffffffaa'
                    snowflakeCount={70}
                    speed={[0, 0.5]}
                    wind={[0, 0.5]}
                    radius={[0.5, 3]}
                />

              
                <dotlottie-player
                    src='https://lottie.host/a61cf0d6-677a-49e6-9281-13c0fd97b35a/NkiF3jmTpw.lottie'
                    background='transparent'
                    speed='1'
                    style={{
                        width: '290px',
                        height: '290px',
                        position: 'absolute',
                        bottom: '50%',
                        left: '50%',
                        transform: 'translateX(-50%)',
                    }}
                    loop
                    autoplay
                ></dotlottie-player>

                <SubTitle>
                    질문에 대한 답변을 매일 작성하고
                    <br />
                    주변 사람들에게 추억을 전달받아요
                </SubTitle>

                <Button onClick={handleCreateSnowball}>스노우볼 만들기</Button>

                <BottomImage
                    src={'/assets/background_bottom.svg'}
                    alt='Snow background'
                />
            </Container>
        </>
    );
};

export default SnowballPage;
