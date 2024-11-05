import React, { useEffect, useRef, useState } from 'react';
import { Stack } from '@mui/material';
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
    justifyContent: 'flex-start',
    minHeight: '100vh',
    maxHeight: '100vh',
    width: '100%',
    maxWidth: '600px',
    margin: '0 auto',
    padding: '0',
    boxSizing: 'border-box',
    position: 'relative',
    overflowY: 'auto', // 화면 전체 스크롤 가능하게 설정
    overflowX: 'hidden',
    background: 'linear-gradient(180deg, #0b0a1b 0%, #27405e 100%)',
    '&::-webkit-scrollbar': {
        display: 'none',
    },
    '-ms-overflow-style': 'none',
    'scrollbar-width': 'none',
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
                if (!memoryId || !userId) return;
                const requestUrl = `${snowballAPI}/${userId}/${memoryId}`;
                const response = await axiosInstance.get(requestUrl);
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

            html2canvas(element, {
                scale: 2,
                useCORS: true,
                backgroundColor: '#132034',
                scrollX: 0, // 스크롤 위치 무시하고 캡처
                scrollY: 0,
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
        return (
            <span style={{ fontSize: '1.4rem' }}>
                <span style={{ color: '#DDB892' }}>{date.getFullYear()}</span>
                년&nbsp;
                <span style={{ color: '#DDB892' }}>
                    {String(date.getMonth() + 1).padStart(2, '0')}
                </span>
                월&nbsp;
                <span style={{ color: '#DDB892' }}>
                    {String(date.getDate()).padStart(2, '0')}
                </span>
                일
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
                        maxWidth: '300px',
                        padding: '1.6rem',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        overflow: 'visible',
                        marginTop: '8rem',
                        paddingBottom: '0.1rem',
                    }}
                >
                    <span
                        style={{
                            position: 'absolute',
                            top: 'calc(1rem + 8rem)',
                            left: '9.5rem',
                            color: 'white',
                            fontSize: '1.3rem',
                            fontFamily: 'Griun NltoTAENGGU, sans-serif',
                        }}
                    >
                        To. <span style={{ color: '#DDB892' }}>{nickname}</span>
                    </span>

                    <Stack
                        sx={{
                            width: '100%',
                            marginTop: '2rem',
                            maxHeight: 'calc(100vh - 300px)',
                            overflowY: 'auto',
                            paddingBottom: '2rem',
                        }}
                    >
                        <RecordBoard
                            content={memoryData?.result.answer || ''}
                            image_url={memoryData?.result.image_url}
                            isReadOnly={true}
                        />
                    </Stack>

                    <span
                        style={{
                            color: 'white',
                            fontSize: '1.3rem',
                            fontFamily: 'Griun NltoTAENGGU, sans-serif',
                            textAlign: 'center',
                            position: 'relative',
                            top: '-12px',
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
                            marginTop: '15px',
                            alignItems: 'center',
                            width: 'fit-content',
                        }}
                        data-html2canvas-ignore='true'
                    >
                        <ImageSaveButton onClick={handleSaveImage} />
                    </Stack>
                </Stack>
            </Stack>
        </div>
    );
};

export default GuestFormAfter;
