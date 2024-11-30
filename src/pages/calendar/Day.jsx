import React, { memo, useMemo, useCallback } from 'react';
import { Stack, Typography, useTheme } from '@mui/material';
import { Button } from '@mui/base';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { useParams } from 'react-router-dom';
import { useSnackbarStore } from '@/stores/useSnackbarStore';
import { fetchMemoryData } from '@/utils/fetchMemoryData';
import puzzles from '@/assets/puzzles';

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

const Day = memo(
    ({ time, hasWritten, date, styleConfig, recordable, year }) => {
        const theme = useTheme();
        const navigate = useNavigate();
        const { userId } = useParams();
        const { setSnackbarOpen } = useSnackbarStore();

        const startOfPeriod = useMemo(
            () =>
                dayjs(
                    `${year}-${import.meta.env.VITE_RECORD_START_DATE}`
                ).startOf('day'),
            [year]
        );
        const today = useMemo(() => dayjs.utc(time).tz('Asia/Seoul'), [time]);
        const currentDay = useMemo(
            () => startOfPeriod.add(date, 'day').startOf('day'),
            [startOfPeriod, date]
        );
        const dateInFormat = useMemo(
            () => currentDay.format('YYYY-MM-DD'),
            [currentDay]
        );

        // 스타일 계산 최적화
        const { style, color, imgDisplay, triangleDisplay } = useMemo(() => {
            let style = {
                backgroundColor: 'transparent',
                border: 'none',
            };
            let color = theme.palette.custom.white;
            let imgDisplay = false;
            let triangleDisplay = false;

            if (recordable) {
                if (hasWritten) {
                    style.backgroundColor = 'rgba(255, 252, 250, 0.40)';
                    color = theme.palette.custom.font;
                    imgDisplay = true;
                } else if (currentDay.isSame(today, 'day')) {
                    style.border = `1px solid ${theme.palette.custom.white}`;
                    style.backgroundColor = theme.palette.custom.white;
                    color = theme.palette.custom.font;
                } else if (currentDay.isAfter(today)) {
                    style.border = `1px solid ${theme.palette.custom.white}`;
                    if (date === 31) triangleDisplay = true;
                } else {
                    style.backgroundColor = 'rgba(255, 252, 250, 0.1)';
                }
            } else {
                imgDisplay = true;
                if (hasWritten) {
                    style.backgroundColor = 'transparent';
                    color = 'transparent';
                } else {
                    style.backgroundColor = 'rgba(255, 252, 250, 0.40)';
                    color = theme.palette.custom.font;
                }
            }

            return { style, color, imgDisplay, triangleDisplay };
        }, [
            recordable,
            hasWritten,
            currentDay,
            today,
            date,
            theme.palette.custom,
        ]);

        // 클릭 이벤트 최적화
        const handleClick = useCallback(async () => {
            if (recordable) {
                setSnackbarOpen({
                    text: '모든 추억은 12월 31일에 공개됩니다!',
                    severity: 'present',
                });
                return;
            }

            try {
                const data = await fetchMemoryData(dateInFormat, userId);
                if (data) {
                    navigate(`/calendar-detail/${userId}`, {
                        state: {
                            data,
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
                console.error('Error fetching memory data:', error);
            }
        }, [recordable, dateInFormat, navigate, setSnackbarOpen, userId]);

        return (
            <Stack
                sx={{
                    backgroundImage: imgDisplay
                        ? `url(${puzzles[date]})`
                        : 'none',
                    backgroundColor: style.backgroundColor,
                    ...containerStyle,
                    ...styleConfig.boxStyle,
                }}
                justifyContent='center'
                alignItems='center'
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
                    disabled={date === 31}
                    onClick={handleClick}
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
                        variant={
                            triangleDisplay ? 'number2' : styleConfig.variant
                        }
                    >
                        {date || '11.30'}
                    </Typography>
                </Stack>
            </Stack>
        );
    }
);

export default Day;
