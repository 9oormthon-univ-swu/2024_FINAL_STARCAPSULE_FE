import React from 'react';
import styled from 'styled-components';
import Day from './Day';
import dayjs from 'dayjs';
import { dayStyle } from './Calendar.style';

const GridContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-auto-rows: minmax(20px, auto);
    gap: 3px;
    max-width: 31.25rem;
`;

const data = {
    serverTime: '2024-12-25',
    hasWritten: [
        true,
        false,
        true,
        true,
        false,
        false,
        true,
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
        <GridContainer>
            {data.hasWritten.map((written, index) => (
                <Day
                    key={index}
                    time={today.format('YYYY-MM-DD')}
                    hasWritten={written}
                    date={index}
                    styleConfig={dayStyle[index]}
                />
            ))}
        </GridContainer>
    );
};

export default Calendar;
