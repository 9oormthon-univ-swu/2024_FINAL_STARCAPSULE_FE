import palette from '@/constants/palette';
import { styled, Typography } from '@mui/material';
import React from 'react';

const StyledTypography = styled(Typography)(({ theme }) => ({
    color: theme.palette.custom.grey,
    height: '1.5rem',
}));

const DDayTitle = () => {
    const today = new Date();
    const year = today.getFullYear();

    const startDate = new Date(year, 10, 30);
    const endDate = new Date(year, 11, 31);
    const dec30 = new Date(year, 11, 30);

    if (today >= startDate && today <= dec30) {
        const timeDiff = endDate - today;
        const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

        return (
            <StyledTypography variant='title3'>
                {'추억이 '}
                <span
                    style={{
                        color: palette.main2,
                    }}
                >
                    {`${daysLeft}일`}
                </span>
                {' 뒤에 공개돼요!'}
            </StyledTypography>
        );
    } else {
        return (
            <StyledTypography variant='title3'>
                {'쌓인 추억이 공개되었습니다!'}
            </StyledTypography>
        );
    }
};

export default DDayTitle;
