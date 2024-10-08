import { Button, IconButton, Stack, styled, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import DDayTitle from './DDayTitle';
import MainTitle from './MainTitle';
import Snowball from './Snowball/Snowball';
import Layout from '@/layouts/Layout';
import useSWR from 'swr';
import { CalendarIcon } from '@/components/icons';
import ShareButton from '@/components/ShareButton';
import Loading from '@/components/Loading';
import { getDaysBeforeOpen } from '@/utils/getDaysBeforeOpen';
import PopupPage from '../Onboarding/PopupPage';
import { useParams } from 'react-router-dom';
import { useUserStore } from 'stores/useUserStore';
import { defaultGetFetcher } from '@/utils/getFetcher';
import { saveTokenFromURL } from '@/utils/saveTokenFromURL';
import useAuthStore from 'stores/useAuthStore';
import useAxiosWithAuth from '@/utils/useAxiosWithAuth';
// import axios from 'axios';

export const MainContainer = styled(Stack)(() => ({
    padding: '1rem 0 2.25rem 0',
    boxSizing: 'border-box',
    flexGrow: 2,
    height: '100dvh',
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
    // eslint-disable-next-line no-unused-vars
    const [page, setPage] = useState(1);
    const [isPopupOpen, setPopupOpen] = useState(false);

    const param = useParams();

    const { setUserId } = useUserStore();

    const { login } = useAuthStore(); // useAuthStorㅌe에서 login 메서드 가져오기

    useEffect(() => {
        setPopupOpen(true);
        setUserId(param.userId);
        saveTokenFromURL(login); // URL에서 토큰을 추출하고 상태에 저장
    }, [login, param.userId, setUserId]);

    const { data, isLoading, error, mutate } = useSWR(
        `${process.env.REACT_APP_API_URL}/api/capsule/${param.userId}?page=${page}`,
        defaultGetFetcher
    );

    const axiosInstance = useAxiosWithAuth();
    const setSnowballName = async (newName) => {
        await axiosInstance
            .post(`/api/capsule/changeSnowballName`, null, {
                params: {
                    name: newName, // 새로 입력한 닉네임을 API로 전송
                },
            })
            .then(() => {
                mutate();
            });
        // 성공 시 처리할 로직 추가 가능
    };

    const daysLeft = getDaysBeforeOpen();

    const onLeftClick = () => {
        setPage((prev) => (prev === 1 ? 1 : prev - 1));
    };

    const onRightClick = () => {
        setPage((prev) =>
            prev === data.capsule.total_page
                ? data.capsule.total_page
                : prev + 1
        );
    };

    if (isLoading) return <Loading />;
    if (error) return <div>failed to load</div>;

    return (
        <Layout sx={{ overflow: 'hidden' }} snow>
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
                                <CalendarIcon />
                            </StyledIconButton>
                            <ShareButton
                                title={
                                    '스노우볼에 오늘의 추억이 보관되었어요!\nSNS에 링크를 공유해 친구들에게 함께한 추억을 전달받아보세요☃️\n'
                                }
                                url={'www.google.com'}
                            />
                        </Stack>
                    </Stack>
                    <MainTitle
                        snowball={data.snowball_name}
                        setSnowballName={setSnowballName}
                    />
                </Stack>

                <Snowball
                    memories={data.memories}
                    current={page}
                    total={parseInt(data.total_page)}
                    received={data.received}
                    self={data.self}
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
                        >
                            <Typography variant='title2'>
                                추억 보관하기
                            </Typography>
                        </StyledButton>
                    </Stack>
                )}
            </MainContainer>
            <PopupPage
                isOpen={isPopupOpen}
                onClose={() => setPopupOpen(false)}
            />{' '}
            {/* 팝업 추가 */}
        </Layout>
    );
};

export default Main;
