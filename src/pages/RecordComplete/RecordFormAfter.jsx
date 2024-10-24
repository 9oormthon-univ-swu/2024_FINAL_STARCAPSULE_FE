import React, { useRef } from 'react'; 
import { Stack } from '@mui/material';
import RecordBoard from '../Record/components/RecordBoard';
import ImageSaveButton from './ImageSaveButton'; 
import html2canvas from 'html2canvas';
import CloseIcon from '@/components/icons/closeicon';  // 엑스 아이콘 import
import { CalendarIcon } from '@/components/icons';    // 달력 아이콘 import

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

    const handleSaveImage = (e) => {
        e.preventDefault();

        if (captureRef.current) {
            const element = captureRef.current;
            const scale = 2;  // 해상도 비율 설정

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

    return (
        <Stack sx={contentstyle}>
            {/* 상단에 아이콘과 날짜 추가 */}
            <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{
                    position: 'absolute',
                    top: 'calc(1rem + 30px)',  // 30px 아래로 조정
                    left: '1rem',
                    right: '1rem',
                    zIndex: 10,
                    color: 'white',
                    fontFamily: 'Griun NltoTAENGGU, sans-serif',
                }}
            >
               <CloseIcon sx={{ cursor: 'pointer', position: 'relative', right: '-30px' }} />  {/* 오른쪽으로 30px 이동 */}
               <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                    <span style={{ color: '#DDB892' }}>2024</span>년&nbsp;
                    <span style={{ color: '#DDB892' }}>11</span>월&nbsp;
                    <span style={{ color: '#DDB892' }}>30</span>일
                </span>
                <CalendarIcon sx={{ cursor: 'pointer', position: 'relative', left: '-30px' }} />  {/* 왼쪽으로 30px 이동 */}
            </Stack>

            <Stack 
                ref={captureRef} 
                sx={{
                    width: '100%',
                    height: '100vh', 
                    padding: '1.5rem', 
                    boxSizing: 'border-box',
                    background: 'linear-gradient(180deg, #0b0a1b 0%, #27405e 100%)',
                    position: 'relative',
                    overflow: 'hidden',
                    paddingTop: '12rem',
                }}
            >
                {/* 질문 추가 */}
                <span style={{ 
                    position: 'absolute',
                    top: 'calc(10px + 9rem)', 
                    left: '9.5rem',  // 고정된 위치
                    color: 'white',
                    fontSize: '1.3rem',
                    fontFamily: 'Griun NltoTAENGGU, sans-serif',
                }}>
                    "질문이다다ㅏ다다ㅏ다다다ㅏ다다"
                </span>

                <RecordBoard showplaceholder='남기고 싶은 추억을 작성해주세요.' />
            </Stack>

            <Stack 
                component="form" 
                sx={{
                    position: 'absolute', 
                    bottom: '5rem', 
                    left: '50%',
                    transform: 'translateX(-50%)', 
                }}
            >
                <ImageSaveButton onClick={handleSaveImage} />
            </Stack>
        </Stack>
    );
};

export default RecordFormAfter;
