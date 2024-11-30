import palette from '@/constants/palette';
import { getDaysBeforeOpen } from '@/utils/getDaysBeforeOpen';
import { styled, Typography } from '@mui/material';
import React from 'react';

const StyledTypography = styled(Typography)(({ theme }) => ({
    color: theme.palette.custom.grey,
    height: '1.5rem',
}));

const DDayTitle = ({ serverTime }) => {
    const daysLeft = getDaysBeforeOpen(2024, serverTime);

    if (daysLeft) {
        return (
            <StyledTypography
                variant='title3'
                sx={{
                    color: 'custom.font',
                    '& span': { color: 'custom.main2' },
                }}
            >
                {'추억이 '}
                <span>{`${daysLeft}일`}</span>
                {' 뒤에 공개돼요!'}
            </StyledTypography>
        );
    } else {
        return (
            <StyledTypography variant='title3' sx={{ color: 'custom.font' }}>
                {'쌓인 추억이 공개되었습니다!'}
            </StyledTypography>
        );
    }
};

export default DDayTitle;
