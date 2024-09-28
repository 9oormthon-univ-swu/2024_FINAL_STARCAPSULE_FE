import palette from '@/constants/palette';
import { Typography } from '@mui/material';
import React from 'react';

const DDayTitle = () => {
    const date = new Date();

    const year = date.getFullYear();

    const dDay = new Date(year, 12, 30);

    const diff = Math.ceil(
        (dDay.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
    );

    return (
        <Typography variant='title3'>
            {'편지가 '}
            <span
                style={{
                    color: palette.main2,
                }}
            >
                {`${diff}일`}
            </span>
            {' 뒤에 공개돼요!'}
        </Typography>
    );
};

export default DDayTitle;
