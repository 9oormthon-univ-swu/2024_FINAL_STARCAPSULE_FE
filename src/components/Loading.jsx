import Layout from '@/layouts/Layout';
import { Backdrop, CircularProgress } from '@mui/material';
import React from 'react';

// 단순하게 처리한 로딩 컴포넌트, api 호출 후 로딩 중일 때 사용
const Loading = () => {
    return (
        <Layout
            snow
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Backdrop open>
                <CircularProgress
                    thickness={5}
                    sx={{ color: 'custom.main1' }}
                />
            </Backdrop>
        </Layout>
    );
};

export default Loading;
