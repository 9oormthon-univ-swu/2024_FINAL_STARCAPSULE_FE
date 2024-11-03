import React, { useEffect, useRef, useState } from 'react';
import { Stack } from '@mui/material';
import RecordBoard from '../Record/components/RecordBoard';
import ImageSaveButton from './ImageSaveButton';
import html2canvas from 'html2canvas';
import CloseIcon from '@/components/icons/closeicon';
import ShareIcon from '@/components/icons/ShareIcon';
import useAxiosWithAuth from '@/utils/useAxiosWithAuth';
import { useParams, useNavigate } from 'react-router-dom';

const contentstyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    justifyContent: 'center',
    minHeight: '100vh',
    width: '100%',
    maxWidth: '600px',
    margin: '0 auto',
    padding: '0',
    padding: '0',
    boxSizing: 'border-box',
    position: 'relative',
    overflowY: 'auto',   
    overflowX: 'hidden',
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
                if (!memoryId || !userId) {
                    console.error('User ID or Memory ID is missing');
                    return;
                }

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
                backgroundColor: null,
                height: element.scrollHeight,
                windowHeight: element.scrollHeight,
            }).then((canvas) => {
                const link = document.createElement('a');
                link.href = canvas.toDataURL('image/png');
                link.download = 'record.png';
                link.click();
            }).catch((error) => {
                console.error('이미지 저장 중 오류 발생:', error);
            });
        }
    };

    const handleClose = () => {
        navigate(`/guest/${userId}`);
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
                <ShareIcon
                    sx={{
                        cursor: 'pointer',
                        position: 'relative',
                        left: '-30px',
                    }}
                />
            </Stack>

            <Stack 
                ref={captureRef} 
                sx={{
                    width: '100%',
                    minHeight: '700px',  // 참고 코드와 동일한 높이 설정
                    maxHeight: '82vh',   // 긴 답변 시에도 스크롤 허용
                    padding: '1.5rem',
                    background: 'linear-gradient(180deg, #0b0a1b 0%, #27405e 100%)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    paddingTop: '12rem',
                    overflow: 'hidden',  
                }}
            >
                <span style={{
                    position: 'absolute',
                    top: 'calc(10px + 9rem)', 
                    left: '9.5rem',
                    color: 'white',
                    fontSize: '1.3rem',
                    fontFamily: 'Griun NltoTAENGGU, sans-serif',
                }}>
                    To. <span style={{ color: '#DDB892' }}>{nickname}</span>
                </span>

                <RecordBoard
                    content={memoryData?.result.answer || ""}
                    image_url={memoryData?.result.image_url}
                    isReadOnly={true}
                />

                <span style={{
                    marginTop: '15px',
                    color: 'white',
                    fontSize: '1.3rem',
                    fontFamily: 'Griun NltoTAENGGU, sans-serif',
                    textAlign: 'center',
                    marginLeft: '200px', 
                }}>
                    From. <span style={{ color: '#DDB892' }}>{memoryData?.result?.writer || '작성자'}</span>
                </span>

                <Stack 
                    component="form" 
                    sx={{
                        marginTop: '15px', 
                        alignItems: 'center',
                        width: 'fit-content'
                    }}
                    data-html2canvas-ignore="true" // 캡처 시 무시
                >
                    <ImageSaveButton onClick={handleSaveImage} />
                </Stack>
            </Stack>
        </Stack>
    );
};

export default GuestFormAfter;
