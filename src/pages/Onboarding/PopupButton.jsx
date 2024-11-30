import React from 'react';
import { Button, Typography } from '@mui/material';

const PopupButton = ({ onClick, text, disabled }) => {
    return (
        <Button
            variant='contained'
            type='submit'
            sx={formbtn}
            onClick={onClick}
            disabled={disabled}
        >
            <Typography
                variant='title2'
                sx={{
                    color: 'custom.main2',
                }}
            >
                {text}
            </Typography>
        </Button>
    );
};

export default PopupButton;

const formbtn = {
    width: '210px',
    height: '55px',
    padding: '10px 20px',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '22px',
    background: '#FAFBFF',
    boxShadow: '0px 0px 4px 0px rgba(40, 40, 40, 0.20)',
    marginTop: '-90px',
    marginBottom: '1.94rem',
    fontFamily: 'Noto Sans',
    fontSize: '17px',
    color: '#405EAB',
};
