import React, { useRef, useEffect, useState } from 'react';
import { IconButton, Stack } from '@mui/material';
import RecordBoard from '../Record/components/RecordBoard';
import ImageSaveButton from './ImageSaveButton';
import html2canvas from 'html2canvas';
import { CloseIcon, ShareIcon, CalendarIcon } from '@/components/icons';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import dayjs from 'dayjs';

const contentstyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    width: '100%',
    maxWidth: '600px',
    margin: '0 auto',
    padding: '0',
    boxSizing: 'border-box',
    position: 'relative',
    overflow: 'hidden',
};

const CalendarDetail = () => {
    const captureRef = useRef(null);
    const { userId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const selectedDate = location.state?.selectedDate
        ? dayjs(location.state.selectedDate).format('YYYY년 MM월 DD일')
        : '날짜 정보 없음';

    const [memoryData, setMemoryData] = useState(null);
    const [pageIndex, setPageIndex] = useState(0);
    const nickname = localStorage.getItem('snowballName') || '닉네임';

    useEffect(() => {
        if (location.state?.data) {
            setMemoryData(location.state.data);
            console.log('Fetched data in CalendarDetail:', location.state.data); // 데이터 확인용 잘뜨나....
        } else {
            console.log('No data found in location.state'); // 데이터가 없을 경우 메시지 출력
        }
    }, [location.state]);

    const handleSaveImage = (e) => {
        e.preventDefault();
        if (captureRef.current) {
            const element = captureRef.current;
            const scale = 2;
            html2canvas(element, {
                scale: scale,
                useCORS: true,
                backgroundColor: null,
            })
                .then((canvas) => {
                    const link = document.createElement('a');
                    link.href = canvas.toDataURL('image/png');
                    link.download = 'calendar_detail.png';
                    link.click();
                })
                .catch((error) => {
                    console.error('이미지 저장 중 오류 발생:', error);
                });
        }
    };

    const formattedDate = selectedDate
        .split(/(\d{4})(년)|(\d{2})(월)|(\d{2})(일)/)
        .map((part, index) =>
            part && /\d/.test(part) ? (
                <span key={index} style={{ color: '#DDB892' }}>
                    {part}
                </span>
            ) : (
                part && (
                    <span key={index} style={{ color: 'white' }}>
                        {part}
                    </span>
                )
            )
        );

    const handleClose = () => {
        navigate(`/main/${userId}`);
    };

    const handleCalendarClick = () => {
        navigate(-1);
    };

    const memoriesArray = memoryData
        ? [...(memoryData.my_memory || []), ...(memoryData.memories || [])]
        : [];
    const totalItems = memoriesArray.length;

    const handlePrevious = () => {
        setPageIndex((prev) => (prev > 0 ? prev - 1 : prev));
    };

    const handleNext = () => {
        setPageIndex((prev) => (prev < totalItems - 1 ? prev + 1 : prev));
    };

    const currentItem = memoriesArray[pageIndex];

    return (
        <Stack sx={contentstyle}>
            <Stack
                direction='row'
                alignItems='center'
                justifyContent='space-between'
                sx={{
                    position: 'absolute',
                    top: 'calc(1rem + 30px)',
                    left: '1rem',
                    right: '1rem',
                    zIndex: 10,
                    color: 'white',
                    fontFamily: 'Griun NltoTAENGGU, sans-serif',
                }}
            >
                <CloseIcon
                    sx={{
                        cursor: 'pointer',
                        position: 'relative',
                        right: '-30px',
                    }}
                    onClick={handleClose}
                />
                <span style={{ fontSize: '1.4rem' }}>{'2024년 10월 26일'}</span>
                <ShareIcon
                    sx={{
                        cursor: 'pointer',
                        position: 'relative',
                        left: '-30px',
                    }}
                />
                <span style={{ fontSize: '1.4rem' }}>{formattedDate}</span>
                <IconButton
                    onClick={handleCalendarClick}
                    sx={{ position: 'relative', left: '-30px' }}
                >
                    <CalendarIcon />
                </IconButton>
            </Stack>

            <Stack
                ref={captureRef}
                sx={{
                    width: '100%',
                    minHeight: '100vh',
                    padding: '1.5rem',
                    background:
                        'linear-gradient(180deg, #0b0a1b 0%, #27405e 100%)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    paddingTop: '12rem',
                }}
            >
                {currentItem ? (
                    <>
                        <span
                            style={{
                                position: 'absolute',
                                top: 'calc(10px + 9rem)',
                                left: '9.5rem',
                                color: 'white',
                                fontSize: '1.3rem',
                                fontFamily: 'Griun NltoTAENGGU, sans-serif',
                            }}
                        >
                            {currentItem.daily_question?.question
                                ? currentItem.daily_question.question
                                : `To. ${nickname}`}
                        </span>

                        <RecordBoard
                            content={currentItem.answer}
                            image_url={currentItem.image_url}
                            isReadOnly={true}
                        />

                        <span
                            style={{
                                color: 'white',
                                fontSize: '1.3rem',
                                fontFamily: 'Griun NltoTAENGGU, sans-serif',
                                textAlign: 'center',
                                marginLeft: '200px',
                            }}
                        >
                            {currentItem.writer
                                ? `From. ${currentItem.writer}`
                                : ''}
                        </span>
                    </>
                ) : (
                    <span style={{ color: 'white' }}>
                        보관된 추억이 없습니다.
                    </span>
                )}
            </Stack>

            <Stack
                component='form'
                sx={{
                    position: 'relative',
                    marginTop: '-22rem',
                }}
            >
                <ImageSaveButton onClick={handleSaveImage} />
            </Stack>

            <Stack
    direction="row"
    alignItems="center"
    justifyContent="space-between"
    sx={{
        width: '568px',
        padding: '1rem',
        backgroundColor: '#3a3a3a',
        color: 'white',
        position: 'fixed',
        bottom: '5px', 
        left: '50%',
        transform: 'translateX(-50%)',
    }}
>
    <span 
        style={{ 
            cursor: pageIndex === 0 ? 'not-allowed' : 'pointer', 
            opacity: pageIndex === 0 ? 0.5 : 1,
            fontFamily: 'Griun NltoTAENGGU, sans-serif' 
        }}
        onClick={handlePrevious}
    >
        이전
    </span>
    <span 
        style={{ 
            cursor: pageIndex === totalItems - 1 ? 'not-allowed' : 'pointer', 
            opacity: pageIndex === totalItems - 1 ? 0.5 : 1,
            fontFamily: 'Griun NltoTAENGGU, sans-serif' 
        }}
        onClick={handleNext}
    >
        다음
    </span>
</Stack>

        </Stack>
    );
};

export default CalendarDetail;
