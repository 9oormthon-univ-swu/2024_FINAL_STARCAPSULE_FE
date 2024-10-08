import { Stack, Typography } from '@mui/material';
import React, { useState } from 'react';
import DDayTitle from '@/pages/main/DDayTitle';
import Snowball from '@/pages/main/Snowball/Snowball';
import { ObjectNames } from '@/constants/ObjectNames';
import Layout from '@/layouts/Layout';
import useSWR from 'swr';
import Loading from '@/components/Loading';
import { StyledButton, MainContainer } from '@/pages/main/Main';
import Title from './Title';
import { useParams } from 'react-router-dom';

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

const Guest = () => {
    const [page, setPage] = useState(1);
    const { data, isLoading } = useSWR(`${page}`, getData);
    const params = useParams();

    console.log('params:', params);

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
                    </Stack>
                    <Title nickname={data.capsule.snowball_name} />
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
                <StyledButton
                    variant={'contained'}
                    sx={{
                        flexGrow: 0,
                    }}
                >
                    <Typography variant='title2'>추억 전달하기</Typography>
                </StyledButton>
            </MainContainer>
        </Layout>
    );
};

export default Guest;
