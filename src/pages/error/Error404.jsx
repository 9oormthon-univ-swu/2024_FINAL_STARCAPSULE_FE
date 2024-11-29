import { Button, Stack, Typography, Container } from '@mui/material';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import Layout from '@/layouts/Layout';
import { useNavigate, useParams } from 'react-router-dom';
import { useUserStore } from '@/stores/useUserStore';

const Error404 = () => {
    const navigate = useNavigate();
    const params = useParams();
    const { userId } = useUserStore();

    useEffect(() => {
        if (params.userId != null) navigate(`/main/${userId}`);
    });

    const handleGoMain = () => {
        navigate(`/main/${userId}`);
        console.log(userId);
    };
    useEffect(() => {
        document.body.style.margin = '0';
        document.body.style.padding = '0';
        document.body.style.overflow = 'hidden';
    }, []);

    return (
        <Layout sx={{ overflow: 'hidden' }} snow>
            <ErrorContainer>
                <Stack sx={errorContent}>
                    <Stack>
                        <Typography variant='Heading1'>
                            PAGE NOT FOUND
                        </Typography>
                    </Stack>
                    <ErrorFavicon src={'/Favicon_256.svg'}></ErrorFavicon>
                    <Stack>
                        <Typography
                            variant='subtitle1'
                            sx={{
                                textAlign: 'center',
                                color: '#282828',
                                lineHeight: '2rem',
                                wordWrap: 'break-word',
                                alignSelf: 'stretch',
                            }}
                        >
                            <p>존재하지 않는 주소를 입력하셨거나</p>
                            <p>요청하신 페이지의 주소가 변경, 삭제되어</p>
                            <p>찾을 수 없어요.</p>
                        </Typography>
                    </Stack>
                </Stack>
                <Stack
                    sx={{
                        width: '100%',
                        height: '100%',
                    }}
                >
                    <Button
                        variant='contained'
                        sx={formbtn}
                        onClick={handleGoMain}
                    >
                        <Typography
                            variant='title2'
                            sx={{ color: 'custom.white' }}
                        >
                            스노우볼로 가기
                        </Typography>
                    </Button>
                </Stack>
            </ErrorContainer>
        </Layout>
    );
};
export default Error404;

const ErrorContainer = styled.div`
    display: flex;
    height: 100%;
    min-height: 100dvh;
    padding: 0rem 2.25rem;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
`;

const ErrorFavicon = styled.img`
    width: 5.4rem;
    height: 6.25rem;
`;

const errorContent = {
    height: '75dvh',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '1rem',
    padding: '0rem 2.25rem',
};

const formbtn = {
    display: 'flex',
    height: '3.875rem',
    width: '100%',
    borderRadius: '1.25rem',
    color: 'custom.white',
    background: '#405EAB',
    boxShadow: '0px 0px 4px 0px rgba(40, 40, 40, 0.20)',
    padding: '1.25rem 6.8125rem',
    alignItems: 'center',
    gap: '0.625rem',
    flexShrink: '0',
};
