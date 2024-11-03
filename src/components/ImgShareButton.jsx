import React from 'react';
import html2canvas from 'html2canvas';
import { IconButton } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';

const ImgShareButton = ({ title, url }) => {
    const handleImageShare = async () => {
        try {
            const captureImg = document.getElementById('capture-container');
            const canvas = await html2canvas(captureImg, {
                backgroundColor: null,
            });
            const dataUrl = canvas.toDataURL('image/png');
            const blob = await (await fetch(dataUrl)).blob();
            const file = new File([blob], 'layout-image.png', {
                type: 'image/png',
            });

            if (navigator.share) {
                await navigator.share({
                    title: title,
                    text: '스노우볼 이미지 공유 완료',
                    files: [file],
                    url: url,
                });
                alert('공유가 완료되었습니다!'); // 성공 알림
            } else {
                const link = document.createElement('a');
                link.href = dataUrl;
                link.download = 'layout-image.png';
                link.click();

                await navigator.clipboard.writeText(url);
                alert('링크가 클립보드에 복사되었습니다: ' + url);
            }
        } catch (error) {
            console.error('공유 실패:', error);
            alert('공유에 실패했습니다. 다시 시도해 주세요.'); // 오류 알림
        }
    };

    return (
        <IconButton
            aria-label='이미지 공유하기'
            sx={{ width: '1.5rem', height: '1.5rem' }}
            onClick={handleImageShare}
        >
            <ShareIcon sx={{ color: 'custom.grey' }} />
        </IconButton>
    );
};

export default ImgShareButton;
