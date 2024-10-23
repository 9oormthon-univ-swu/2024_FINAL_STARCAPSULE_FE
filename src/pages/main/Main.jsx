import {
    Button,
    IconButton,
    Skeleton,
    Stack,
    styled,
    Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import DDayTitle from './DDayTitle';
import MainTitle from './MainTitle';
import Snowball from './Snowball/Snowball';
import Layout from '@/layouts/Layout';
import useSWR from 'swr';
import { CalendarIcon } from '@/components/icons';
import ShareButton from '@/components/ShareButton';
import { getDaysBeforeOpen } from '@/utils/getDaysBeforeOpen';
import PopupPage from '../Onboarding/PopupPage';
import PopupAfter from '../Onboarding/PopupAfter';
import { useParams } from 'react-router-dom';
import { useUserStore } from 'stores/useUserStore';
import { saveTokenFromURL } from '@/utils/saveTokenFromURL';
import useAuthStore from 'stores/useAuthStore';
import useAxiosWithAuth from '@/utils/useAxiosWithAuth';
import { useNavigate } from 'react-router-dom';
import SnackBar from '@/components/SnackBar';
import { defaultGetFetcher } from '@/utils/getFetcher';
import "@dotlottie/player-component"; 

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
    const [page, setPage] = useState(1);
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [showLottie, setShowLottie] = useState(true); 
    const navigate = useNavigate();
    const [snackbarProps, setSnackbarProps] = useState({
        openSnackbar: false,
        snackbarText: '',
        severity: '',
    });

    const successMessage = '스노우볼 이름이 변경되었어요.';
    const errorMessage = '스노우볼 이름 변경에 실패했어요. 다시 시도해주세요.';

    const onError = () => {
        setSnackbarProps({
            openSnackbar: true,
            snackbarText: errorMessage,
            severity: 'error',
        });
    };

    const param = useParams();
    const { setUserId } = useUserStore();
    const { login } = useAuthStore();

    useEffect(() => {
        setPopupOpen(true);
        setUserId(param.userId);
        saveTokenFromURL(login);
    }, [login, param.userId, setUserId]);

    const { data, isLoading, error, mutate } = useSWR(
        `${import.meta.env.VITE_API_URL}/api/capsule/${param.userId}?page=${page}`,
        defaultGetFetcher,
        {
            onError: (error) => {
                console.error(error);
            },
        }
    );

    // 닉네임을 로컬 스토리지에 저장하는 useEffect
    useEffect(() => {
        if (data && data.snowball_name) {
            localStorage.setItem('snowballName', data.snowball_name);
        }
    }, [data]);

    const axiosInstance = useAxiosWithAuth();
    const setSnowballName = async (newName) => {
        await axiosInstance
            .post(`/api/capsule/changeSnowballName`, null, {
                params: {
                    name: newName,
                },
            })
            .then(() => {
                setSnackbarProps({
                    openSnackbar: true,
                    snackbarText: successMessage,
                    severity: 'success',
                });
                mutate();
            });
    };

    const daysLeft = getDaysBeforeOpen(data?.server_time);

    const onLeftClick = () => {
        setTimeout(
            setPage((prev) => (prev === 1 ? 1 : prev - 1)),
            500
        );
    };

    const onRightClick = () => {
        setTimeout(
            setPage((prev) =>
                prev === data?.total_page ? data?.total_page : prev + 1
            ),
            500
        );
    };

    const onRecordClick = () => {
        navigate(`/record/${param.userId}`);
    };

    const handleLottieClick = () => {
        setShowLottie(false); //로티 클릭하면 팝업 나타남
        setPopupOpen(true); 
    };

    if (error) return <div>failed to load</div>;

    return (
        <Layout sx={{ overflow: 'hidden' }} snow snowflake>
            <MainContainer
                direction={'column'}
                justifyContent={'space-between'}
                alignContent={'center'}
                spacing={1}
            >
                <Stack direction={'column'} spacing={1} sx={{ flexGrow: 2 }}>
                    <Stack
                        direction={'row'}
                        justifyContent={'space-between'}
                        alignItems={'center'}
                    >
                        <DDayTitle />
                        <Stack direction={'row'} spacing={2}>
                            <StyledIconButton>
                                <CalendarIcon
                                    onClick={() => navigate('/calendar')}
                                />
                            </StyledIconButton>
                            <ShareButton
                                title={
                                    '스노우볼에 오늘의 추억이 보관되었어요!\nSNS에 링크를 공유해 친구들에게 함께한 추억을 전달받아보세요☃️\n'
                                }
                                url={`${import.meta.env.BASE_URL}/guest/${param.userId}`}
                            />
                        </Stack>
                    </Stack>

                    {isLoading ? (
                        <Skeleton variant='text'>
                            <MainTitle
                                snowball={data?.snowball_name ?? ''}
                                setSnowballName={setSnowballName}
                                onError={onError}
                            />
                        </Skeleton>
                    ) : (
                        <MainTitle
                            snowball={data?.snowball_name ?? ''}
                            setSnowballName={setSnowballName}
                            onError={onError}
                        />
                    )}
                </Stack>

                <Snowball
                    isLoading={isLoading}
                    memories={data?.memories}
                    current={page}
                    total={isLoading ? 0 : parseInt(data.total_page)}
                    received={data?.received}
                    self={data?.self}
                    onLeftClick={onLeftClick}
                    onRightClick={onRightClick}
                />
                {daysLeft ? (
                    <StyledButton
                        variant={'contained'}
                        sx={{
                            flexGrow: 0,
                        }}
                    >
                        <Typography variant='title2'>추억 전달하기</Typography>
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
                            <Typography variant='title2'>팀 소개</Typography>
                        </StyledButton>
                        <StyledButton
                            variant={'contained'}
                            sx={{ flexGrow: 2, width: 'fit-content' }}
                            onClick={onRecordClick}
                        >
                            <Typography variant='title2'>
                                추억 보관하기
                            </Typography>
                        </StyledButton>
                    </Stack>
                )}
            </MainContainer>
            <PopupPage isOpen={isPopupOpen} onClose={() => setPopupOpen(false)} />
            <SnackBar
                {...snackbarProps}
                handleCloseSnackbar={() =>
                    setSnackbarProps((prev) => ({
                        ...prev,
                        openSnackbar: false,
                    }))
                }
            />
        </Layout>
    );
};

export default Main;
