import React, { useRef } from 'react'; 
import { Stack } from '@mui/material';
import RecordBoard from '../Record/components/RecordBoard';
import ImageSaveButton from './ImageSaveButton'; 
import RecordTitle from '../Record/components/RecordTitle';
import html2canvas from 'html2canvas';

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
                }}
            >
                <Stack>
                    <RecordTitle />
                </Stack>
                <Stack sx={{ width: '100%' }}>
                    <RecordBoard showplaceholder='남기고 싶은 추억을 작성해주세요.' />
                </Stack>
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
