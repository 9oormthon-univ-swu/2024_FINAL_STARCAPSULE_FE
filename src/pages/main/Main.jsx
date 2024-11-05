import {
    Button,
    IconButton,
    Stack,
    styled,
    Typography,
    Portal,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import DDayTitle from './DDayTitle';
import MainTitle from './MainTitle';
import Snowball from './Snowball/Snowball';
import Layout from '@/layouts/Layout';
import useSWR from 'swr';
import { CalendarIcon } from '@/components/icons';
import PopupPage from '../Onboarding/PopupPage';
import { getDaysBeforeOpen } from '@/utils/getDaysBeforeOpen';
import PopupAfter from '../Onboarding/PopupAfter';
import { useParams } from 'react-router-dom';
import { useUserStore } from 'stores/useUserStore';
import { saveTokenFromURL } from '@/utils/saveTokenFromURL';
import useAuthStore from 'stores/useAuthStore';
import useAxiosWithAuth from '@/utils/useAxiosWithAuth';
import { useNavigate } from 'react-router-dom';
import '@dotlottie/player-component';
import ImgShareButton from '@/components/ImgShareButton';
import { Helmet } from 'react-helmet-async';
import { useSnackbarStore } from '@/stores/useSnackbarStore';
import { isRecordable } from '@/utils/isRecordable';
import dayjs from 'dayjs';

export const MainContainer = styled(Stack)(() => ({
    padding: '2rem 0 2.25rem 0',
    boxSizing: 'border-box',
    height: '100dvh',
    overflow: 'hidden',
    position: 'relative',
}));

const Overlay = styled('div')(() => ({
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
}));

const PopupContainer = styled('div')(() => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
}));

export const StyledButton = styled(Button)(({ theme }) => ({
    boxSizing: 'border-box',
    width: '100%',
    height: '3.875rem',
    backgroundColor: theme.palette.custom.button1,
    color: theme.palette.custom.white,
    borderRadius: '1.25rem',
    padding: '1.25rem 0',
    boxShadow: '0px 0px 4px 0px rgba(40, 40, 40, 0.20)',
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
    color: theme.palette.custom.grey,
    width: '1.5rem',
    height: '1.5rem',
}));

const Main = () => {
    const [isPopupOpen, setPopupOpen] = useState(false); // 팝업이 기본적으로 비활성화 상태로 시작
    const [showLottie, setShowLottie] = useState(false); // 로티 애니메이션도 비활성화 상태로 시작
    const [serverTime, setServerTime] = useState('');
    const navigate = useNavigate();

    const successMessage = '스노우볼 이름이 변경되었어요.';
    const errorMessage = '스노우볼 이름 변경에 실패했어요. 다시 시도해주세요.';

    const { setSnackbarOpen } = useSnackbarStore();
    const { setHasWritten } = useUserStore();

    const onError = () => {
        setSnackbarOpen({
            text: errorMessage,
            severity: 'error',
        });
    };

    const param = useParams();
    const { setUserId, hasWritten } = useUserStore();
    const { login } = useAuthStore();

    useEffect(() => {
        const lastPopupCheckedDate = localStorage.getItem('popupCheckedDate');
        const today = new Date().toLocaleDateString('ko-KR');

        if (lastPopupCheckedDate !== today) {
            setShowLottie(true); // 체크되지 않은 경우 로티와 팝업을 표시
            setPopupOpen(true);
        }
    }, []);

    useEffect(() => {
        saveTokenFromURL(login);
        setUserId(param.userId);
    }, []);

    const axiosInstance = useAxiosWithAuth();

    const snowballFetcher = (url) =>
        axiosInstance.get(url).then((res) => res.data.result.paginationData);

    const infoFetcher = (url) =>
        axiosInstance.get(url).then((res) => res.data.result);

    const questionFetcher = (url) =>
        axiosInstance
            .get(url)
            .then((res) => res.data.result)
            .then((data) => {
                const dateObj = dayjs(data.date);
                const formattedDate = dateObj.format(`MM월 DD일`);
                setServerTime(data.date);
                localStorage.setItem('dailyQuestion', data.question);
                localStorage.setItem('dailyDate', formattedDate);
                localStorage.setItem('dailyQuestionId', data.id);

                return data;
            });

    const { data: questionData, isLoading: isQuestionLoading } = useSWR(
        '/api/question',
        questionFetcher,
        {
            onError: (error) => {
                if (error.status === 400) setHasWritten(true); // 이후에 다른 이름으로 다시 수정...
            },
            onErrorRetry: false,
        }
    );

    const { data, isLoading, error, mutate } = useSWR(
        `${import.meta.env.VITE_API_URL}/api/capsule/${param.userId}/info`,
        infoFetcher,
        {
            onError: (error) => {
                console.error(error);
            },
        }
    );

    // 닉네임을 로컬 스토리지에 저장하는 useEffect
    useEffect(() => {
        if (data && data.snowballName) {
            localStorage.setItem('snowballName', data.snowballName);
        }
    }, [data]);

    const setSnowballName = async (newName) => {
        await axiosInstance
            .post(`/api/capsule/changeSnowballName`, null, {
                params: {
                    name: newName,
                },
            })
            .then(() => {
                setSnackbarOpen({
                    text: successMessage,
                    severity: 'success',
                });
                mutate();
            });
    };

    const daysLeft = getDaysBeforeOpen(serverTime);

    const onMemoryClick = (memoryId, objectName) => {
        console.log('Clicked memory ID:', memoryId); // 콘솔 출력 추가
        const userId = param.userId;
        const allowedDate = new Date('2024-12-31');
        const currentDate = new Date();

        if (currentDate < allowedDate) {
            setSnackbarOpen({
                text: '모든 추억은 12월 31일에 공개됩니다!',
                severity: 'present',
            });
            return;
        }

        // object_name에 따라 페이지 이동을 다르게 설정
        const recordObjects = [
            'christmas_tree',
            'gingerbread_house',
            'lamplight',
            'santa_sleigh',
        ];
        const guestObjects = ['moon', 'santa', 'snowflake', 'snowman'];

        if (recordObjects.includes(objectName)) {
            navigate(`/recordafter/${userId}/${memoryId}`);
        } else if (guestObjects.includes(objectName)) {
            navigate(`/guestafter/${userId}/${memoryId}`);
        } else {
            console.error('Unknown object_name:', objectName);
        }
    };

    const onRecordClick = () => {
        navigate(`/record/${param.userId}`);
    };

    const handleLottieClick = () => {
        setShowLottie(false); //로티 클릭하면 팝업 나타남
        setPopupOpen(true);
    };

    const recordable = isRecordable(2024, serverTime);

    if (error) return <div>failed to load</div>;

    return (
        <div id='capture-container'>
            <Helmet>
                <title>스노로그 - 2024의 추억이 쌓이는 곳</title>
                <meta
                    name='description'
                    content='스노로그에서 남은 2024의 추억을 쌓아보세요.'
                />
                <meta
                    property='og:title'
                    content='스노로그 - 2024의 추억이 쌓이는 곳'
                />
                <meta
                    property='og:description'
                    content='스노로그에서 남은 2024의 추억을 쌓아보세요.'
                />
                <meta property='og:type' content='website' />
            </Helmet>
            <Layout sx={{ overflow: 'hidden' }} snow snowflake>
                <MainContainer
                    direction={'column'}
                    justifyContent={'space-between'}
                    alignContent={'center'}
                    spacing={1}
                >
                    <Stack
                        direction={'column'}
                        spacing={1}
                        sx={{ flexGrow: 2 }}
                    >
                        <Stack
                            direction={'row'}
                            justifyContent={'space-between'}
                            alignItems={'center'}
                        >
                            <DDayTitle />
                            <Stack direction={'row'} spacing={2}>
                                <StyledIconButton
                                    onClick={() =>
                                        navigate(`/calendar/${param.userId}`)
                                    }
                                >
                                    <CalendarIcon />
                                </StyledIconButton>
                                <ImgShareButton
                                    title={
                                        '스노우볼에 오늘의 추억이 보관되었어요!\nSNS에 링크를 공유해친구들에게 함께한 추억을 전달받아보세요☃️\n'
                                    }
                                    url={`${import.meta.env.BASE_URL}/guest/${param.userId}`}
                                />
                            </Stack>
                        </Stack>

                        <MainTitle
                            snowball={data?.snowballName || ''}
                            setSnowballName={setSnowballName}
                            onError={onError}
                        />
                    </Stack>

                    <Snowball
                        isLoading={isLoading}
                        received={data?.receivedCount}
                        self={data?.selfCount}
                        onMemoryClick={onMemoryClick}
                        fetcher={snowballFetcher}
                    />
                    {daysLeft ? (
                        <StyledButton
                            variant={'contained'}
                            sx={{
                                flexGrow: 0,
                            }}
                            disabled={hasWritten}
                        >
                            <Typography variant='title2'>
                                추억 전달하기
                            </Typography>
                        </StyledButton>
                    ) : (
                        <Stack
                            direction={'row'}
                            justifyContent={'space-between'}
                            spacing={'1rem'}
                            sx={{
                                flexGrow: 0,
                            }}
                        >
                            <StyledButton
                                variant={'contained'}
                                sx={{ flexGrow: 1, width: 'fit-content' }}
                            >
                                <Typography variant='title2'>
                                    팀 소개
                                </Typography>
                            </StyledButton>
                            <StyledButton
                                variant={'contained'}
                                sx={{ flexGrow: 2, width: 'fit-content' }}
                                onClick={onRecordClick}
                                disabled={hasWritten}
                            >
                                <Typography variant='title2'>
                                    추억 보관하기
                                </Typography>
                            </StyledButton>
                        </Stack>
                    )}
                </MainContainer>
                {recordable && !isQuestionLoading && (
                    // 기록이 가능한 경우 팝업 페이지를 보여줌(12월 31일 포함)
                    <PopupPage
                        isOpen={isPopupOpen && !hasWritten}
                        onClose={() => setPopupOpen(false)}
                        question={questionData.question}
                        date={questionData.date}
                    />
                )}
                {(!recordable || !daysLeft) &&
                    (showLottie ? (
                        // 기록이 불가능한 경우 또는 31일 당일에 Lottie 또는 PopupAfter를 보여줌
                        <Portal
                            container={document.getElementById(
                                'capture-container'
                            )}
                        >
                            <Overlay onClick={handleLottieClick}>
                                <PopupContainer>
                                    <dotlottie-player
                                        src='https://lottie.host/e35fc1c8-f985-4963-940e-0e4e0b630cd9/eNIuonSNHz.json'
                                        background='transparent'
                                        speed='1'
                                        style={{
                                            width: '350px',
                                            height: '350px',
                                        }}
                                        loop
                                        autoplay
                                    ></dotlottie-player>
                                </PopupContainer>
                            </Overlay>
                        </Portal>
                    ) : (
                        <Portal
                            container={document.getElementById(
                                'capture-container'
                            )}
                        >
                            <PopupAfter
                                isOpen={isPopupOpen}
                                onClose={() => setPopupOpen(false)}
                            />
                        </Portal>
                    ))}
            </Layout>
        </div>
    );
};

export default Main;
