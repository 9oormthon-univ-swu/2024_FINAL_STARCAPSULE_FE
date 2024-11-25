import React from 'react';
import Day from './Day';
import dayjs from 'dayjs';
import { dayStyle } from './Calendar.style';
import Masonry from '@mui/lab/Masonry';
import { Box, Grid2 } from '@mui/material';
import { isRecordable } from '@/utils/isRecordable';

const Calendar = ({ serverTime, hasWritten, year }) => {
    const today = dayjs.utc(serverTime).tz('Asia/Seoul');

    const recordable = isRecordable(year, serverTime);

    console.log('recordable', recordable);

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
                            recordable={recordable}
                            year={year}
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
                        recordable={recordable}
                        year={year}
                    />
                </Grid2>
                <Grid2 size={6}>
                    <Day
                        time={today.format('YYYY-MM-DD')}
                        hasWritten={!recordable}
                        date={31}
                        styleConfig={dayStyle[31]}
                        recordable={recordable}
                        year={year}
                    />
                </Grid2>
            </Grid2>
        </Box>
    );
};

export default Calendar;
