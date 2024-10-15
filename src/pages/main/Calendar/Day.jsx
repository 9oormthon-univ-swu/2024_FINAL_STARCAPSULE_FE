import { getDaysBeforeOpen } from '@/utils/getDaysBeforeOpen';
import { Box, Typography } from '@mui/material';
import React from 'react';

const future = {
    style: {
        border: '1px solid',
        borderColor: 'custom.white',
    },
    color: 'custom.white',
};

const todayNotWritten = {
    style: {
        border: '1px solid custom.white',
        background: 'custom.white',
    },
    color: 'custom.font',
};

const notWritten = {
    style: {
        background: 'rgba(255, 252, 250, 0.1)',
    },
    color: 'custom.white',
};

const written = {
    style: {
        background: 'rgba(255, 252, 250, 0.4)',
    },
    color: 'custom.font',
};

const afterOpenNotWritten = {
    style: {
        background: 'rgba(255, 252, 250, 0.40)',
    },
    color: 'custom.font',
};

const afterOpenWritten = {
    style: {
        background: 'transparent',
    },
    color: 'transparent',
};

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

// styleConfig: { boxStyle, variant }
const Day = ({ time, hasWritten, date, styleConfig }) => {
    const daysLeft = getDaysBeforeOpen(time);

    const today = new Date(time);

    const todayDate = today.getDate();
    const todayMonth = today.getMonth();

    let type = null;

    if (daysLeft === 0) {
        // 기록 작성일 전후로는 기록에 따라 처리
        type = hasWritten ? afterOpenWritten : afterOpenNotWritten;
    } else if (hasWritten) {
        // 기록 작성일 기간에는 기록 여부에 따라 처리
        type = written;
    } else {
        const isToday = // 오늘 날짜인지 확인
            (todayMonth === 10 && todayDate === 30 && date === 0) ||
            (todayMonth === 11 && todayDate === date);
        // 오늘 날짜인 경우 그에 해당하는 작성 안함 스타일, 미래면 미래 스타일, 아니면 작성 안함 스타일
        type = isToday
            ? todayNotWritten
            : todayDate > date
              ? future
              : notWritten;
    }

    return (
        <Box
            sx={{
                position: 'relative',
                ...styleConfig.boxStyle,
                ...type.style,
            }}
        >
            <Typography
                sx={{
                    color: type.color,
                    ...(styleConfig.position === 'right'
                        ? rightPosition
                        : middlePosition),
                }}
                variant={styleConfig.variant}
            >
                {date ? date : '11.30'}
            </Typography>
        </Box>
    );
};

export default Day;
