import React from 'react';
import Day from './Day';
import dayjs from 'dayjs';
import { dayStyle } from './Calendar.style';
import Masonry from '@mui/lab/Masonry';
import { Box, Stack } from '@mui/material';

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
            sx={{
                maxWidth: '495px',
            }}
        >
            <Masonry
                sequential
                spacing={'3px'}
                // defaultSpacing={'3px'}
                defaultColumns={5}
                columns={5}
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
            <Masonry
                sequential
                spacing={'3px'}
                // defaultSpacing={'3px'}
                columns={2}
            >
                <Day
                    time={today.format('YYYY-MM-DD')}
                    hasWritten={data.hasWritten[30]}
                    date={30}
                    styleConfig={dayStyle[30]}
                />
                <Day
                    time={today.format('YYYY-MM-DD')}
                    hasWritten={data.hasWritten[31]}
                    date={31}
                    styleConfig={dayStyle[31]}
                />
            </Masonry>
        </Box>
    );
};

export default Calendar;
