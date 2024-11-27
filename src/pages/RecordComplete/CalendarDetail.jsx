import React, { useRef, useEffect, useState } from 'react';
import { IconButton, Stack } from '@mui/material';
import RecordBoard from '../Record/components/RecordBoard';
import ImageSaveButton from './ImageSaveButton';
import html2canvas from 'html2canvas';
import { CloseIcon, CalendarIcon } from '@/components/icons';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import dayjs from 'dayjs';

const contentstyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    minHeight: '100dvh',
    maxHeight: '100dvh',
    width: '100%',
    maxWidth: '600px',
    margin: '0 auto',
    padding: '0',
    boxSizing: 'border-box',
    position: 'relative',
    overflowY: 'auto',
    overflowX: 'hidden',
    background: 'linear-gradient(180deg, #0b0a1b 0%, #27405e 100%)',
    '&::-webkit-scrollbar': {
        display: 'none',
    },
    '-ms-overflow-style': 'none',
    'scrollbar-width': 'none',
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
            //console.log('Fetched data in CalendarDetail:', location.state.data);
        } else {
            //console.log('No data found in location.state');
        }
    }, [location.state]);

    useEffect(() => {
        const handlePopState = () => {
            navigate(`/calendar/${userId}`); 
        };

        window.addEventListener('popstate', handlePopState);

        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, [navigate, userId]);

    const handleSaveImage = (e) => {
        e.preventDefault();
        if (captureRef.current) {
            const element = captureRef.current;
            const elementHeight = element.scrollHeight;

            html2canvas(element, {
                scale: 2,
                useCORS: true,
                backgroundColor: '#132034',
                height: elementHeight,
                windowHeight: elementHeight,
            })
            .then((canvas) => {
                const link = document.createElement('a');
                const formattedDateForFilename = dayjs(location.state?.selectedDate).format('YYYY-MM-DD');
                link.href = canvas.toDataURL('image/png');
                link.download = `${formattedDateForFilename}.png`;
                link.click();
            })
                .catch((error) => {
                    //console.error('이미지 저장 중 오류 발생:', error);
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
        navigate(`/main/${userId}?page=1`);
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
                    top: 'calc(1rem + 15px)',
                    left: '1rem',
                    right: '1rem',
                    zIndex: 10,
                    color: 'white',
                    fontFamily: 'Griun NltoTAENGGU, sans-serif',
                }}
            >
                <IconButton onClick={handleClose}>
                    <CloseIcon
                        sx={{
                            cursor: 'pointer',
                            position: 'relative',
                            right: '-30px',
                        }}
                    />
                </IconButton>
                <span style={{ fontSize: '1.4rem' }}>{formattedDate}</span>
                <IconButton onClick={handleCalendarClick}>
                    <CalendarIcon
                        sx={{
                            cursor: 'pointer',
                            position: 'relative',
                            left: '-30px',
                            color: 'white'
                        }}
                    />
                </IconButton>
            </Stack>
            <Stack
                ref={captureRef}
                sx={{
                    width: '100%',
                    maxWidth: '300px',
                    padding: '1.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    overflow: 'visible',
                    marginTop: '6.5rem',
                }}
            >
                {currentItem && (
                    <>
                        <span
                            style={{
                                position: 'relative',
                                color: 'white',
                                fontSize: '1.3rem',
                                fontFamily: 'Griun NltoTAENGGU, sans-serif',
                                marginBottom: '1rem',
                                marginLeft: currentItem.daily_question?.question
                                    ? '0'
                                    : '-200px',
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
                                marginTop: '16px',
                                marginLeft: '200px',
                            }}
                        >
                            {currentItem.writer
                                ? `From. ${currentItem.writer}`
                                : ''}
                        </span>
                    </>
                )}
            </Stack>

            <Stack
                sx={{
                    marginTop: '-2.5rem',
                    alignItems: 'center',
                    marginBottom: '3.5rem',
                }}
                data-html2canvas-ignore='true'
            >
                <ImageSaveButton onClick={handleSaveImage} />
            </Stack>

            <Stack
                direction='row'
                alignItems='center'
                justifyContent='space-between'
                data-html2canvas-ignore='true'
                sx={{
                    width: '100%',
                    height: '30px',
                    fontSize: '20px',
                    padding: '1rem',
                    backgroundColor: '#3a3a3a',
                    color: 'white',
                    position:
                        currentItem && currentItem.answer.length < 100
                            ? 'absolute'
                            : 'sticky',
                    bottom: -45,
                    zIndex: 10,
                    marginTop: '1rem',
                }}
            >
                <span
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        cursor: pageIndex === 0 ? 'not-allowed' : 'pointer',
                        opacity: pageIndex === 0 ? 0.5 : 1,
                        pointerEvents: pageIndex === 0 ? 'none' : 'auto',
                        fontFamily: 'Griun NltoTAENGGU, sans-serif',
                        marginLeft: '15px',
                    }}
                    onClick={handlePrevious}
                >
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='24'
                        height='24'
                        viewBox='0 0 24 24'
                        fill='none'
                    >
                        <path
                            d='M15 6L9 12L15 18'
                            stroke='#D5D1CD'
                            strokeWidth='2'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                        />
                    </svg>
                    이전
                </span>
                <span
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        cursor:
                            pageIndex === totalItems - 1
                                ? 'not-allowed'
                                : 'pointer',
                        opacity: pageIndex === totalItems - 1 ? 0.5 : 1,
                        pointerEvents:
                            pageIndex === totalItems - 1 ? 'none' : 'auto',
                        fontFamily: 'Griun NltoTAENGGU, sans-serif',
                        marginRight: '15px',
                    }}
                    onClick={handleNext}
                >
                    다음
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='24'
                        height='24'
                        viewBox='0 0 24 24'
                        fill='none'
                    >
                        <path
                            d='M9 18L15 12L9 6'
                            stroke='#D5D1CD'
                            strokeWidth='2'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                        />
                    </svg>
                </span>
            </Stack>
        </Stack>
    );
};

export default CalendarDetail;
