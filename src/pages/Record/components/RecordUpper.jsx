import { IconButton, Stack, Typography, Box } from '@mui/material';
import React from 'react';
import { CloseIcon } from '@/components/icons';
import { useNavigate } from 'react-router-dom';

const RecordUpper = () => {
    const navigate = useNavigate();

    //이전페이지로 이동
    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <Stack>
            <Box component='span'>
                <IconButton sx={iconstyle} onClick={handleGoBack}>
                    <CloseIcon />
                </IconButton>
            </Box>
            <Typography sx={textstyle}>
                마음에 드는 장식을 선택하고 <br />
                추억을 작성해주세요!
            </Typography>
        </Stack>
    );
};

export default RecordUpper;

//Design
const textstyle = {
    color: '#FFFCFA',
    fontFamily: 'Noto Sans',
    fontSize: '1.125rem',
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 'normal',
    marginBottom: '1.5rem',
};

const iconstyle = {
    width: '0.75rem',
    height: '0.75rem',
    marginBottom: '1rem',
};
