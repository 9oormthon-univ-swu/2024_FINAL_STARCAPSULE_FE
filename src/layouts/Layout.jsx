import { Container } from '@mui/material';
import React from 'react';

const Layout = ({ children }) => {
    return (
        <Container
            maxWidth={'sm'}
            sx={{
                minHeight: '100svh',
                // py: 0,
            }}
        >
            {children}
        </Container>
    );
};

export default Layout;
