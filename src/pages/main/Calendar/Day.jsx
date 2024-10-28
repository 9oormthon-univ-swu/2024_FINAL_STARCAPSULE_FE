import { Stack, Typography, useTheme } from '@mui/material';
import { Button } from '@mui/base';
import React from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';

// 플러그인 활성화
dayjs.extend(isSameOrAfter);
dayjs.extend(utc);
dayjs.extend(timezone);

// 스타일 및 날짜 관련 설정 추상화
const Day = ({
    time,
    hasWritten,
    date,
    styleConfig,
    lastDayWritten,
    recordable,
    year,
}) => {
    console.log('time', time);
    console.log('hasWritten', hasWritten);
    console.log('date', date);
    console.log('styleConfig', styleConfig);
    console.log('lastDayWritten', lastDayWritten);
    console.log('recordable', recordable);
    console.log('year', year);
    /*
        20xx-11-30 ~ 20xx-12-31: 작성 가능
        20xx-12-31             : 작성 완료 시 캘린더를 볼 수 있음 
        20xx-01-01 ~ 20xx-11-29: 작성 불가능, 작년 기록으로 조회해야함
        
        작업자의 판단 : 구름톤 유니브 4기에서 작년도 기록을 확인 할 수 있도록 리펙토링 해야함.
        따라서 Calendar 컴포넌트에서 Day 컴포넌트로 몇 년도 캘린더인지 알 수 있는 year를 제공하는 것으로 처리함.
    */
    const theme = useTheme();

    const today = dayjs(time).startOf('day');
    const startOfPeriod = dayjs(`${year}-11-30`).startOf('day');
    const currentDay = startOfPeriod.add(date, 'day').startOf('day');

    const dateInFormat = currentDay.format('YYYY-MM-DD');
    console.log(dateInFormat); // 이 값을 가져다가 api 요청 시 사용하면 됩니다.

    // 기본 스타일
    let style = {
        backgroundColor: 'transparent',
        border: 'none',
    };
    let color = theme.palette.custom.white;
    let imgDisplay = false;

    // 기록 작성 가능 기간: 11월 30일 ~ 12월 31일 (범위 내)
    if (recordable) {
        if (hasWritten) {
            // 작성 완료: 오늘과 지나간 날 동일 스타일
            style.backgroundColor = 'rgba(255, 252, 250, 0.40)';
            color = theme.palette.custom.font;
            imgDisplay = true;
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
    if (recordable === false || lastDayWritten) {
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
                boxSizing: 'border-box',
                width: '100%',
                height: 'auto',
                minWidth: 0,
                minHeight: 0,
                backgroundImage: imgDisplay
                    ? `url("/assets/calendar/puzzle_${date}.svg")`
                    : 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundColor: style.backgroundColor,
                backgroundBlendMode: 'overlay',
                overflow: 'hidden',
                ...styleConfig.boxStyle,
            }}
            justifyContent={'center'}
            alignItems={'center'}
        >
            <Stack
                sx={{
                    zIndex: 1,
                    width: '100%',
                    px: '6px',
                    boxSizing: 'border-box',
                    border: style.border,
                    backgroundColor: `${style.backgroundColor} !important`,
                    ...styleConfig.boxStyle,
                }}
                justifyContent={
                    styleConfig.position === 'middle' ? 'center' : 'flex-start'
                }
                alignItems={
                    styleConfig.position === 'middle'
                        ? 'center'
                        : styleConfig.position === 'right'
                          ? 'end'
                          : 'start'
                }
                component={Button}
                disabled={recordable || !lastDayWritten}
            >
                <Typography
                    sx={{
                        color: color,
                        pointerEvents: 'none',
                    }}
                    variant={styleConfig.variant}
                >
                    {date ? date : '11.30'}
                </Typography>
            </Stack>
        </Stack>
    );
};

export default Day;
