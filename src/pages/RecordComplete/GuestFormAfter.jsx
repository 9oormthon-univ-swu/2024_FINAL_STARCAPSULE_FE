import React, { useEffect, useRef, useState } from 'react';
import { IconButton, Stack } from '@mui/material';
import RecordBoard from '../Record/components/RecordBoard';
import ImageSaveButton from './ImageSaveButton';
import html2canvas from 'html2canvas';
import { CloseIcon } from '@/components/icons';
import useAxiosWithAuth from '@/utils/useAxiosWithAuth';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components';

const HeaderContainer = styled.div`
    position: absolute;
    top: 1rem;
    left: 1rem;
    right: 1rem;
    z-index: 10;
    color: white;
    font-family: 'Griun NltoTAENGGU', sans-serif;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const HeaderDate = styled.div`
    font-size: 1.5rem;
    text-align: center;
    flex: 1;
    display: flex;
    justify-content: center;
    color: white;
`;

const HeaderIconLeft = styled(IconButton)`
    cursor: pointer;
    padding: 0;
    margin-right: auto;
`;

const HeaderIconRight = styled.div`
    display: flex;
    justify-content: flex-end;
`;

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
    background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.50) 0%, rgba(0, 0, 0, 0.50) 100%), linear-gradient(0deg, #93C2DF 9.29%, #C3DEF7 50.84%, #B6D8E1 109.34%)',
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
                //console.error('Error fetching memory details:', error);
            }
        };
        fetchMemoryData();
    }, [memoryId, userId]);

    const handleSaveImage = (e) => {
        e.preventDefault();
        if (captureRef.current) {
            const element = captureRef.current;
            const date = new Date(memoryData?.result.create_at);
            const formattedDate = `${date.getFullYear()}-${String(
                date.getMonth() + 1
            ).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

            html2canvas(element, {
                scale: 2,
                useCORS: true,
                backgroundColor: '#5B91B6',
                scrollX: 0,
                scrollY: 0,
            })
                .then((canvas) => {
                    const link = document.createElement('a');
                    link.href = canvas.toDataURL('image/png');
                    link.download = `${formattedDate}.png`;
                    link.click();
                })
                .catch((error) => {
                    //console.error('이미지 저장 중 오류 발생:', error);
                });
        }
    };

    const handleClose = () => {
        navigate(-1);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return (
            <HeaderDate>
                <span style={{ color: '#C3DEF7' }}>{date.getFullYear()}</span>
                년&nbsp;
                <span style={{ color: '#C3DEF7' }}>
                    {String(date.getMonth() + 1).padStart(2, '0')}
                </span>
                월&nbsp;
                <span style={{ color: '#C3DEF7' }}>
                    {String(date.getDate()).padStart(2, '0')}
                </span>
                일
            </HeaderDate>
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
                <HeaderContainer>
                    <HeaderIconLeft
                        onClick={handleClose}
                        sx={{
                            color: 'white',
                        }}
                    >
                        <CloseIcon />
                    </HeaderIconLeft>
                    <HeaderDate>
                        {memoryData
                            ? formatDate(memoryData.result.create_at)
                            : '로딩중'}
                    </HeaderDate>
                    <HeaderIconRight></HeaderIconRight>
                </HeaderContainer>

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
                        position: 'relative',
                    }}
                >
                    <span
                        style={{
                            position: 'absolute',
                            top: 'calc(0rem + 0rem)',
                            left: '2.7rem',
                            color: 'white',
                            fontSize: '1.3rem',
                            fontFamily: 'Griun NltoTAENGGU, sans-serif',
                        }}
                    >
                        To. <span style={{ color: '#C3DEF7' }}>{nickname}</span>
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

                    <span
                        style={{
                            color: 'white',
                            fontSize: '1.3rem',
                            fontFamily: 'Griun NltoTAENGGU, sans-serif',
                            textAlign: 'center',
                            position: 'relative',
                            top: '-5px',
                            left: '46%',
                            transform: 'translateX(-50%)',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        From.{' '}
                        <span style={{ color: '#C3DEF7' }}>
                            {memoryData?.result?.writer || '작성자'}
                        </span>
                    </span>

                    <Stack
                        component='form'
                        sx={{
                            alignItems: 'center',
                            width: 'fit-content',
                            marginTop: '2rem',
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
