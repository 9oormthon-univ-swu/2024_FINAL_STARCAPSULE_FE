import { Container } from '@mui/material';
import React from 'react';
import background_bottom from '@/assets/background_bottom.png';

const Layout = ({ sx, snow, children }) => {
    return (
        <Container
            maxWidth={'sm'}
            sx={{
                minHeight: '100dvh',
                boxSizing: 'border-box',
                ...sx,
            }}
        >
            {snow && (
                <img
                    src={background_bottom}
                    alt='눈 쌓인 배경 이미지'
                    aria-hidden='true'
                    style={{
                        width: '100%',
                        maxWidth: '600px',
                        position: 'absolute',
                        bottom: 0,
                        left: '50%',
                        transform: 'translateX(-50%)',
                    }}
                />
            )}
            {children}
        </Container>
    );
};

export default Layout;
