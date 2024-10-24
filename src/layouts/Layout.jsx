import { Container } from '@mui/material';
import zIndex from '@mui/material/styles/zIndex';
import React from 'react';
import Snowfall from 'react-snowfall';

const Layout = ({ sx, snow, snowflake, overlay, children }) => {
    return (
        <Container
            maxWidth={'sm'}
            sx={{
                minHeight: '100dvh',
                boxSizing: 'border-box',

                background: `
                            ${overlay ? 'linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),' : ''}
                            ${snow ? "url('/assets/background_bottom.svg') bottom center / contain no-repeat," : ''}
                            linear-gradient(0deg, #27405e 0%, #0b0a1b 100%)`,
                overflow: 'hidden',
                px: 3,
                ...sx,
            }}
        >
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
