import React from 'react';
import { Button } from '@mui/material';

const ImageSaveButton = ({ onClick }) => {
    return (
        <Button 
            variant="contained" 
            type="submit" 
            sx={formbtn}
            onClick={onClick}
        >
            이미지 저장하기
        </Button>
    );
};

export default ImageSaveButton;


const formbtn = {
    width: '100%',
    height: '3.875rem',
    padding: '1.25rem 6.8125rem',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '1.25rem',
    color: 'white',
    background: 'var(--main1, #405EAB)', 
    boxShadow: '0px 0px 4px 0px rgba(40, 40, 40, 0.20)',
    marginTop: '2.25rem',
    marginBottom: '1.94rem',
    fontFamily: "Noto Sans", 
    whiteSpace: 'nowrap',
};
