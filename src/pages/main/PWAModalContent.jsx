import { Box, Typography } from '@mui/material';
import React from 'react';

const PWAModalContent = () => {
    return (
        <>
            <Box
                component='img'
                src={'/ios/72.png'}
                sx={{
                    width: '3.5rem',
                    height: '3.5rem',
                    objectFit: '/ios/72.png',
                    backgroundPosition: 'center',
                }}
            />
            <Typography
                variant='subtitle2'
                sx={{
                    textAlign: 'center',
                    whiteSpace: 'pre-line',
                    fontWeight: 700,
                    color: 'custom.font',
                    '& span': {
                        color: 'custom.button2',
                    },
                }}
            >
                {'홈 화면에'}
                <span>{` 스노로그`}</span>
                {'를 추가하고 로그인하여\n'}
                <span>{'매일매일 소중한 추억을 기록해보세요!'}</span>
            </Typography>
        </>
    );
};

export default PWAModalContent;
