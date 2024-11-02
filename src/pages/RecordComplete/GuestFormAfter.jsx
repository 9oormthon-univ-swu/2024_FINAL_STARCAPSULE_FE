import React, { useEffect, useRef, useState } from 'react';
import { Container, Stack } from '@mui/material';
import RecordBoard from '../Record/components/RecordBoard';
import ImageSaveButton from './ImageSaveButton';
import html2canvas from 'html2canvas';
import CloseIcon from '@/components/icons/closeicon';
import ImgShareButton from '@/components/ImgShareButton';
import useAxiosWithAuth from '@/utils/useAxiosWithAuth';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const contentstyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    width: '100%',
    maxWidth: '600px',
    margin: '0 auto',
    padding: '0',
    boxSizing: 'border-box',
    position: 'relative',
    overflow: 'hidden',
};

const GuestFormAfter = () => {
    const captureRef = useRef(null);
    const { userId, memoryId } = useParams();
    const navigate = useNavigate();
    const axiosInstance = useAxiosWithAuth();
    const [memoryData, setMemoryData] = useState(null);
    const nickname = localStorage.getItem('snowballName') || '닉네임';

    const snowballAPI = `${import.meta.env.VITE_API_URL}/api/share_memory`;

    useEffect(() => {
        const fetchMemoryData = async () => {
            try {
                console.log('User ID:', userId);
                console.log('Memory ID:', memoryId);

                if (!memoryId || !userId) {
                    console.error('User ID or Memory ID is missing');
                    return;
                }

                const requestUrl = `${snowballAPI}/${userId}/${memoryId}`;
                console.log(`Request URL: ${requestUrl}`);

                const response = await axiosInstance.get(requestUrl);

                console.log('Fetched Memory Data:', response.data);
                setMemoryData(response.data);
            } catch (error) {
                console.error('Error fetching memory details:', error);
            }
        };

        fetchMemoryData();
    }, [memoryId, userId]);

    const handleSaveImage = (e) => {
        e.preventDefault();
        if (captureRef.current) {
            const element = captureRef.current;
            const scale = 2;

            html2canvas(element, {
                scale: scale,
                useCORS: true,
                backgroundColor: null,
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
        navigate(`/main/${userId}`);
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
                        top: 'calc(1rem + 30px)',
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
                        url={`${import.meta.env.BASE_URL}/guest/${userId}`}
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
                        minHeight: '100vh', // 배경이 화면에 꽉 차도록 설정
                        padding: '1.5rem',
                        background:
                            'linear-gradient(180deg, #0b0a1b 0%, #27405e 100%)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        paddingTop: '12rem',
                    }}
                >
                    <span
                        style={{
                            position: 'absolute',
                            top: 'calc(10px + 9rem)',
                            left: '9.5rem',
                            color: 'white',
                            fontSize: '1.3rem',
                            fontFamily: 'Griun NltoTAENGGU, sans-serif',
                        }}
                    >
                        To. <span style={{ color: '#DDB892' }}>{nickname}</span>
                    </span>

                    <RecordBoard
                        content={memoryData?.result.answer || ''}
                        image_url={memoryData?.result.image_url}
                        isReadOnly={true}
                    />

                    {/* `RecordBoard` 바로 아래에 `from` 텍스트와 버튼 위치 */}
                    <span
                        style={{
                            marginTop: '15px', // `RecordBoard` 바로 아래 여백 조정
                            color: 'white',
                            fontSize: '1.3rem',
                            fontFamily: 'Griun NltoTAENGGU, sans-serif',
                            textAlign: 'center',
                            marginLeft: '200px',
                        }}
                    >
                        From.{' '}
                        <span style={{ color: '#DDB892' }}>
                            {memoryData?.result?.writer || '작성자'}
                        </span>
                    </span>

                    <Stack
                        component='form'
                        sx={{
                            marginTop: '20px', // `from` 텍스트 바로 아래 여백 조정
                            alignItems: 'center',
                        }}
                    >
                        <ImageSaveButton onClick={handleSaveImage} />
                    </Stack>
                </Stack>
            </Stack>
        </div>
    );
};

export default GuestFormAfter;
