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
import useSWR, { mutate } from 'swr';
import { CalendarIcon, ShareIcon } from '@/components/icons';
import PopupPage from '../Onboarding/PopupPage';
import PopupAfter from '../Onboarding/PopupAfter';
import { useParams, useSearchParams } from 'react-router-dom';
import { useUserStore } from 'stores/useUserStore';
import useAuthStore from 'stores/useAuthStore';
import useAxiosWithAuth from '@/utils/useAxiosWithAuth';
import { useNavigate } from 'react-router-dom';
import '@dotlottie/player-component';
import { Helmet } from 'react-helmet-async';
import { useSnackbarStore } from '@/stores/useSnackbarStore';
import { isRecordable } from '@/utils/isRecordable';
import dayjs from 'dayjs';
import ShareModal from '@/components/ShareModal';
import RecommendModal from '@/components/RecommendModal';
import PWAModalContent from './PWAModalContent';
import useModal from '@/hooks/useModal';
import {
    isGuestObject,
    recordObjects,
    guestObjects,
} from '@/utils/isGuestObjects';

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
    width: '100% !important',
    height: '3.875rem',
    backgroundColor: theme.palette.custom.button1,
    borderRadius: '1.25rem',
    padding: '1.25rem 0',
    boxShadow: '0px 0px 4px 0px rgba(40, 40, 40, 0.20)',
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
    color: theme.palette.custom.font,
    width: '1.5rem',
    height: '1.5rem',
}));

const Main = () => {
    const [isPopupOpen, setPopupOpen] = useState(false); // 팝업이 기본적으로 비활성화 상태로 시작
    const [showLottie, setShowLottie] = useState(false); // 로티 애니메이션도 비활성화 상태로 시작
    const [serverTime, setServerTime] = useState('');
    const [recordable, setRecordable] = useState(false);
    const [openShareModal, setOpenShareModal] = useState(false);
    const [searchParams] = useSearchParams();
    const page = parseInt(searchParams.get('page') || 1);

    const pwa = searchParams.get('pwa') === 'true';

    const navigate = useNavigate();

    const successMessage = '스노우볼 이름이 변경되었어요.';
    const errorMessage = '스노우볼 이름 변경에 실패했어요. 다시 시도해주세요.';

    const { setSnackbarOpen } = useSnackbarStore();
    const { setHasWritten } = useUserStore();

    const {
        openModal: openRecommendModal,
        closeModal: closeRecommendModal,
        isOpen: isRecommendOpen,
    } = useModal();

    const handleInstall = () => {
        if (window.deferredPrompt) {
            window.deferredPrompt.prompt();
            window.deferredPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    localStorage.setItem('doNotShowPWA', 'true');
                }
            });
        }
        closeRecommendModal();
    };

    const onCloseRecommendModal = () => {
        localStorage.setItem('doNotShowPWA', 'true');
        closeRecommendModal();
    };

    const onError = () => {
        setSnackbarOpen({
            text: errorMessage,
            severity: 'error',
        });
    };

    const param = useParams();
    const { hasWritten } = useUserStore();
    const { isLoggedIn } = useAuthStore();

    useEffect(() => {
        if (serverTime) {
            const lastPopupCheckedDate =
                localStorage.getItem('popupCheckedDate');
            const today = dayjs
                .utc(serverTime)
                .tz('Asia/Seoul')
                .format('YYYY. MM. DD.');

            if (lastPopupCheckedDate !== today) {
                setShowLottie(true);
                setPopupOpen(true);
            }
        }
    }, [serverTime]);

    const axiosInstance = useAxiosWithAuth();

    const snowballFetcher = (url) =>
        axiosInstance.get(url).then((res) => {
            setServerTime(res.data.result.paginationData.server_time);
            setRecordable(
                isRecordable(2024, res.data.result.paginationData.server_time)
            );
            return res.data.result.paginationData;
        });

    const infoFetcher = (url) =>
        axiosInstance.get(url).then((res) => {
            localStorage.setItem('snowballName', res.data.result.snowballName);
            const receivedCount = localStorage.getItem('receivedCount') || 0;
            if (receivedCount < res.data.result.receivedCount) {
                setSnackbarOpen({
                    text: '스노우볼에 새로운 추억이 도착했어요! 지금 확인해보세요.',
                    severity: 'present',
                });
            }
            localStorage.setItem(
                'receivedCount',
                res.data.result.receivedCount
            );
            return res.data.result;
        });

    const questionFetcher = (url) =>
        axiosInstance
            .get(url)
            .then((res) => res.data.result)
            .then((data) => {
                setHasWritten(false);
                const dateObj = dayjs.utc(data.date).tz('Asia/Seoul');
                const formattedDate = dateObj.format(`MM월 DD일`);
                localStorage.setItem('dailyQuestion', data.question);
                localStorage.setItem('dailyDate', formattedDate);
                localStorage.setItem('dailyQuestionId', data.id);

                return data;
            });

    const { data: questionData, isLoading: isQuestionLoading } = useSWR(
        isLoggedIn ? '/api/question' : null,
        questionFetcher,
        {
            onError: (error) => {
                if (error.status === 400 || error.status === 404)
                    setHasWritten(true);
            },
            revalidateOnMount: true,
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
            onErrorRetry: (error) => {
                if (error.status === 404 || error.status === 400) return;
            },
        }
    );

    const { data, isLoading, error } = useSWR(
        `${import.meta.env.VITE_API_URL}/api/capsule/${param.userId}/info`,
        infoFetcher,
        {
            onError: (error) => {
                if (error.status === 404) {
                    setSnackbarOpen({
                        text: '다른 사람의 스노우볼입니다. 다시 로그인 해주세요.',
                        severity: 'error',
                    });
                    localStorage.clear();
                    navigate('/');
                }
            },
        }
    );

    // 닉네임 수정
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
                mutate(
                    `${import.meta.env.VITE_API_URL}/api/capsule/${param.userId}/pagination?page=${page}`
                );
                mutate(
                    `${import.meta.env.VITE_API_URL}/api/capsule/${param.userId}/info`
                );
            });
    };

    const onMemoryClick = (memoryId, objectName) => {
        const userId = param.userId;

        const isGuest = isGuestObject(objectName);

        if (recordable && !isGuest) {
            setSnackbarOpen({
                text: '나의 추억은 12월 31일에 공개됩니다!',
                severity: 'present',
            });
            return;
        }

        if (recordObjects.includes(objectName)) {
            navigate(`/recordafter/${userId}/${memoryId}`);
        } else if (guestObjects.includes(objectName)) {
            navigate(`/guestafter/${userId}/${memoryId}`);
        }
    };

    const handleLottieClick = () => {
        setShowLottie(false); //로티 클릭하면 팝업 나타남
        setPopupOpen(true);
    };

    if (error) return <div>failed to load</div>;

    const onCloseShareModal = () => {
        setOpenShareModal(false);
    };

    return (
        <>
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
            <Layout
                id='capture-container'
                sx={{ overflow: 'hidden' }}
                snow
                snowflake
            >
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
                            <DDayTitle serverTime={serverTime} />
                            <Stack direction={'row'} spacing={2}>
                                <StyledIconButton
                                    onClick={() =>
                                        navigate(`/calendar/${param.userId}`)
                                    }
                                >
                                    <CalendarIcon />
                                </StyledIconButton>
                                <StyledIconButton
                                    onClick={() => setOpenShareModal(true)}
                                >
                                    <ShareIcon />
                                </StyledIconButton>
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
                    {recordable ? (
                        <StyledButton
                            variant={'contained'}
                            sx={{
                                flexGrow: 0,
                            }}
                            disabled={hasWritten}
                            onClick={() => navigate(`/record/${param.userId}`)}
                        >
                            <Typography
                                variant='title2'
                                sx={{ color: 'custom.white' }}
                            >
                                추억 보관하기
                            </Typography>
                        </StyledButton>
                    ) : (
                        <StyledButton
                            variant={'contained'}
                            sx={{ flexGrow: 0, width: 'fit-content' }}
                        >
                            <Typography
                                variant='title2'
                                sx={{ color: 'custom.white' }}
                            >
                                팀 소개
                            </Typography>
                        </StyledButton>
                    )}
                </MainContainer>
                {recordable && !isQuestionLoading && !hasWritten && (
                    <PopupPage
                        isOpen={isPopupOpen}
                        onClose={() => {
                            setPopupOpen(false);
                            if (pwa) {
                                openRecommendModal();
                            }
                        }}
                        question={questionData.question}
                        serverTime={serverTime}
                    />
                )}
                {!recordable &&
                    (showLottie ? (
                        // 기록이 불가능한 경우 로티 애니메이션을 보여줌
                        <Portal
                            container={document.getElementById(
                                'capture-container'
                            )}
                        >
                            <Overlay onClick={handleLottieClick}>
                                <PopupContainer>
                                    <dotlottie-player
                                        src='https://lottie.host/20d594fd-7218-4f0c-922b-b2f1813bc830/04Zv0OPssa.lottie'
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
                                onClose={() => {
                                    setPopupOpen(false);
                                    if (pwa) {
                                        console.log('test');
                                        openRecommendModal();
                                    }
                                }}
                            />
                        </Portal>
                    ))}
            </Layout>
            <ShareModal
                open={openShareModal}
                onClose={onCloseShareModal}
                url={`${import.meta.env.VITE_BASE_URL}/main/${param.userId}`}
            />
            <RecommendModal
                open={isRecommendOpen}
                onClose={onCloseRecommendModal}
                onButtonClick={handleInstall}
                buttonText={'홈 화면에 스노로그 추가하기'}
            >
                <PWAModalContent />
            </RecommendModal>
        </>
    );
};

export default Main;
