import React from 'react';
import { StyledTypography } from '@/pages/main/MainTitle';
import { Box } from '@mui/material';

const Title = ({ nickname }) => {
    return (
        <StyledTypography variant='Heading1'>
            <Box component={'span'} sx={{ color: 'custom.main2' }}>
                {nickname}
            </Box>
            님의
            {nickname.length > 5 ? <br /> : ' '}
            스노우볼
        </StyledTypography>
    );
};

export default Title;
