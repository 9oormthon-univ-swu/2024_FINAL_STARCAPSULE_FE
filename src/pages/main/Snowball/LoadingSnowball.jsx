import Layout from '@/layouts/Layout';
import React from 'react';

const LoadingSnowball = () => {
    return (
        <Layout
            snow
            snowflake
            sx={{
                overflow: 'hidden',
            }}
        ></Layout>
    );
};

export default LoadingSnowball;
