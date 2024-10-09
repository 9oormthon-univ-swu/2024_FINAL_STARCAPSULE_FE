import { Stack, Typography } from '@mui/material';
import React, { useState } from 'react';
import DDayTitle from '@/pages/main/DDayTitle';
import Snowball from '@/pages/main/Snowball/Snowball';
import Layout from '@/layouts/Layout';
import useSWR from 'swr';
import Loading from '@/components/Loading';
import { StyledButton, MainContainer } from '@/pages/main/Main';
import Title from './Title';
import { useParams } from 'react-router-dom';
import { defaultGetFetcher } from '@/utils/getFetcher';
import { getDaysBeforeOpen } from '@/utils/getDaysBeforeOpen';

const Guest = () => {
    const [page, setPage] = useState(1);
    const params = useParams();

    const { data, isLoading, error } = useSWR(
        `${process.env.REACT_APP_API_URL}/api/capsule/${params.userId}?page=${page}`,
        defaultGetFetcher,
        {
            onError: (error) => {
                console.error(error);
            },
        }
    );

    const onLeftClick = () => {
        setPage((prev) => (prev === 1 ? 1 : prev - 1));
    };

    const onRightClick = () => {
        setPage((prev) =>
            prev === data.total_page ? data.total_page : prev + 1
        );
    };

    if (isLoading) return <Loading />;
    if (error) return <div>failed to load</div>;

    const daysLeft = getDaysBeforeOpen(data.server_time);

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
                    </Stack>
                    <Title nickname={data.snowball_name} />
                </Stack>

                <Snowball
                    memories={data.memories}
                    current={data.page}
                    total={data.total_page}
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
        </Layout>
    );
};

export default Guest;
