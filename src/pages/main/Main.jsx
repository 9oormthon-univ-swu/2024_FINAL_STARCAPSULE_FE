import { Button, IconButton, Stack, styled, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import DDayTitle from './DDayTitle';
import MainTitle from './MainTitle';
import Snowball from './Snowball/Snowball';
import { ObjectNames } from '@/constants/ObjectNames';
import Layout from '@/layouts/Layout';
import useSWR from 'swr';
import { CalendarIcon } from '@/components/icons';
import ShareButton from '@/components/ShareButton';
import Loading from '@/components/Loading';
import { getDaysBeforeOpen } from '@/utils/getDaysBeforeOpen';
import PopupPage from '../Onboarding/PopupPage';

// 임시 적용 데이터
const memories = [
    { id: 1, writer_name: '닉네임', object_name: ObjectNames.SNOWMAN },
    { id: 2, writer_name: '닉네임', object_name: ObjectNames.SNOWMAN },
    { id: 3, writer_name: '닉네임', object_name: ObjectNames.MOON },
    { id: 4, writer_name: '닉네임', object_name: ObjectNames.SANTA },
    { id: 5, writer_name: '닉네임', object_name: ObjectNames.SNOWFLAKE },
    { id: 6, writer_name: '닉네임', object_name: ObjectNames.SANTA_SLEIGH },
];

const getData = async (url) => {
    console.log(`fetching page ${url}`);
    return {
        capsule: {
            id: 1,
            snowball_name: '나의 캡슐',
            received: 15,
            self: 3,
            page: parseInt(url),
            total_page: 5,
            memories: memories,
        },
    };
};

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
    const [page, setPage] = useState(1);
    const [nickname, setNickname] = useState('닉네임');
    const { data, isLoading } = useSWR(`${page}`, getData);
    const [isPopupOpen, setPopupOpen] = useState(false);

    // URL에서 토큰을 추출하여 로컬 스토리지에 저장하고, URL에서 토큰을 제거하는 함수
    const saveTokenAndRemoveFromURL = () => {
        const url = new URL(window.location.href);
        const token = url.searchParams.get('token');

        if (token) {
            // 로컬 스토리지에 토큰 저장
            localStorage.setItem('token', token);
            console.log('토큰이 저장되었습니다:', token);

            // URL에서 토큰 제거
            url.searchParams.delete('token');
            window.history.replaceState({}, document.title, url.pathname); // 페이지 리로드 없이 URL 갱신
            console.log('URL에서 토큰이 제거되었습니다');
        }
    };

    useEffect(() => {
        setPopupOpen(true);

        // 로컬 스토리지에서 저장된 닉네임 (snowball_name)을 가져와 설정
        const storedSnowballName = localStorage.getItem('snowball_name');
        if (storedSnowballName) {
            setNickname(storedSnowballName); // 닉네임이 있으면 설정
        }

        // 토큰을 저장하고 URL에서 토큰 제거
        saveTokenAndRemoveFromURL();
    }, []);

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
                    memories={data.capsule.memories}
                    current={data.capsule.page}
                    total={data.capsule.total_page}
                    received={data.capsule.received}
                    self={data.capsule.self}
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
