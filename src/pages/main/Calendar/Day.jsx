import { Box, Typography, useTheme } from '@mui/material';
import React from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';

// 플러그인 활성화
dayjs.extend(isSameOrAfter);
dayjs.extend(utc);
dayjs.extend(timezone);

// 위치 설정
const rightPosition = {
    position: 'absolute',
    top: 0,
    right: 6,
};

const middlePosition = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
};

// 스타일 및 날짜 관련 설정 추상화
const Day = ({ time, hasWritten, date, styleConfig }) => {
    const theme = useTheme();

    const startOfPeriod = dayjs(`${dayjs(time).year()}-11-30`).startOf('day');
    const endOfPeriod = startOfPeriod.add(31, 'day').startOf('day');
    const currentDay = startOfPeriod.add(date, 'day').startOf('day');
    const today = dayjs(time).startOf('day');

    // 기본 스타일
    let style = {};
    let color = theme.palette.custom.white;
    let imgDisplay = 'none';

    // 기록 작성 가능 기간: 11월 30일 ~ 12월 31일 (범위 내)
    if (
        today.isBefore(endOfPeriod.add(1, 'day')) &&
        today.isSameOrAfter(startOfPeriod)
    ) {
        console.log('기록 작성 가능 기간');
        if (hasWritten) {
            // 작성 완료: 오늘과 지나간 날 동일 스타일
            style.backgroundColor = 'rgba(255, 252, 250, 0.40)';
            color = theme.palette.custom.font;
            imgDisplay = 'block';
        } else if (currentDay.isSame(today, 'day')) {
            // 오늘 작성 안함
            style.border = `1px solid ${theme.palette.custom.white}`;
            style.backgroundColor = theme.palette.custom.white;
            color = theme.palette.custom.font;
        } else if (currentDay.isAfter(today)) {
            // 미래 날짜
            style.border = `1px solid ${theme.palette.custom.white}`;
        } else {
            // 지나간 날짜 작성 안함
            style.backgroundColor = 'rgba(255, 252, 250, 0.1)';
        }
    }

    // 기록 공개 기간: 12월 31일 이후
    if (today.isAfter(endOfPeriod) || today.isBefore(startOfPeriod)) {
        imgDisplay = 'block';
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
        <Box
            sx={{
                position: 'relative',
                boxSizing: 'border-box',
                width: '100%',
                minWidth: 0,
                minHeight: 0,
                ...styleConfig.boxStyle,
            }}
        >
            <img
                src={`/assets/calendar/puzzle_${date}.svg`}
                style={{
                    zIndex: 0,
                    display: imgDisplay,
                    pointerEvents: 'none',
                    width: '100%',
                    height: '100%',
                    ...middlePosition,
                }}
            />
            <Box
                sx={{
                    zIndex: 1,
                    width: '100%',
                    height: '100%',
                    ...middlePosition,
                    ...style,
                }}
            >
                <Typography
                    sx={{
                        color: color,
                        pointerEvents: 'none',
                        ...(styleConfig.position === 'right'
                            ? rightPosition
                            : middlePosition),
                    }}
                    variant={styleConfig.variant}
                >
                    {date ? date : '11.30'}
                </Typography>
            </Box>
        </Box>
    );
};

export default Day;
