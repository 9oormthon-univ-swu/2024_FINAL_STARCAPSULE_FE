import { Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import DDayTitle from '@/pages/main/DDayTitle';
import Snowball from '@/pages/main/Snowball/Snowball';
import Layout from '@/layouts/Layout';
import useSWR from 'swr';
import Loading from '@/components/Loading';
import { StyledButton, MainContainer } from '@/pages/main/Main';
import Title from './Title';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useNicknameStore } from 'stores/useNicknameStore';
import { Helmet } from 'react-helmet-async';
import { useUserStore } from '@/stores/useUserStore';
import { isRecordable } from '@/utils/isRecordable';

const Guest = () => {
    const [serverTime, setServerTime] = useState('');
    const navigate = useNavigate();
    const param = useParams();

    //스노우볼 주인의 닉네임 설정
    const { setNickname } = useNicknameStore();
    const { userId } = useUserStore();

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
        if (param.userId === userId) {
            navigate(`/main/${userId}?page=1`);
        }
    }, []);

    if (isLoading) return <Loading snow snowflake />;
    if (error) return <div>failed to load</div>;

    const recordable = isRecordable(2024, serverTime);

    return (
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
                <Stack direction={'column'} spacing={1} sx={{ flexGrow: 2 }}>
                    <Stack
                        direction={'row'}
                        justifyContent={'space-between'}
                        alignItems={'center'}
                    >
                        <DDayTitle serverTime={serverTime} />
                    </Stack>
                    <Title nickname={data?.snowballName ?? ''} />
                </Stack>

                <Snowball
                    isLoading={isLoading}
                    received={data?.receivedCount}
                    self={data?.selfCount}
                    fetcher={snowballFetcher}
                    setServerTime={setServerTime}
                    owner={'guest'}
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
                        <Typography variant='title2'>추억 전달하기</Typography>
                    </StyledButton>
                ) : (
                    <StyledButton variant={'contained'} sx={{ flexGrow: 0 }}>
                        <Typography variant='title2'>팀 소개</Typography>
                    </StyledButton>
                )}
            </MainContainer>
        </Layout>
    );
};

export default Guest;
