import { Button, Stack, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import Layout from '@/layouts/Layout';
import { useSearchParams } from 'react-router-dom';

const InAppBrowserBlocker = () => {
    const [searchParams] = useSearchParams();

    const handleEnterBrowser = () => {
        const currentPath = searchParams.get('redirect') || '/';
        const externalURL = `${import.meta.env.VITE_BASE_URL}${currentPath}`;

        if (/android/i.test(navigator.userAgent)) {
            window.location.href = `intent://${externalURL.replace(/^https?:\/\//, '')}#Intent;scheme=https;package=com.android.chrome;end`;
        } else if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
            // 강제 사파리 실행 불가 -> 모바일대응뷰포트강제설정
            var mobile = document.createElement('meta');
            mobile.name = 'viewport';
            mobile.content =
                'width=device-width, initial-scale=1, shrink-to-fit=no, user-scalable=no, minimal-ui';
            document.getElementsByTagName('head')[0].appendChild(mobile);
            alert(
                '팝업 차단이 활성화되어 있습니다. Safari 브라우저에서 직접 열어주세요.'
            );
            copytoclipboard(externalURL);
        } else {
            window.location.href = externalURL;
        }
    };

    const copytoclipboard = (val) => {
        var t = document.createElement('textarea');
        document.body.appendChild(t);
        t.value = val;
        t.select();
        document.execCommand('copy');
        document.body.removeChild(t);
    };

    useEffect(() => {
        document.body.style.margin = '0';
        document.body.style.padding = '0';
        document.body.style.overflow = 'hidden';
    }, []);

    const detectPlatform = () => {
        const userAgent =
            navigator.userAgent || navigator.vendor || window.opera;

        if (/android/i.test(userAgent)) {
            return 'Chrome';
        }
        if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
            return 'Safari';
        } else {
            return 'Chrome';
        }
    };
    const platform = detectPlatform();

    return (
        <Layout snow>
            <ErrorContainer>
                <Stack>
                    <Typography
                        variant='Heading1'
                        sx={{
                            fontSize: {
                                xs: '1.3rem',
                                sm: '1.5rem',
                                md: '1.5rem',
                            },
                        }}
                    >
                        {platform} 접속을 권장해요.
                    </Typography>
                </Stack>
                <ErrorFavicon src={'/Favicon_256.svg'} />
                <Stack>
                    <Typography
                        variant='subtitle1'
                        sx={{
                            color: '#282828',
                            lineHeight: '2rem',
                            fontSize: {
                                xs: '1rem',
                                sm: '1rem',
                                md: '1rem',
                            },
                        }}
                    >
                        <p>브라우저 호환 문제로 인해</p>
                        <p>{platform}로 접속을 권장해요.</p>
                    </Typography>
                    <Typography
                        variant='subtitle1'
                        sx={{
                            paddingTop: '20px',
                            color: '#282828',
                            lineHeight: '2rem',
                            fontSize: {
                                xs: '1rem',
                                sm: '1rem',
                                md: '1rem',
                            },
                        }}
                    >
                        <p>아래 버튼을 눌러 {platform}로 이동하고</p>
                        <p>주소창을 길게 터치한 뒤,</p>
                        <p>‘붙여넣기 및 이동’을 누르면</p>
                        <p>정상적으로 이용할 수 있습니다.</p>
                    </Typography>
                </Stack>
                <Stack
                    sx={{
                        marginTop: {
                            xs: '2rem',
                            sm: '5rem',
                            md: '5rem',
                        },
                    }}
                >
                    <Button
                        variant='contained'
                        sx={formbtn}
                        onClick={handleEnterBrowser}
                    >
                        <Typography
                            variant='title2'
                            sx={{
                                color: 'custom.white',
                            }}
                        >
                            {platform} 열기
                        </Typography>
                    </Button>
                </Stack>
            </ErrorContainer>
        </Layout>
    );
};

export default InAppBrowserBlocker;

const ErrorContainer = styled.div`
    display: flex;
    width: 100%;
    height: 100dvh;
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
    background: '#405EAB',
    boxShadow: '0px 0px 4px 0px rgba(40, 40, 40, 0.20)',
    fontFamily: 'Noto Sans',
    whiteSpace: 'nowrap',
};
