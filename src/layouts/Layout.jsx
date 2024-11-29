import { Container } from '@mui/material';
import { motion } from 'framer-motion';
import React from 'react';
import Snowfall from 'react-snowfall';

const Layout = ({ sx, snow, snowflake, overlay, children, id }) => {
    return (
        <Container
            id={id}
            maxWidth={'sm'}
            sx={{
                minHeight: '100dvh',
                boxSizing: 'border-box',
                background: `
                            ${overlay ? 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),' : ''}
                            ${snow ? "url('/assets/background_bottom.svg') bottom center / contain no-repeat," : ''}
                            linear-gradient(0deg, #93C2DF 0%, #C3DEF7 59%, #B6D8E1 100%)`,
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
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                    }}
                />
            )}
            <motion.div
                id='layout'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                sx={{
                    width: '100%',
                    height: '100%',
                    padding: '1.5rem',
                    boxSizing: 'border-box',
                }}
            >
                {children}
            </motion.div>
        </Container>
    );
};

export default Layout;
