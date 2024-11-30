import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import styled from 'styled-components';
import Snowfall from 'react-snowfall';
import axios from 'axios';
import '@dotlottie/player-component';
import useAuthStore from 'stores/useAuthStore';
import { saveTokenFromURL } from '@/utils/saveTokenFromURL';

const FullScreenSnowfall = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    pointer-events: none;
    z-index: 0;
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
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
    bottom: 300px;
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
    height: 100vh;
    bottom: -335px;
    width: 100vw;
    max-width: 600px;
    object-fit: contain;
`;

const SnowballPage = () => {
    const navigate = useNavigate();
    const { login } = useAuthStore();

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
                    console.log(response);
                    const snowballData = response.data.result;

                    // 응답 데이터를 로그로 출력해서 확인
                    //console.log('응답 데이터:', snowballData);

                    // 응답 데이터가 올바르게 존재하는지 확인하고 로컬 스토리지에 저장
                    console.log(snowballData);
                    // if (
                    //     snowballData &&
                    //     snowballData.id &&
                    //     snowballData.snowball_name &&
                    //     snowballData.shared_link
                    // ) {
                    localStorage.setItem(
                        'snowball_name',
                        snowballData.snowball_name
                    );
                    //console.log('로컬 스토리지에 저장 완료');
                    // }

                    // 메인 페이지로 이동
                    window.location.href = `${snowballData.shared_link}?page=1`;
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

                {/* Lottie 애니메이션 추가 */}
                <dotlottie-player
                    src='https://lottie.host/a61cf0d6-677a-49e6-9281-13c0fd97b35a/NkiF3jmTpw.lottie'
                    background='transparent'
                    speed='1'
                    style={{
                        width: '300px',
                        height: '300px',
                        position: 'absolute',
                        bottom: '410px',
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
