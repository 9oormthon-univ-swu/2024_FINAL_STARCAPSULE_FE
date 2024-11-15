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
};

const modalDescriptionStyle = {
    display: 'flex',
    w: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    gap: '1.2rem',
};

const ModalDescriptionIcon = styled(Box)(() => ({
    width: '4rem',
    height: '4rem',
    borderRadius: '0.6rem',
    boxShadow: '0px 0px 3.797px 0px rgba(40, 40, 40, 0.20)',
    border: '0.19px solid var(--grey, #D5D1CD)',
    backgroundImage: 'url(/ios/72.png)',
    objectFit: 'cover',
    backgroundPosition: 'center',
}));

const ModalButton = styled(Button)(({ theme }) => ({
    display: 'inline-flex',
    width: 'fit-content',
    padding: '1rem 2.55rem',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '1.25rem',
    backgroundColor: theme.palette.custom.button1,
    marginTop: '1.25rem',
}));

const AlertPWA = ({ open, onClose, onButtonClick }) => {
    return (
        <Modal open={open} onClose={onClose}>
            <Stack
                direction={'column'}
                justifyContent={'center'}
                sx={modalContainerStyle}
            >
                <Stack
                    direction={'column'}
                    p={2}
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
                    <Stack sx={modalDescriptionStyle}>
                        <ModalDescriptionIcon component='img' />
                        <Typography variant='subtitle2' color='#282828'>
                            홈 화면에{' '}
                            <Box
                                component='span'
                                fontWeight='700'
                                color='#63422C'
                            >
                                스노로그
                            </Box>
                            를 추가하고 로그인하면
                            <Typography variant='title4' color='#63422C'>
                                새로운 질문을 받아볼 수 있어요.
                            </Typography>
                        </Typography>
                    </Stack>
                    <ModalButton variant='contained' onClick={onButtonClick}>
                        <Typography variant='title2'>
                            설치없이 스노로그 알림 받기
                        </Typography>
                    </ModalButton>
                </Stack>
            </Stack>
        </Modal>
    );
};

export default AlertPWA;