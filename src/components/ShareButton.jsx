import { IconButton } from '@mui/material';
import React from 'react';
import { ShareIcon } from './icons';

const handleShare = (title, url, content, message) => {
    if (navigator.share) {
        navigator
            .share({
                title: title,
                url: url,
                text: content,
            })
            .catch(() => {});
    } else {
        if (navigator.clipboard) {
            navigator.clipboard
                .writeText(message || url)
                .then(() => alert('클립보드에 복사되었습니다.'))
                .catch(() => {});
        } else {
            const textarea = document.createElement('textarea');
            textarea.value = message || url;
            textarea.id = 'temp';
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            alert('클립보드에 복사되었습니다.');
        }
    }
};

/**
 * 공유하기 버튼. 임시로 처리하였으며 추후 시간이 남거나 업그레이드 시, native.share가 지원되지 않는 브라우저를 위한 코드가 추가될 예정입니다.
 * @param {string} title - 공유할 제목
 * @param {string} url - 공유할 url
 * @param {string} text - 공유할 내용
 */
//
const ShareButton = ({ title, url, text }) => {
    const message = `${title}\n\n${text}\n\n${url}`;

    return (
        <IconButton
            aria-label='공유하기'
            sx={{ width: '1.5rem', height: '1.5rem' }}
            onClick={() => handleShare(title, url, text, message)}
        >
            <ShareIcon sx={{ color: 'custom.grey' }} />
        </IconButton>
    );
};

export default ShareButton;
