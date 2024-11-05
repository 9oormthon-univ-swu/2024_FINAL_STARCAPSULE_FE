import { Button, Stack, Typography } from '@mui/material';
import React from 'react';
import styled from 'styled-components';
import Layout from '@/layouts/Layout';
import { useNavigate } from 'react-router-dom';

const Error500 = () => {
    const navigate = useNavigate();

    //뒤로 돌아가는 버튼
    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <Layout sx={{ overflow: 'hidden' }} snow>
            <ErrorContainer>
                <Stack>
                    <Typography variant='Heading1'>UNKNOWN ERROR</Typography>
                </Stack>
                <ErrorFavicon src={'/FaviconError.svg'}></ErrorFavicon>
                <Stack>
                    <Typography
                        variant='subtitle1'
                        sx={{
                            color: 'custom.grey',
                            lineHeight: '2rem',
                        }}
                    >
                        알 수 없는 에러가 발생했습니다.
                    </Typography>
                </Stack>
            </ErrorContainer>
            <Button variant='contained' sx={formbtn} onClick={handleGoBack}>
                <Typography variant='title2' sx={{ color: 'custom.white' }}>
                    뒤로 가기
                </Typography>
            </Button>
        </Layout>
    );
};
export default Error500;

const ErrorContainer = styled.div`
    display: flex;
    width: 80%;
    maxwidth: 400px;
    min-height: 90vh;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    margin: 0 auto;
    overflow: hidden;
`;

const ErrorFavicon = styled.img`
    width: 5.4rem;
    height: 6.25rem;
    padding: 1rem;
`;

const formbtn = {
    width: '100%',
    height: '3.875rem',
    padding: '1.25rem 6.8125rem',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '1.25rem',
    color: 'custom.white',
    background: '#7F5539',
    boxShadow: '0px 0px 4px 0px rgba(40, 40, 40, 0.20)',
    fontFamily: 'Noto Sans',
    whiteSpace: 'nowrap',
};
