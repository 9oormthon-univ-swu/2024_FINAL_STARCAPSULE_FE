import React from 'react';
import { Button } from '@mui/material'

const RecordSaveButton = ({onClick}) => {
    return(
        <Button 
            variant="contained" 
            type="submit" 
            sx={formbtn}
            onClick={onClick}
        >
            추억 보관하기
        </Button>
    );
};

export default RecordSaveButton;

//Design
const formbtn = {
    width: '100%',
    height: '3.875rem',
    padding: '1.25rem 6.8125rem',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '1.25rem',
    background: '#7F5539', 
    boxShadow: '0px 0px 4px 0px rgba(40, 40, 40, 0.20)',
    marginTop: '2.25rem',
    marginBottom: '1.94rem',
    fontFamily: "Noto Sans", 
};