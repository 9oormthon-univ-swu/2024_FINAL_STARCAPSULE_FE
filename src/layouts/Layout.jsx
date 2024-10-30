import { Container } from '@mui/material';
import { motion } from 'framer-motion';
import React from 'react';
import Snowfall from 'react-snowfall';

const Layout = ({ sx, snow, snowflake, overlay, children }) => {
    return (
        <>
            {snowflake && (
                <Snowfall
                    color='#ffffffaa'
                    snowflakeCount={70}
                    speed={[0, 0.5]}
                    wind={[0, 0.5]}
                    radius={[0.5, 3]}
                    style={{
                        zIndex: 1,
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                    }}
                />
            )}
            <Container
                maxWidth={'sm'}
                sx={{
                    position: 'relative',
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
                component={motion.div}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div
                    style={{
                        position: 'relative',
                        zIndex: 2,
                        width: '100%',
                        height: '100%',
                    }}
                >
                    {children}
                </div>
            </Container>
        </>
    );
};

export default Layout;
