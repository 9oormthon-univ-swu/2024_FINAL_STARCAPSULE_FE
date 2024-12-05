import React from 'react';
import { Button, Typography } from '@mui/material';

const RecordSaveButton = ({ recordsavebtnText, onClick }) => {
    return (
        <Button
            variant='contained'
            type='submit'
            sx={formbtn}
            onClick={onClick}
        >
            <Typography variant='title2' sx={{ color: 'custom.white' }}>
                {recordsavebtnText}
            </Typography>
        </Button>
    );
};

export default RecordSaveButton;

//Design
const formbtn = {
    width: '100%',
    height: '3.875rem',
    padding: '1.25rem',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '1.25rem',
    backgroundColor: '#C3DEF7',
    boxShadow: '0px 0px 4px 0px rgba(40, 40, 40, 0.20)',
    marginTop: '2.25rem',
    marginBottom: '1.94rem',
    fontFamily: 'Noto Sans',
};
