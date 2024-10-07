import palette from '@/constants/palette';
import { getDaysBeforeOpen } from '@/utils/getDaysBeforeOpen';
import { styled, Typography } from '@mui/material';
import React from 'react';

const StyledTypography = styled(Typography)(({ theme }) => ({
    color: theme.palette.custom.grey,
    height: '1.5rem',
}));

const DDayTitle = () => {
    const daysLeft = getDaysBeforeOpen();

    if (daysLeft) {
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
