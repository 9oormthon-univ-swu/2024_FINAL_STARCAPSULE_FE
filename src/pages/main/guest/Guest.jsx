import { Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import DDayTitle from '@/pages/main/DDayTitle';
import Snowball from '@/pages/main/Snowball/Snowball';
import Layout from '@/layouts/Layout';
import useSWR from 'swr';
import Loading from '@/components/Loading';
import { StyledButton, MainContainer } from '@/pages/main/Main';
import Title from './Title';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { useNicknameStore } from 'stores/useNicknameStore';
import { Helmet } from 'react-helmet-async';
import { useUserStore } from '@/stores/useUserStore';
import { isRecordable } from '@/utils/isRecordable';
import RecommendModal from '@/components/RecommendModal';
import MakeSnowballContent from '../MakeSnowballContent';
import useModal from '@/hooks/useModal';
import GoToMineTag from './GoToMineTag';
import { useRef } from 'react';

const Guest = () => {
    const [serverTime, setServerTime] = useState('');
    const navigate = useNavigate();
    const param = useParams();

    const [searchParams] = useSearchParams();

    const makeSnowball = searchParams.get('makeSnowball') === 'true';

    const { openModal, closeModal, isOpen } = useModal();

    //스노우볼 주인의 닉네임 설정
    const { setNickname } = useNicknameStore();
    const { userId } = useUserStore();

    const linkRef = useRef(null);

    const handleLinkClick = () => {
        linkRef.current.click();
    };

    const snowballFetcher = (url) =>
        axios
            .get(url)
            .then((res) => res.data.result.paginationData)
            .then((data) => {
                setServerTime(data.server_time);
                return data;
            });

    const infoFetcher = (url) =>
        axios.get(url).then((res) => {
            setNickname(res.data.result.snowballName);
            return res.data.result;
        });

    const { data, isLoading, error } = useSWR(
        `${import.meta.env.VITE_API_URL}/api/capsule/${param.userId}/info`,
        infoFetcher
    );

    useEffect(() => {
        if (makeSnowball) {
            openModal();
        }
    }, []);

    const onButtonClick = () => {
        navigate(`/`);
    };

    if (isLoading) return <Loading snow snowflake />;
    if (error) return <div>failed to load</div>;

    const recordable = isRecordable(2024, serverTime);

    return (
        <>
            <Layout sx={{ overflow: 'hidden' }} snow snowflake>
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
                        </Stack>
                        <Title nickname={data?.snowballName ?? ''} />
                        <GoToMineTag />
                    </Stack>

                    <Snowball
                        isLoading={isLoading}
                        received={data?.receivedCount}
                        self={data?.selfCount}
                        fetcher={snowballFetcher}
                        setServerTime={setServerTime}
                    />
                    {recordable ? (
                        <StyledButton
                            variant={'contained'}
                            sx={{
                                flexGrow: 0,
                            }}
                            onClick={() => {
                                navigate(`/guestrecord/${param.userId}`);
                            }}
                        >
                            <Typography
                                variant='title2'
                                sx={{
                                    color: 'custom.white',
                                }}
                            >
                                추억 전달하기
                            </Typography>
                        </StyledButton>
                    ) : (
                        <StyledButton
                            variant={'contained'}
                            sx={{ flexGrow: 0 }}
                            onClick={handleLinkClick}
                        >
                            <Typography
                                ref={linkRef}
                                href={
                                    'https://sparkly-edam-b20.notion.site/BYE-2024-HI-2025-16c94fdea8998093b916da8a04ff3dba'
                                }
                                component={'a'}
                                variant='title2'
                                sx={{
                                    color: 'custom.white',
                                    textDecoration: 'none',
                                }}
                            >
                                팀 소개
                            </Typography>
                        </StyledButton>
                    )}
                </MainContainer>
            </Layout>
            <RecommendModal
                open={isOpen}
                onClose={closeModal}
                buttonText={'1초만에 스노우볼 만들기 ☃'}
                onButtonClick={onButtonClick}
            >
                <MakeSnowballContent />
            </RecommendModal>
        </>
    );
};

export default Guest;
