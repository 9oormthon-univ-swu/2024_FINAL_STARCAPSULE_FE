import React from 'react';
import { Button } from '@mui/material'

const PopupButton = ({onClick}) => {
    return(
        <Button 
            variant="contained" 
            type="submit" 
            sx={formbtn}
            onClick={onClick}
        >
            추억 기록하기
        </Button>
    );
};

export default PopupButton;

//Design
const formbtn = {
    width: '210px',
    height: '55px',
    padding: '10px 20px',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '23px',
    background: '#7F5539', 
    boxShadow: '0px 0px 4px 0px rgba(40, 40, 40, 0.20)',
    marginTop: '-90px',
    marginBottom: '1.94rem',
    fontFamily: "Noto Sans", 
    fontSize: '16px',
};