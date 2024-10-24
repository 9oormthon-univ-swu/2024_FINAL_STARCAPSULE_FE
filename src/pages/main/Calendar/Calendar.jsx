import React from 'react';
import Day from './Day';
import dayjs from 'dayjs';
import { dayStyle } from './Calendar.style';
import Masonry from '@mui/lab/Masonry';
import { Box, Grid2 } from '@mui/material';

const data = {
    serverTime: '2024-12-25',
    hasWritten: [
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
    ],
};

const Calendar = () => {
    const today = dayjs();

    return (
        <Box
            Box
            sx={{
                m: ['0', '0 2.5rem'],
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
                {data.hasWritten.map((written, index) => {
                    if (index >= 30) return null;
                    return (
                        <Day
                            key={index}
                            time={today.format('YYYY-MM-DD')}
                            hasWritten={written}
                            date={index}
                            styleConfig={dayStyle[index]}
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
                        hasWritten={data.hasWritten[30]}
                        date={30}
                        styleConfig={dayStyle[30]}
                    />
                </Grid2>
                <Grid2 size={6}>
                    <Day
                        time={today.format('YYYY-MM-DD')}
                        hasWritten={data.hasWritten[31]}
                        date={31}
                        styleConfig={dayStyle[31]}
                    />
                </Grid2>
            </Grid2>
        </Box>
    );
};

export default Calendar;
