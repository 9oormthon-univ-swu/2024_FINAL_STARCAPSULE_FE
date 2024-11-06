import React, { useEffect, useRef, useState } from 'react';
import { Stack } from '@mui/material';
import RecordBoard from '../Record/components/RecordBoard';
import ImageSaveButton from './ImageSaveButton';
import html2canvas from 'html2canvas';
import { CloseIcon, ShareIcon } from '@/components/icons';
import useAxiosWithAuth from '@/utils/useAxiosWithAuth';
import { useParams, useNavigate } from 'react-router-dom';
import ImgShareButton from '@/components/ImgShareButton';
import { Helmet } from 'react-helmet-async';

const contentstyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    minHeight: '100dvh',
    maxHeight: '100dvh',
    width: '100%',
    maxWidth: '600px',
    margin: '0 auto',
    padding: '0',
    boxSizing: 'border-box',
    position: 'relative',
    overflowY: 'auto',
    overflowX: 'hidden',
    background: 'linear-gradient(180deg, #0b0a1b 0%, #27405e 100%)',
    '&::-webkit-scrollbar': {
        display: 'none',
    },
    '-ms-overflow-style': 'none',
    'scrollbar-width': 'none',
};

const RecordFormAfter = () => {
    const captureRef = useRef(null);
    const { userId, memoryId } = useParams();
    const navigate = useNavigate();
    const axiosInstance = useAxiosWithAuth();
    const [memoryData, setMemoryData] = useState(null);

    const snowballAPI = `${import.meta.env.VITE_API_URL}/api/my_memory`;
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchMemoryData = async () => {
            try {
                if (!memoryId || !userId) {
                    console.error('User ID or Memory ID is missing');
                    return;
                }

                const response = await axiosInstance.get(
                    `${snowballAPI}/${memoryId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                console.log('Fetched Memory Data:', response.data);
                setMemoryData(response.data);
            } catch (error) {
                console.error('Error fetching memory details:', error);
            }
        };

        fetchMemoryData();
    }, []);

    const handleSaveImage = (e) => {
        e.preventDefault();
        if (captureRef.current) {
            const element = captureRef.current;
            const elementHeight = element.scrollHeight;

            html2canvas(element, {
                scale: 2,
                useCORS: true,
                backgroundColor: '#132034',
                height: elementHeight,
                windowHeight: elementHeight,
            })
                .then((canvas) => {
                    const link = document.createElement('a');
                    link.href = canvas.toDataURL('image/png');
                    link.download = 'record.png';
                    link.click();
                })
                .catch((error) => {
                    console.error('이미지 저장 중 오류 발생:', error);
                });
        }
    };

    const handleClose = () => {
        navigate(-1);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');

        return (
            <span style={{ fontSize: '1.4rem' }}>
                <span style={{ color: '#DDB892' }}>{year}</span>년&nbsp;
                <span style={{ color: '#DDB892' }}>{month}</span>월&nbsp;
                <span style={{ color: '#DDB892' }}>{day}</span>일
            </span>
        );
    };

    return (
        <div>
            <Helmet>
                <title>스노로그 - 2024의 추억이 쌓이는 곳</title>
                <meta
                    name='description'
                    content='스노로그에서 쌓았던 2024의 추억을 확인해보세요.'
                />
                <meta
                    property='og:title'
                    content='스노로그 - 2024의 추억이 쌓이는 곳'
                />
                <meta
                    property='og:description'
                    content='스노로그에서 쌓았던 2024의 추억을 확인해보세요.'
                />
                <meta property='og:type' content='website' />
            </Helmet>
            <Stack sx={contentstyle}>
                <Stack
                    direction='row'
                    alignItems='center'
                    justifyContent='space-between'
                    sx={{
                        position: 'absolute',
                        top: 'calc(1rem + 29px)',
                        left: '1rem',
                        right: '1rem',
                        zIndex: 10,
                        color: 'white',
                        fontFamily: 'Griun NltoTAENGGU, sans-serif',
                    }}
                >
                    <CloseIcon
                        sx={{
                            cursor: 'pointer',
                            position: 'relative',
                            right: '-30px',
                        }}
                        onClick={handleClose}
                    />
                    <span style={{ fontSize: '1.4rem' }}>
                        {memoryData
                            ? formatDate(memoryData.result.create_at)
                            : '로딩 중...'}
                    </span>
                    <ImgShareButton
                        title={
                            '스노우볼에 오늘의 추억이 보관되었어요!\nSNS에 링크를 공유해친구들에게 함께한 추억을 전달받아보세요☃️\n'
                        }
                        sx={{
                            cursor: 'pointer',
                            position: 'relative',
                            left: '-30px',
                        }}
                    />
                </Stack>

                <Stack
                    id='capture-container'
                    ref={captureRef}
                    sx={{
                        width: '100%',
                        maxWidth: '300px',
                        padding: '1.5rem',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        overflow: 'visible',
                        marginTop: '7rem',
                    }}
                >
                    <span
                        style={{
                            color: 'white',
                            fontSize: '1.4rem',
                            fontFamily: 'Griun NltoTAENGGU, sans-serif',
                            marginBottom: '1rem',
                            marginLeft: '-30px',
                        }}
                    >
                        {memoryData
                            ? (memoryData.result.daily_question?.question ??
                              '질문을 불러올 수 없습니다.')
                            : '로딩 중...'}
                    </span>

                    <Stack
                        sx={{
                            width: '100%',
                            alignItems: 'center',
                            marginBottom: '1rem',
                            flexDirection: 'column',
                        }}
                    >
                        <RecordBoard
                            content={memoryData?.result.answer || ''}
                            image_url={memoryData?.result.image_url}
                            isReadOnly={true}
                        />
                    </Stack>
                </Stack>

                <Stack
                    component='form'
                    sx={{
                        alignItems: 'center',
                        width: 'fit-content',
                        marginTop: '-35px',
                    }}
                    data-html2canvas-ignore='true'
                >
                    <ImageSaveButton onClick={handleSaveImage} />
                </Stack>
            </Stack>
        </div>
    );
};

export default RecordFormAfter;
