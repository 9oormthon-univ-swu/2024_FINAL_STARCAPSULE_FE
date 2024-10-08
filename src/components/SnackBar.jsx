import React from 'react';
import { Snackbar, Alert } from '@mui/material';

const SnackBar = ({
    openSnackbar,
    handleCloseSnackbar,
    snackbarText,
}) => {
    return(
        <Snackbar 
            open={openSnackbar}
            autoHideDuration={3000}
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
            <Alert 
                severity="error" 
                sx={snackbarstyle}>

                {snackbarText}

            </Alert>
      </Snackbar>
    );
};

export default SnackBar;

//Design
const snackbarstyle = {
    display: 'inline=flex',
    width: '19.5rem',
    height: '2.875rem',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '1.25rem',
    background: '#DDB892',
    boxShadow: '0px 0px 4px 0px rgba(40, 40, 40, 0.20)',
    color: '#282828',
    fontSize: '0.875rem',
    fontWeight: '700',
    fontFamily: "Noto Sans",
};