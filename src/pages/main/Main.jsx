import { Button, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';
import DDayTitle from './DDayTitle';
import MainTitle from './MainTitle';
import Snowball from './Snowball/Snowball';
import { ObjectNames } from '@/constants/ObjectNames';
import Layout from '@/layouts/Layout';

// 임시 적용 데이터
const memories = [
    { id: 1, writer_name: '닉네임', object_name: ObjectNames.SNOWMAN },
    { id: 2, writer_name: '닉네임', object_name: ObjectNames.SNOWMAN },
    { id: 3, writer_name: '닉네임', object_name: ObjectNames.MOON },
    { id: 4, writer_name: '닉네임', object_name: ObjectNames.SANTA },
    { id: 5, writer_name: '닉네임', object_name: ObjectNames.SNOWFLAKE },
    { id: 6, writer_name: '닉네임', object_name: ObjectNames.SANTA_SLEIGH },
];

const Main = () => {
    const [nickname, setNickname] = useState('닉네임');
    return (
        <Layout
            sx={{
                overflow: 'hidden',
            }}
        >
            <Stack
                direction={'column'}
                justifyContent={'space-between'}
                alignContent={'center'}
                spacing={1}
                height={'100svh'}
                sx={{
                    pt: '1rem',
                    pb: '2.25rem',
                    boxSizing: 'border-box',
                    flexGrow: 2,
                }}
            >
                <Stack
                    direction={'column'}
                    spacing={1}
                    sx={
                        {
                            // flexGrow: 2,
                        }
                    }
                >
                    <DDayTitle />
                    <MainTitle nickname={nickname} setNickname={setNickname} />
                </Stack>

                <Snowball
                    memories={memories}
                    current={1}
                    total={3}
                    received={5}
                    self={3}
                    onLeftClick={() => console.log('clicked left')}
                    onRightClick={() => console.log('clicked right')}
                />
                <Button
                    variant={'contained'}
                    sx={{
                        boxSizing: 'border-box',
                        width: '100%',
                        height: '3.875rem',
                        backgroundColor: 'custom.button1',
                        color: 'custom.white',
                        borderRadius: '1.25rem',
                        flexGrow: 0,
                        py: '1.25rem',
                        boxShadow: '0px 0px 4px 0px rgba(40, 40, 40, 0.20)',
                    }}
                >
                    <Typography variant='title2'>추억 전달하기</Typography>
                </Button>
            </Stack>
        </Layout>
    );
};

export default Main;
