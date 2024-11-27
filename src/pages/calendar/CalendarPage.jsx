import React from 'react';
import { useNavigate } from 'react-router-dom';
import Calendar from './Calendar';
import Layout from '@/layouts/Layout';
import { Button, IconButton, Stack, Typography } from '@mui/material';
import useSWR from 'swr';
import useAxiosWithAuth from '@/utils/useAxiosWithAuth';
import Loading from '@/components/Loading';
import { CloseIcon } from '@/components/icons';
import { isRecordable } from '@/utils/isRecordable';
import { Helmet } from 'react-helmet-async';
import { useSnackbarStore } from '@/stores/useSnackbarStore';
import axios from 'axios';

const CalendarPage = () => {
    // 2025년도 서버 운영 시를 고려하여 year 값을 Calendar->  day 컴포넌트로 넘기도록 처리.
    // 자세한 것은 day 컴포넌트를 확인해주세요
    const year = 2024;

    const navigate = useNavigate();

    const axiosWithAuth = useAxiosWithAuth();

    const { setSnackbarOpen } = useSnackbarStore();

    const fetcher = (url) =>
        axiosWithAuth.get(url).then((res) => res.data.result);

    const { data, isLoading } = useSWR(`/calendar/data`, fetcher, {
        onError: () => {
            setSnackbarOpen({
                text: '캘린더 데이터를 불러오는데 실패했습니다. 다시 시도해 주세요.',
                severity: 'error',
            });
        },
    });

    const handleClose = () => {
        navigate(-1);
    };

    const handleSave = async () => {
        const imgUrl = `${import.meta.env.VITE_BASE_URL}/assets/calendar/image.png`;

        try {
            const response = await axios.get(imgUrl, {
                responseType: 'blob',
            });

            const blobUrl = URL.createObjectURL(response.data);

            const a = document.createElement('a');
            a.href = blobUrl;
            a.download = '퍼즐-완성본.png';
            a.click();

            URL.revokeObjectURL(blobUrl);
        } catch (error) {
            console.error('Error downloading the file:', error);
            setSnackbarOpen({
                text: '이미지 저장에 실패했습니다. 다시 시도해 주세요.',
                severity: 'error',
            });
        }
    };

    if (isLoading) return <Loading />;

    const recordable = isRecordable(year, data.server_time);

    return (
        <Layout
            snow
            overlay
            snowflake
            sx={{
                py: 3,
            }}
        >
            <Helmet>
                <title>스노로그 - 2024의 추억이 쌓이는 곳</title>
                <meta
                    name='description'
                    content='스노로그에 기록된 추억을 캘린더를 통해 확인해보세요.'
                />
                <meta
                    property='og:title'
                    content='스노로그 - 2024의 추억이 쌓이는 곳'
                />
                <meta
                    property='og:description'
                    content='스노로그에 기록된 추억을 캘린더를 통해 확인해보세요.'
                />
                <meta property='og:type' content='website' />
            </Helmet>
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
                        {!recordable
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
                {!recordable && (
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
