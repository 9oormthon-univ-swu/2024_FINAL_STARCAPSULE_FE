import { Container } from '@mui/material';
import React from 'react';

const Layout = ({ sx, children }) => {
    return (
        <Container
            maxWidth={'sm'}
            sx={{
                minHeight: '100svh',
                boxSizing: 'border-box',
                ...sx,
            }}
        >
            {children}
        </Container>
    );
};

export default Layout;
