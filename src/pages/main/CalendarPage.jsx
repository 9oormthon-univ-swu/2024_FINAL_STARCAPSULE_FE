import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Calendar from './Calendar/Calendar';
import Layout from '@/layouts/Layout';
import { Button, IconButton, Stack, Typography } from '@mui/material';
import useSWR from 'swr';
import useAxiosWithAuth from '@/utils/useAxiosWithAuth';
import Loading from '@/components/Loading';
import { CloseIcon } from '@/components/icons';
import { isRecordable } from './Calendar/Calendar';

const CalendarPage = () => {
    // 2025년도 서버 운영 시를 고려하여 year 값을 Calendar->  day 컴포넌트로 넘기도록 처리.
    // 자세한 것은 day 컴포넌트를 확인해주세요
    const year = 2024;

    const navigate = useNavigate();

    const axiosWithAuth = useAxiosWithAuth();

    const fetcher = (url) =>
        axiosWithAuth.get(url).then((res) => res.data.result);

    const { data, isLoading } = useSWR(`/calendar/data`, fetcher, {
        onError: (error) => {
            console.log(error);
        },
    });

    useEffect(() => {
        console.log(data);
    }, [data]);

    const handleClose = () => {
        navigate(-1);
    };

    if (isLoading) return <Loading />;

    const lastDayWritten = data.writtenArray[31];

    console.log(!isRecordable(data.serverTime, year) || lastDayWritten);
    return (
        <Layout
            snow
            overlay
            sx={{
                py: 3,
            }}
        >
            <IconButton
                sx={{
                    color: 'custom.grey',
                    width: '1.5rem',
                    height: '1.5rem',
                }}
                onClick={handleClose}
            >
                <CloseIcon />
            </IconButton>
            <Stack
                sx={{
                    mt: 4,
                    mb: 3,
                    width: '100%',
                }}
                direction={'column'}
                spacing={3}
                alignItems={'center'}
            >
                <Stack
                    sx={{
                        paddingX: ['0.1rem', '2.4rem'],
                        width: '100%',
                        boxSizing: 'border-box',
                    }}
                    spacing={0.75}
                >
                    <Typography variant='title3' sx={{ color: 'custom.white' }}>
                        {'추억이 공개되었어요'}
                    </Typography>
                    <Typography
                        variant='Heading2'
                        sx={{ color: 'custom.white' }}
                    >
                        {'보관된 추억 조각  '}
                        <Typography
                            variant='Heading2'
                            color='primary'
                            component={'span'}
                        >
                            {`${data.myMemoryCount}개`}
                        </Typography>
                    </Typography>
                </Stack>
                <Calendar
                    serverTime={data.serverTime}
                    hasWritten={data.writtenArray}
                    year={year}
                />
                {(!isRecordable(data.serverTime) || lastDayWritten) && (
                    <Button
                        variant='contained'
                        sx={{
                            backgroundColor: 'custom.button1',
                            width: ['100%', '87.5%'],
                            height: '4rem',
                            borderRadius: '1.25rem',
                        }}
                        onClick={() => {
                            navigate('/main/calendar/save');
                        }}
                    >
                        <Typography
                            variant='title2'
                            sx={{
                                color: 'custom.white',
                            }}
                        >
                            {'이미지 저장하기'}
                        </Typography>
                    </Button>
                )}
            </Stack>
        </Layout>
    );
};

export default CalendarPage;
