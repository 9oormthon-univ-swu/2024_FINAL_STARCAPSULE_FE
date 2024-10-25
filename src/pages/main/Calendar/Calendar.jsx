import React from 'react';
import Day from './Day';
import dayjs from 'dayjs';
import { dayStyle } from './Calendar.style';
import Masonry from '@mui/lab/Masonry';
import { Box, Grid2 } from '@mui/material';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';

dayjs.extend(isSameOrAfter);
dayjs.extend(utc);
dayjs.extend(timezone);

export const isRecordable = (time) => {
    const startOfPeriod = dayjs(`${dayjs(time).year()}-11-30`).startOf('day');
    const endOfPeriod = startOfPeriod.add(31, 'day').startOf('day');
    const today = dayjs(time).startOf('day');

    if (
        today.isBefore(endOfPeriod.add(1, 'day')) &&
        today.isSameOrAfter(startOfPeriod)
    )
        return true;
    return false;
};

const Calendar = ({ serverTime, hasWritten }) => {
    const today = dayjs(serverTime);

    const recordable = isRecordable(serverTime);

    const lastDayWritten = hasWritten[31];
    return (
        <Box
            sx={{
                pr: ['0', '2.5rem'],
                pl: ['0.25rem', '2.5626rem'],
                width: '100%',
                boxSizing: 'border-box',
            }}
        >
            <Masonry
                sequential
                spacing={0.375}
                defaultColumns={5}
                columns={5}
                sx={{
                    width: '100%',
                    boxSizing: 'border-box',
                    maxWidth: '30rem',
                }}
            >
                {hasWritten.map((written, index) => {
                    if (index >= 30) return null;
                    return (
                        <Day
                            key={index}
                            time={today.format('YYYY-MM-DD')}
                            hasWritten={written}
                            date={index}
                            styleConfig={dayStyle[index]}
                            lastDayWritten={lastDayWritten}
                            recordable={recordable}
                        />
                    );
                })}
            </Masonry>
            <Grid2
                container
                columns={10}
                columnSpacing={0.375}
                sx={{
                    boxSizing: 'border-box',
                    paddingRight: 0.4,
                    transform: 'translateY(-3px)',
                    width: '100%',
                    maxWidth: '30rem',
                }}
            >
                <Grid2 size={4}>
                    <Day
                        time={today.format('YYYY-MM-DD')}
                        hasWritten={hasWritten[30]}
                        date={30}
                        styleConfig={dayStyle[30]}
                        lastDayWritten={lastDayWritten}
                        recordable={recordable}
                    />
                </Grid2>
                <Grid2 size={6}>
                    <Day
                        time={today.format('YYYY-MM-DD')}
                        hasWritten={hasWritten[31]}
                        date={31}
                        styleConfig={dayStyle[31]}
                        lastDayWritten={lastDayWritten}
                        recordable={recordable}
                    />
                </Grid2>
            </Grid2>
        </Box>
    );
};

export default Calendar;
