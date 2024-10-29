import React from 'react';
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
            console.error(error);
        },
    });

    const handleClose = () => {
        navigate(-1);
    };

    const handleSave = () => {
        const imgUrl = `/assets/calendar/image.png`;

        const a = document.createElement('a');
        a.href = imgUrl;
        a.download = '퍼즐-완성본.png';
        a.click();
    };

    if (isLoading) return <Loading />;

    const lastDayWritten = data.written_array[31];

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
                    <Typography variant='title3' sx={{ color: 'custom.grey' }}>
                        {!isRecordable(data.server_time) || lastDayWritten
                            ? '추억이 완성되었습니다!'
                            : '당신의 추억을 모아 퍼즐을 완성하세요!'}
                    </Typography>
                    <Typography
                        variant='Heading2'
                        sx={{ color: 'custom.white' }}
                    >
                        {'보관된 추억 조각  '}
                        <Typography
                            variant={'Heading2'}
                            component={'span'}
                            sx={{ color: 'custom.main1' }}
                        >
                            {`${data.my_memory_count}개`}
                        </Typography>
                    </Typography>
                </Stack>
                <Calendar
                    serverTime={data.server_time}
                    hasWritten={data.written_array}
                    year={year}
                />
                {(!isRecordable(data.server_time) || lastDayWritten) && (
                    <Button
                        variant='contained'
                        sx={{
                            backgroundColor: 'custom.button1',
                            width: ['100%', '87.5%'],
                            height: '4rem',
                            borderRadius: '1.25rem',
                        }}
                        onClick={handleSave}
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
