import React from 'react';
import {
    Box,
    Button,
    IconButton,
    Modal,
    Stack,
    styled,
    Typography,
} from '@mui/material';
import { CloseIcon } from './icons';

// mui의 반응형 적용을 위해 그대로 둠
const modalContainerStyle = {
    position: 'absolute',
    bottom: '1.25rem',
    left: '50%',
    transform: 'translate(-50%, 0)',
    boxShadow: 24,
    borderRadius: '1.25rem',
    height: 'fit-content',
    minHeight: '10rem',
    minWidth: '20rem',
    width: ['calc(100vw - 2.5rem)', 'fit-content'],
    maxWidth: '20rem',
    overflow: 'hidden',
    boxSizing: 'border-box',
    p: 0,
};

const motionButtonStyle = {
    width: '100%',
    borderRadius: '1.25rem',
    backgroundColor: 'custom.button1',
    marginTop: '1.25rem',
    height: '3.375rem',
};

const RecommendModal = ({
    open,
    onClose,
    onButtonClick,
    buttonText,
    children,
}) => {
    return (
        <Modal open={open} onClose={onClose}>
            <Stack
                direction={'column'}
                justifyContent={'center'}
                sx={modalContainerStyle}
            >
                <Stack
                    direction={'column'}
                    p={1}
                    sx={{
                        bgcolor: 'background.paper',
                    }}
                >
                    <Stack direction={'row'} justifyContent={'flex-end'}>
                        <IconButton onClick={onClose}>
                            <CloseIcon
                                sx={{
                                    w: '1.5rem',
                                    h: '1.5rem',
                                    color: 'custom.font',
                                }}
                            />
                        </IconButton>
                    </Stack>
                    <Stack
                        direction={'column'}
                        justifyContent={'center'}
                        alignItems={'center'}
                        spacing={2}
                        sx={{
                            w: '100%',
                            textAlign: 'center',
                        }}
                    >
                        {children}
                    </Stack>
                    <Button
                        variant='contained'
                        onClick={onButtonClick}
                        sx={motionButtonStyle}
                    >
                        <Typography variant='title2'>{buttonText}</Typography>
                    </Button>
                </Stack>
            </Stack>
        </Modal>
    );
};

export default RecommendModal;
