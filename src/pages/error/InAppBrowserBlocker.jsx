import { Button, Stack, Typography, Box } from '@mui/material';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import Layout from '@/layouts/Layout';
import { useSearchParams } from 'react-router-dom';

const InAppBrowserBlocker = () => {
    const [searchParams] = useSearchParams();
    const currentPath = searchParams.get('redirect') || '/';
    const externalURL = `${import.meta.env.VITE_BASE_URL}${currentPath}`;

    useEffect(() => {
        // 인앱 브라우저로 접근했을 때 주소창을 externalURL로 변경
        if (
            window.navigator.standalone ||
            /iPad|iPhone|iPod/.test(navigator.userAgent)
        ) {
            window.history.replaceState(null, '', externalURL);
        }
    }, [externalURL]);

    const handleEnterBrowser = () => {
        if (/android/i.test(navigator.userAgent)) {
            window.location.href = `intent://${externalURL.replace(/^https?:\/\//, '')}#Intent;scheme=https;package=com.android.chrome;end`;
        } else if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
            // 강제 사파리 실행 불가 -> 모바일대응뷰포트강제설정
            var mobile = document.createElement('meta');
            mobile.name = 'viewport';
            mobile.content =
                'width=device-width, initial-scale=1, shrink-to-fit=no, user-scalable=no, minimal-ui';
            document.getElementsByTagName('head')[0].appendChild(mobile);
            copytoclipboard(externalURL);
            alert(
                '하단 공유아이콘을 눌르고 "Safari 열기"를 통해 접속해주시길 바랍니다.'
            );
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
                        <p>{platform}를 통해</p>
                        <p>스노로그와 함께해요☃️</p>
                    </Typography>
                </Stack>
                <ErrorFavicon src={'/Favicon_256.svg'} />
                <Stack>
                    <Typography
                        variant='subtitle1'
                        sx={{
                            color: '#282828',
                            lineHeight: '1.5rem',
                            fontSize: {
                                xs: '1rem',
                                sm: '1rem',
                                md: '1rem',
                            },
                        }}
                    >
                        <p>인앱브라우저 호환 문제로 인해</p>
                        <p>{platform}로 접속을 권장해요.</p>
                    </Typography>

                    <Box>
                        {platform === 'Safari' ? (
                            <SafrariDescript
                                src={'/Safari_InAppDescript.svg'}
                            />
                        ) : (
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
                                <p>아래 버튼을 눌러 링크를 복사하고</p>
                                <p>주소창을 길게 터치한 뒤,</p>
                                <p>‘붙여넣기 및 이동’을 누르면</p>
                                <p>정상적으로 이용할 수 있습니다.</p>
                            </Typography>
                        )}
                    </Box>
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
                    {platform !== 'Safari' && (
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
                    )}
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

const SafrariDescript = styled.img`
    padding-top: 20px;
    width: 18.75rem;
    height: 18.28rem;
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
