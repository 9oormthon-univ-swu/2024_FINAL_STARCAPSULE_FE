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
            <Typography variant='subtitle2' color='#282828' fontWeight={'700'}>
                홈 화면에
                <Typography
                    component='span'
                    sx={{ color: 'custom.button2' }}
                    variant='subtitle2'
                    fontWeight={'700'}
                >
                    {` 스노로그`}
                </Typography>
                를 추가하고 로그인하면
                <Typography variant='title4' color='#63422C'>
                    새로운 질문을 받아볼 수 있어요.
                </Typography>
            </Typography>
        </>
    );
};

export default PWAModalContent;
