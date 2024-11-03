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
    width: '100%',
    maxWidth: '600px',
    margin: '0 auto',
    padding: '0',
    boxSizing: 'border-box',
    position: 'relative',
    overflowY: 'auto',  
    overflowX: 'hidden',
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

                const response = await axiosInstance.get(`${snowballAPI}/${memoryId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
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

            html2canvas(element, {
                scale: 2,
                useCORS: true,
                backgroundColor: null,
                height: element.scrollHeight, // 캡처된 이미지의 높이만 조정
                windowHeight: element.scrollHeight, // 캡처할 내용의 높이만 조정
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
        <Stack sx={contentstyle}>
            <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
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
                    sx={{ cursor: 'pointer', position: 'relative', right: '-30px' }} 
                    onClick={handleClose} 
                />
                <span style={{ fontSize: '1.4rem' }}>
                    {memoryData ? formatDate(memoryData.result.create_at) : "로딩 중..."}
                </span>
                <ShareIcon sx={{ cursor: 'pointer', position: 'relative', left: '-30px' }} />
            </Stack>

            <Stack 
                ref={captureRef} 
                sx={{
                    width: '100%',
                    minHeight: '700px',  // 일반적인 화면 길이에 맞춘 고정 높이 설정
                    maxHeight: '83vh',   // 최대 높이를 설정해 긴 답변 시에도 스크롤 허용
                    padding: '1.5rem',
                    background: 'linear-gradient(180deg, #0b0a1b 0%, #27405e 100%)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    paddingTop: '11rem',
                    overflow: 'hidden',
                }}
            >
                <span style={{ 
                    position: 'absolute',
                    top: 'calc(10px + 8rem)', 
                    left: '9.5rem',  
                    color: 'white',
                    fontSize: '1.3rem',
                    fontFamily: 'Griun NltoTAENGGU, sans-serif',
                }}>
                    {memoryData ? memoryData.result.daily_question?.question ?? "질문을 불러올 수 없습니다." : "로딩 중..."}
                </span>

                <RecordBoard
                    content={memoryData?.result.answer || ""}
                    image_url={memoryData?.result.image_url}
                    isReadOnly={true}
                />

                
                <Stack 
                    component="form" 
                    sx={{
                        marginTop: '15px',
                        alignItems: 'center',
                        width: 'fit-content'
                    }}
                    data-html2canvas-ignore="true"
                >
                    <ImageSaveButton onClick={handleSaveImage} />
                </Stack>
            </Stack>
        </Stack>
    );
};

export default RecordFormAfter;
