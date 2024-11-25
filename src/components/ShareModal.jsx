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
import { CloseIcon, LinkIcon, PhotoShareIcon } from '@/components/icons';

const modalContainerStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    boxShadow: 24,
    borderRadius: '1.25rem',
    height: 'fit-content',
    maxWidth: ['20rem', 'fit-content'],
    maxheight: '11.5rem',
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

const LinkCopyButton = styled(Button)(({ theme }) => ({
    display: 'flex',
    maxwidth: 'fit-content',
    padding: '0.9375rem 3.84rem',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '0.125rem',
    borderRadius: '1.25rem',
    backgroundColor: theme.palette.custom.button1,
}));

const ImgShareButton = styled(Box)(() => ({
    display: 'flex',
    maxwidth: '3.375rem',
    maxheight: '3.375rem',
    padding: '0.9375rem',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '3.5rem',
    backgroundColor: '#B08F79',
}));

const ShareModal = ({ open, onClose, onButtonClick, onPhotoShareClick }) => {
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
                    <Stack
                        paddingTop={'0.3rem'}
                        direction={'row'}
                        justifyContent={'flex-end'}
                    >
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
                        paddingTop={'0.5rem'}
                        paddingBottom={'1.5rem'}
                        sx={modalDescriptionStyle}
                        marginInline={'2.5rem'}
                    >
                        <Typography variant='title4' color='#282828'>
                            <Box
                                component='span'
                                fontWeight='700'
                                color='#B08F79'
                            >
                                스노우볼 이미지
                            </Box>
                            를{' '}
                            <Box
                                component='span'
                                fontWeight='700'
                                color='#B08F79'
                            >
                                공유
                            </Box>
                            하거나,
                            <Typography variant='title4' color='#282828'>
                                <Box
                                    component='span'
                                    fontWeight='700'
                                    color='#7F5539'
                                >
                                    링크를 복사
                                </Box>
                                하여 추억을 나누어보세요!
                            </Typography>
                        </Typography>
                    </Stack>
                    <Stack
                        gap={'0.5rem'}
                        justifyContent={'center'}
                        direction={'col'}
                    >
                        <LinkCopyButton
                            variant='contained'
                            onClick={onButtonClick}
                        >
                            <Typography variant='title2'>
                                링크 복사하기
                            </Typography>
                            <LinkIcon />
                        </LinkCopyButton>
                        <ImgShareButton
                            variant='contained'
                            onClick={onPhotoShareClick}
                        >
                            <PhotoShareIcon />
                        </ImgShareButton>
                    </Stack>
                </Stack>
            </Stack>
        </Modal>
    );
};

export default ShareModal;
