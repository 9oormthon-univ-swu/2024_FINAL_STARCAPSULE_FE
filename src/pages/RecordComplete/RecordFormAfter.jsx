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
    overflow: 'hidden', 
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
            const scale = 2;
            html2canvas(element, {
                scale: scale,
                useCORS: true,
                backgroundColor: null,
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
                    top: 'calc(1rem + 30px)',
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
        height: '100vh', 
        padding: '1.5rem', 
        background: 'linear-gradient(180deg, #0b0a1b 0%, #27405e 100%)',
        paddingTop: '12rem',
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
        {memoryData ? memoryData.result.daily_question?.question ?? "질문을 불러올 수 없습니다." : "로딩 중..."}
    </span>

    <RecordBoard
        content={memoryData?.result.answer || ""}
        image_url={memoryData?.result.image_url}
        isReadOnly={true} // 읽기 전용 모드로 설정
    />
</Stack>


            <Stack 
                component="form" 
                sx={{
                    position: 'relative',  
                    marginTop: '-24rem',     
                }}
            >
                <ImageSaveButton onClick={handleSaveImage} />
            </Stack>
        </Stack>
    );
};

export default RecordFormAfter;
