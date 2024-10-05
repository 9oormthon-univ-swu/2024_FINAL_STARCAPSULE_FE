import { Button, Stack, styled, Typography } from '@mui/material';
import React, { useState } from 'react';
import DDayTitle from './DDayTitle';
import MainTitle from './MainTitle';
import Snowball from './Snowball/Snowball';
import { ObjectNames } from '@/constants/ObjectNames';
import Layout from '@/layouts/Layout';
import useSWR from 'swr';

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
    console.log(`fetching data ${url}`);
    return {
        capsule: {
            id: 1,
            snowball_name: '나의 캡슐',
            received: 15,
            self: 3,
            page: 1,
            total_page: 3,
            memories: memories,
        },
    };
};

const MainContainer = styled(Stack)(() => ({
    padding: '1rem 0 2.25rem 0',
    boxSizing: 'border-box',
    flexGrow: 2,
    height: '100svh',
}));

const StyledButton = styled(Button)(({ theme }) => ({
    boxSizing: 'border-box',
    width: '100%',
    height: '3.875rem',
    backgroundColor: theme.palette.custom.button1,
    color: theme.palette.custom.white,
    borderRadius: '1.25rem',
    flexGrow: 0,
    padding: '1.25rem 0',
    boxShadow: '0px 0px 4px 0px rgba(40, 40, 40, 0.20)',
}));

const Main = () => {
    const [nickname, setNickname] = useState('닉네임');
    const { data } = useSWR('data', getData);
    return (
        <Layout sx={{ overflow: 'hidden' }}>
            <MainContainer
                direction={'column'}
                justifyContent={'space-between'}
                alignContent={'center'}
                spacing={1}
            >
                <Stack direction={'column'} spacing={1} sx={{ flexGrow: 2 }}>
                    <DDayTitle />
                    <MainTitle nickname={nickname} setNickname={setNickname} />
                </Stack>

                <Snowball
                    memories={data.capsule.memories}
                    current={data.capsule.page}
                    total={data.capsule.total_page}
                    received={data.capsule.received}
                    self={data.capsule.self}
                    onLeftClick={() => console.log('clicked left')}
                    onRightClick={() => console.log('clicked right')}
                />
                <StyledButton variant={'contained'} sx={{}}>
                    <Typography variant='title2'>추억 전달하기</Typography>
                </StyledButton>
            </MainContainer>
        </Layout>
    );
};

export default Main;
