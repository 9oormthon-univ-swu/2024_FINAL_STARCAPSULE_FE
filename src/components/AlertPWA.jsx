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
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    boxShadow: 24,
    borderRadius: '1.25rem',
    height: 'fit-content',
    width: ['20rem', 'fit-content'],
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

const AlertPWA = ({ open, onClose, onButtonClick, buttonText }) => {
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
                        <IconButton
                            onClick={onClose}
                            sx={{
                                w: '1.5rem',
                                h: '1.5rem',
                            }}
                        >
                            <CloseIcon />
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
                        <Box
                            component='img'
                            src={'/ios/72.png'}
                            sx={{
                                width: '3.5rem',
                                height: '3.5rem',
                                objectFit: '/ios/72.png',
                                backgroundPosition: 'center',
                            }}
                        />
                        <Typography
                            variant='subtitle2'
                            color='#282828'
                            fontWeight={'700'}
                        >
                            홈 화면에
                            <Typography
                                component='span'
                                sx={{ color: 'custom.button2' }}
                                variant='subtitle2'
                                fontWeight={'700'}
                            >
                                {` 스노로그 `}
                            </Typography>
                            를 추가하고 로그인하면
                            <Typography variant='title4' color='#63422C'>
                                새로운 질문을 받아볼 수 있어요.
                            </Typography>
                        </Typography>
                    </Stack>
                    <Button
                        variant='contained'
                        onClick={onButtonClick}
                        sx={motionButtonStyle}
                    >
                        <Typography variant='title2'>
                            설치없이 스노로그 알림 받기
                        </Typography>
                    </Button>
                </Stack>
            </Stack>
        </Modal>
    );
};

export default AlertPWA;
