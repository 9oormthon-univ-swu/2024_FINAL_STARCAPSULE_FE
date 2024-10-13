import { Container } from '@mui/material';
import React from 'react';
import Snowfall from 'react-snowfall';

const Layout = ({ sx, snow, snowflake, children }) => {
    return (
        <Container
            maxWidth={'sm'}
            sx={{
                minHeight: '100dvh',
                boxSizing: 'border-box',
                background: 'linear-gradient(0deg, #27405e 0%, #0b0a1b 100%)',
                overflow: 'hidden',
                px: 3,
                ...sx,
            }}
        >
            {snow && (
                <img
                    src={'/assets/background_bottom.svg'}
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
            {snowflake && (
                <Snowfall
                    color='#ffffffaa'
                    snowflakeCount={70}
                    speed={[0, 0.5]}
                    wind={[0, 0.5]}
                    radius={[0.5, 3]}
                />
            )}
            {children}
        </Container>
    );
};

export default Layout;
