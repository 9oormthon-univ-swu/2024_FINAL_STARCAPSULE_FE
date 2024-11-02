import React from 'react';
import html2canvas from 'html2canvas';
import { IconButton } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';

const ImgShareButton = ({ title, url }) => {
    const handleImageShare = async () => {
        try {
            const captureImg = document.getElementById('capture-container');
            const canvas = await html2canvas(captureImg);
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
        }
    };
    // const handleImageShare = async () => {
    //     // 캡쳐할 영역의 id 값
    //     const captureImg = document.getElementById('capture-container');

    //     // html2canvas를 사용하여 캡처
    //     const canvas = await html2canvas(captureImg);
    //     const dataUrl = canvas.toDataURL('image/png');

    //     // 이미지 공유를 위한 링크 생성 / 클립보드에 복사
    //     const blob = await (await fetch(dataUrl)).blob();
    //     const file = new File([blob], 'layout-image.png', {
    //         type: 'image/png',
    //     });

    //     if (navigator.share) {
    //         // Web Share API를 지원하는 경우
    //         await navigator.share({
    //             title: title,
    //             text: '스노우볼 이미지 공유 완료',
    //             files: [file],
    //             url: url,
    //         });
    //     } else {
    //         // Web Share API가 지원되지 않는 경우
    //         const link = document.createElement('img_link');
    //         link.href = dataUrl;
    //         link.download = 'layout-image.png';
    //         link.click();

    //         // 링크를 클립보드에 복사
    //         navigator.clipboard
    //             .writeText(url)
    //             .then(() => {
    //                 alert('링크가 클립보드에 복사되었습니다: ' + url);
    //             })
    //             .catch((error) => {
    //                 console.error('링크 복사 실패:', error);
    //             });
    //     }
    // };
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
