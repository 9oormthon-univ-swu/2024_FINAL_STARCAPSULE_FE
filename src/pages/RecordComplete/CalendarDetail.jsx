import React, { useRef } from 'react';  
import { Stack } from '@mui/material';
import RecordBoard from '../Record/components/RecordBoard';
import ImageSaveButton from './ImageSaveButton'; 
import html2canvas from 'html2canvas';
import CloseIcon from '@/components/icons/closeicon';
import ShareIcon from '@/components/icons/ShareIcon'; 
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

const CalendarDetail = () => {
    const captureRef = useRef(null);
    const { userId } = useParams();
    const navigate = useNavigate();

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
                link.download = 'calendar_detail.png';
                link.click();
            }).catch((error) => {
                console.error('이미지 저장 중 오류 발생:', error);
            });
        }
    };

    const handleClose = () => {
        navigate(`/main/${userId}`);
    };

    const handlePrevious = () => {
        console.log("Previous button clicked");
     
    };

    const handleNext = () => {
        console.log("Next button clicked");
       
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
                    {"2024년 10월 26일"}
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
                    {"질문을 불러올 수 없습니다."}
                </span>

                <RecordBoard
                    content={"추억을 여기에 입력하세요."}
                    imageUrl={null}
                    isReadOnly={true} // 읽기 전용 모드로 설정
                />
            </Stack>

            <Stack 
                component="form" 
                sx={{
                    position: 'relative',  
                    marginTop: '-22rem',     
                }}
            >
                <ImageSaveButton onClick={handleSaveImage} />
            </Stack>

           
            <Stack
    direction="row"
    alignItems="center"
    justifyContent="space-between"
    sx={{
        width: '568px', 
        padding: '1rem',
        backgroundColor: '#3a3a3a',
        color: 'white',
        position: 'fixed',
        bottom: '5px', 
        left: '50%',
        transform: 'translateX(-50%)', 
    }}
>
    <span 
        style={{ cursor: 'pointer', fontFamily: 'Griun NltoTAENGGU, sans-serif' }}
        onClick={handlePrevious}
    >
        이전
    </span>
    <span 
        style={{ cursor: 'pointer', fontFamily: 'Griun NltoTAENGGU, sans-serif' }}
        onClick={handleNext}
    >
        다음
    </span>
</Stack>
        </Stack>
    );
};

export default CalendarDetail;
