import React from 'react';
import { Snackbar, Alert, Typography, styled } from '@mui/material';

const SnackbarContainer = styled(Snackbar)({
    width: 'calc(100vw - 3rem)',
    maxWidth: '34.5rem',
    top: '2.25rem !important',
    left: '50% !important',
    transform: 'translateX(-50%)',
    height: '3.875rem',
});

const SnackbarContent = styled(Alert)(({ theme }) => ({
    backgroundColor: '#405EAB',
    width: '100%',
    maxWidth: '34.5rem',
    height: '3.875rem',
    borderRadius: '1.25rem',
    display: 'flex',
    padding: '0 1rem',
    flexDirection: 'row',
    alignItems: 'center',
    '& span': {
        ...theme.typography.title4,
        color: theme.palette.custom.font,
    },
}));

const SnackbarNoti = ({
    openSnackbar,
    handleCloseSnackbar,
    snackbarText,
    severity = 'warning',
}) => {
    return (
        <SnackbarContainer
            key={snackbarText}
            open={openSnackbar}
            autoHideDuration={5000}
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
            <SnackbarContent
                severity={severity}
                iconMapping={{
                    success: <span>✅</span>,
                    error: <span>❌</span>,
                    warning: <span>❗</span>,
                    present: <span>🎁</span>,
                }}
            >
                <Typography
                    variant='title4'
                    sx={{ color: '#FFFCFA', wordBreak: 'keep-all' }}
                >
                    {snackbarText}
                </Typography>
            </SnackbarContent>
        </SnackbarContainer>
    );
};

export default SnackbarNoti;
