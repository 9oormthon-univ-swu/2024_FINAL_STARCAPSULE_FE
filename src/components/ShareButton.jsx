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

const ShareButton = ({ title, url, text }) => {
    const message = `${title}\n\n${text}\n\n${url}`;

    return (
        <IconButton
            aria-label='공유하기'
            sx={{ w: 3, h: 3 }}
            onClick={() => handleShare(title, url, text, message)}
        >
            <ShareIcon color='custom.grey' />
        </IconButton>
    );
};

export default ShareButton;
