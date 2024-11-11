import { Stack, Typography, useTheme } from '@mui/material';
import { Button } from '@mui/base';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import { useParams } from 'react-router-dom';
import { useSnackbarStore } from '@/stores/useSnackbarStore';

// 플러그인 활성화
dayjs.extend(isSameOrAfter);
dayjs.extend(utc);
dayjs.extend(timezone);

const containerStyle = {
    boxSizing: 'border-box',
    width: '100%',
    height: 'auto',
    minWidth: 0,
    minHeight: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundBlendMode: 'overlay',
    overflow: 'hidden',
    position: 'relative',
};

const dayButtonStyle = {
    width: '100%',
    p: 0,
    boxSizing: 'border-box',
};

const triangleStyle = {
    width: '100%',
    aspectRatio: '180.5/37',
    position: 'absolute',
    top: '0',
    left: '50%',
    transform: 'translateX(-50%)',
    pointerEvents: 'none',
};

// 스타일 및 날짜 관련 설정 추상화
const Day = ({ time, hasWritten, date, styleConfig, recordable, year }) => {
    /*
        20xx-11-30 ~ 20xx-12-31: 작성 가능
        20xx-12-31 ~ 20xx-11-29: 작성 불가능, 작년 기록으로 조회해야함
        
        작업자의 판단 : 구름톤 유니브 4기에서 작년도 기록을 확인 할 수 있도록 리펙토링 해야함.
        따라서 Calendar 컴포넌트에서 Day 컴포넌트로 몇 년도 캘린더인지 알 수 있는 year를 제공하는 것으로 처리함.
    */
    const theme = useTheme();
    const navigate = useNavigate();
    const { userId } = useParams();
    const { setSnackbarOpen } = useSnackbarStore();

    const today = dayjs(time).startOf('day');
    const startOfPeriod = dayjs(`${year}-11-30`).startOf('day');
    const currentDay = startOfPeriod.add(date, 'day').startOf('day');

    const dateInFormat = currentDay.format('YYYY-MM-DD');

    const handleClick = async () => {
        const token = localStorage.getItem('token');
        const apiUrl = `${import.meta.env.VITE_API_URL}/calendar/memories/${dateInFormat}`;

        //console.log(`${dateInFormat} clicked`);
        try {
            const response = await axios.get(apiUrl, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // 데이터 확인 후 이동 또는 알림 처리 my_memory, memorie가 둘다 없을 경우
            if (
                (response.data.result &&
                    response.data.result.my_memory &&
                    response.data.result.my_memory.length > 0) ||
                (response.data.result &&
                    response.data.result.memories &&
                    response.data.result.memories.length > 0)
            ) {
                // 데이터가 존재할 때 상세 페이지로 이동
                navigate(`/calendar-detail/${userId}`, {
                    state: {
                        data: response.data.result,
                        selectedDate: dateInFormat,
                    },
                });
            } else {
                setSnackbarOpen({
                    text: '보관된 추억이 없습니다.',
                    severity: 'warning',
                });
            }
        } catch (error) {
            //console.error('Error fetching memory data:', error);
        }
    };

    // 기본 스타일
    let style = {
        backgroundColor: 'transparent',
        border: 'none',
    };
    let color = theme.palette.custom.white;
    let imgDisplay = false;
    let triangleDisplay = false;

    // 기록 작성 가능 기간: 11월 30일 ~ 12월 30일 (범위 내)
    if (recordable) {
        if (hasWritten) {
            // 작성 완료: 오늘과 지나간 날 동일 스타일
            style.backgroundColor = 'rgba(255, 252, 250, 0.40)';
            color = theme.palette.custom.font;
            imgDisplay = true;
        } else if (currentDay.isSame(today, 'day')) {
            // 오늘 작성 안함
            //console.log('today:', date);
            style.border = `1px solid ${theme.palette.custom.white}`;
            style.backgroundColor = theme.palette.custom.white;
            color = theme.palette.custom.font;
        } else if (currentDay.isAfter(today)) {
            // 미래 날짜
            style.border = `1px solid ${theme.palette.custom.white}`;
            if (date === 31) triangleDisplay = true;
        } else {
            // 지나간 날짜 작성 안함
            style.backgroundColor = 'rgba(255, 252, 250, 0.1)';
        }
    }

    // 기록 공개 기간: 12월 31일 이후
    if (recordable === false) {
        imgDisplay = true;
        if (hasWritten) {
            // 작성 완료
            style.backgroundColor = 'transparent';
            color = 'transparent';
        } else {
            // 작성 안함
            style.backgroundColor = 'rgba(255, 252, 250, 0.40)';
            color = theme.palette.custom.font;
        }
    }

    return (
        <Stack
            sx={{
                backgroundImage: imgDisplay
                    ? `url("/assets/calendar/puzzle_${date}.svg")`
                    : 'none',
                backgroundColor: style.backgroundColor,
                ...containerStyle,
                ...styleConfig.boxStyle,
            }}
            justifyContent={'center'}
            alignItems={'center'}
        >
            <Stack
                sx={{
                    border: style.border,
                    backgroundColor: `${style.backgroundColor} !important`,
                    ...styleConfig.boxStyle,
                    ...dayButtonStyle,
                }}
                justifyContent={
                    styleConfig.position === 'middle' && !triangleDisplay
                        ? 'center'
                        : 'flex-start'
                }
                alignItems={
                    styleConfig.position === 'middle'
                        ? 'center'
                        : styleConfig.position === 'right'
                          ? 'end'
                          : 'start'
                }
                component={Button}
                onClick={handleClick} // 클릭 이벤트 추가
            >
                <img
                    src={`/assets/calendar/triangle.svg`}
                    style={{
                        display: triangleDisplay ? 'block' : 'none',
                        width: '100%',
                        transform: 'translateY(-1px)',
                        ...triangleStyle,
                    }}
                />
                <Typography
                    sx={{
                        color: color,
                        pointerEvents: 'none',
                        transform: triangleDisplay ? 'translateY(3px)' : 0,
                        mx: '6px',
                    }}
                    variant={triangleDisplay ? 'number2' : styleConfig.variant}
                >
                    {date ? date : '11.30'}
                </Typography>
            </Stack>
        </Stack>
    );
};

export default Day;
