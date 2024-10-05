import { Container } from '@mui/material';
import React from 'react';

const Layout = ({ sx, children }) => {
    return (
        <Container
            maxWidth={'sm'}
            sx={{
                minHeight: '100dvh',
                boxSizing: 'border-box',
                background: 'linear-gradient(0deg, #27405e 0%, #0b0a1b 100%)',
                ...sx,
            }}
        >
            {children}
        </Container>
    );
};

export default Layout;
