import React, { useRef, useEffect, useState } from 'react';
import { Stack } from '@mui/material';
import RecordBoard from '../Record/components/RecordBoard';
import ImageSaveButton from './ImageSaveButton';
import html2canvas from 'html2canvas';
import CloseIcon from '@/components/icons/closeicon';
import CalendarIcon from '@/components/icons/CalendarIcon';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import dayjs from 'dayjs';

const contentstyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '99vh',
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
        ? dayjs(location.state.selectedDate).format("YYYY년 MM월 DD일")
        : "날짜 정보 없음";

    const [memoryData, setMemoryData] = useState(null);
    const [pageIndex, setPageIndex] = useState(0);
    const nickname = localStorage.getItem('snowballName') || '닉네임';

    useEffect(() => {
        if (location.state?.data) {
            setMemoryData(location.state.data);
            console.log("Fetched data in CalendarDetail:", location.state.data);
        } else {
            console.log("No data found in location.state");
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
            }).then((canvas) => {
                const link = document.createElement('a');
                link.href = canvas.toDataURL('image/png');
                link.download = 'calendar_detail.png';
                link.click();
            }).catch((error) => {
                console.error('이미지 저장 중 오류 발생:', error);
            });
        }
    };

    const formattedDate = selectedDate.split(/(\d{4})(년)|(\d{2})(월)|(\d{2})(일)/).map((part, index) =>
        part && /\d/.test(part) ? (
            <span key={index} style={{ color: '#DDB892' }}>{part}</span>
        ) : (
            part && <span key={index} style={{ color: 'white' }}>{part}</span>
        )
    );

    const handleClose = () => {
        navigate(`/main/${userId}?page=1`);
    };

    const handleCalendarClick = () => {
        navigate(-1);
    };

    const memoriesArray = memoryData ? [...(memoryData.my_memory || []), ...(memoryData.memories || [])] : [];
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
                direction="row"
                alignItems="center"
                justifyContent="space-between"
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
                <CloseIcon
                    sx={{ cursor: 'pointer', position: 'relative', right: '-30px' }}
                    onClick={handleClose}
                />
                <span style={{ fontSize: '1.4rem' }}>
                    {formattedDate}
                </span>
                <CalendarIcon
                    sx={{ cursor: 'pointer', position: 'relative', left: '-30px' }}
                    onClick={handleCalendarClick}
                />
            </Stack>

            <Stack 
    ref={captureRef} 
    sx={{
        width: '100%',
        minHeight: 'calc(100vh - 8rem)',  // 기본 높이를 화면 크기에 맞추되, 불필요한 여백을 줄임
        padding: '1.5rem',
        background: 'linear-gradient(180deg, #0b0a1b 0%, #27405e 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: '7rem',
        overflowX: 'hidden',
        overflowY: 'auto',  // 내용이 많을 때만 세로 스크롤 허용
    }}
>

                {currentItem ? (
                    <>
                        <span style={{ 
                            position: 'absolute',
                            top: 'calc(10px + 4rem)', 
                            left: '9.5rem',
                            color: 'white',
                            fontSize: '1.3rem',
                            fontFamily: 'Griun NltoTAENGGU, sans-serif',
                        }}>
                            {currentItem.daily_question?.question 
                                ? currentItem.daily_question.question 
                                : `To. ${nickname}`}
                        </span>

                        <RecordBoard
                            content={currentItem.answer}
                            image_url={currentItem.image_url}
                            isReadOnly={true}
                        />

<span style={{
    color: 'white',
    fontSize: '1.3rem',
    fontFamily: 'Griun NltoTAENGGU, sans-serif',
    marginLeft: '200px',
    marginTop: '16px',  // 여백 추가
}}>
    {currentItem.writer ? `From. ${currentItem.writer}` : ''}
</span>


                        <Stack 
                            sx={{ 
                                marginTop: '0rem',  // 리코드보드 길이에 따라 아래 위치
                                alignItems: 'center'
                            }}
                            data-html2canvas-ignore="true"
                        >
                            <ImageSaveButton onClick={handleSaveImage} />
                        </Stack>

                        <Stack
    direction="row"
    alignItems="center"
    justifyContent="space-between"
    data-html2canvas-ignore="true"
    sx={{
        width: '100%',
        height: '30px', 
        fontSize: '20px',
        padding: '1rem',
        backgroundColor: '#3a3a3a',
        color: 'white',
        position: currentItem && currentItem.answer.length < 100 ? 'absolute' : 'sticky',  // 짧을 때는 화면 끝에 위치
        bottom: 0,
        zIndex: 10,
        marginTop: '1rem'
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
            marginLeft: '15px'
        }}
        onClick={handlePrevious}
    >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 6L9 12L15 18" stroke="#D5D1CD" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        이전
    </span>
    <span 
        style={{ 
            display: 'flex', 
            alignItems: 'center', 
            cursor: pageIndex === totalItems - 1 ? 'not-allowed' : 'pointer', 
            opacity: pageIndex === totalItems - 1 ? 0.5 : 1,
            pointerEvents: pageIndex === totalItems - 1 ? 'none' : 'auto',
            fontFamily: 'Griun NltoTAENGGU, sans-serif',
            marginRight: '15px' 
        }}
        onClick={handleNext}
    >
        다음
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M9 18L15 12L9 6" stroke="#D5D1CD" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    </span>
</Stack>

                    </>
                ) : (
                    <span style={{ color: 'white' }}>보관된 추억이 없습니다.</span>
                )}
            </Stack>
        </Stack>
    );
};

export default CalendarDetail;
