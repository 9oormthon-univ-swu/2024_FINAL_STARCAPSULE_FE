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
    const [nickname, setNickname] = useState('닉네임');
    const [isPopupOpen, setPopupOpen] = useState(false);

    const param = useParams();

    const { setUserId } = useUserStore();

    // URL에서 토큰을 추출하여 로컬 스토리지에 저장하고, URL에서 토큰을 제거하는 함수
    const saveTokenAndRemoveFromURL = () => {
        const url = new URL(window.location.href);
        const token = url.searchParams.get('token');

        if (token) {
            // 로컬 스토리지에 토큰 저장
            localStorage.setItem('token', token);

            // URL에서 토큰 제거
            url.searchParams.delete('token');
            window.history.replaceState({}, document.title, url.pathname); // 페이지 리로드 없이 URL 갱신
        }
    };

    useEffect(() => {
        setPopupOpen(true);
        setUserId(param.userId);
        saveTokenAndRemoveFromURL();
    }, []);

    const { data, isLoading, error } = useSWR(
        // `${process.env.REACT_APP_API_URL}/api/capsule/90b0afad-9ab7-4650-b6cf-cd887c506c69?page=${page}`,
        'http://34.64.85.134:8888/api/capsule/199f3022-be24-4641-a907-0b10c1e730e8?page=1',
        defaultGetFetcher
    );

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

    console.log(data);

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
                    <MainTitle nickname={nickname} setNickname={setNickname} />
                </Stack>

                <Snowball
                    memories={data.result.memories}
                    current={page}
                    total={parseInt(data.result.total_page)}
                    received={data.result.received}
                    self={data.result.self}
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
