import { Button, Stack, Typography } from '@mui/material';
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

    //메인으로 돌아가는 버튼
    const handleGoMain = () => {
        navigate(`/main/${userId}`);
        console.log(userId);
    };

    return (
        <Layout sx={{ overflow: 'hidden' }} snow>
            <ErrorContainer>
                <Stack>
                    <Typography variant='Heading1'>PAGE NOT FOUND</Typography>
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
                        존재하지 않는 주소를 입력하셨거나
                        <br />
                        요청하신 페이지의 주소가 변경, 삭제되어
                        <br />
                        찾을 수 없어요.
                    </Typography>
                </Stack>
            </ErrorContainer>
            <Button variant='contained' sx={formbtn} onClick={handleGoMain}>
                <Typography variant='title2' sx={{ color: 'custom.white' }}>
                    스노우볼로 가기
                </Typography>
            </Button>
        </Layout>
    );
};
export default Error404;

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
