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
import { useSnackbarStore } from '@/stores/useSnackbarStore';
import html2canvas from 'html2canvas';

const modalContainerStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    boxShadow: 24,
    borderRadius: '1.25rem',
    height: 'fit-content',
    overflow: 'hidden',
};

const modalDescriptionStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    gap: '1.2rem',
};

const LinkCopyButton = styled(Button)(({ theme }) => ({
    display: 'flex',
    width: 'fit-content',
    maxHeight: '3.375rem',
    padding: '0.9375rem 3.84rem',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '0.2rem',
    borderRadius: '1.25rem',
    backgroundColor: theme.palette.custom.button1,
}));

const ImgShareButton = styled(Button)(() => ({
    display: 'flex',
    maxWidth: '3.375rem',
    maxHeight: '3.375rem',
    padding: '0.9375rem',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '3.5rem',
    backgroundColor: '#B08F79',
}));

const ShareModal = ({ url, open, onClose }) => {
    const { setSnackbarOpen } = useSnackbarStore();

    const handleLinkCopy = async () => {
        try {
            if (navigator.share) {
                await navigator.share({
                    title: '☃️ 스노우볼에 오늘의 추억이 보관되었어요! ☃️\nSNS에 공유하여 친구들과 함께한 추억을 전달받아보세요\n',
                    url: url,
                });
                setSnackbarOpen({
                    text: '링크가 공유되었습니다',
                    severity: 'success',
                });
            } else {
                await navigator.clipboard.writeText(url);
                setSnackbarOpen({
                    text: '링크가 복사되었습니다',
                    severity: 'success',
                });
            }
        } catch (error) {
            // console.error('복사 실패:', error);
            setSnackbarOpen({
                text: '링크 공유가 실패했습니다. 다시 시도해 주세요.',
                severity: 'error',
            });
        }
    };

    const handleImageShare = async () => {
        try {
            const captureImg = document.getElementById('capture-container');
            const canvas = await html2canvas(captureImg, {
                backgroundColor: null,
            });
            const dataUrl = canvas.toDataURL('image/png');
            const blob = await (await fetch(dataUrl)).blob();
            const file = new File([blob], 'layout-image.png', {
                type: 'image/png',
            });

            if (navigator.share) {
                await navigator.share({
                    title: '☃️ 스노우볼에 오늘의 추억이 보관되었어요! ☃️\nSNS에 공유하여 친구들과 함께한 추억을 전달받아보세요\n',
                    files: [file],
                });
                setSnackbarOpen({
                    text: '공유가 완료되었습니다.',
                    severity: 'success',
                });
            } else {
                throw new Error('공유 기능이 지원되지 않는 브라우저입니다.');
            }
        } catch (error) {
            //console.error('공유 실패:', error);
            setSnackbarOpen({
                text: '공유에 실패했습니다. 다시 시도해 주세요.',
                severity: 'error',
            });
        }
    };

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
                        justifyContent={'center'}
                        alignItems={'center'}
                        sx={modalDescriptionStyle}
                    >
                        <Typography variant='title4' color='#282828'>
                            <Box
                                component='span'
                                fontWeight='700'
                                color='custom.main1'
                            >
                                스노우볼 이미지
                            </Box>
                            를{' '}
                            <Box
                                component='span'
                                fontWeight='700'
                                color='custom.main1'
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
                        direction={'row'}
                    >
                        <LinkCopyButton
                            variant='contained'
                            onClick={handleLinkCopy}
                            sx={{
                                padding: {
                                    xs: '0.9375rem 2.84rem',
                                    sm: '0.9375rem 3.84rem',
                                    md: '0.9375rem 3.84rem',
                                },
                            }}
                        >
                            <Typography
                                variant='title2'
                                sx={{
                                    width: 'max-content',
                                    fontSize: {
                                        xs: '0.79rem',
                                        sm: '1rem',
                                        md: '1rem',
                                    },
                                }}
                            >
                                링크 복사하기
                            </Typography>
                            <LinkIcon />
                        </LinkCopyButton>
                        <ImgShareButton onClick={handleImageShare}>
                            <PhotoShareIcon />
                        </ImgShareButton>
                    </Stack>
                </Stack>
            </Stack>
        </Modal>
    );
};

export default ShareModal;
