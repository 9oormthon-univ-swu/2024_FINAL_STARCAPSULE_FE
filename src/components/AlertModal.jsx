import React from 'react';
import {
    Box,
    Button,
    IconButton,
    Modal,
    Stack,
    Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

/**
 * AlertModal 컴포넌트는 modal을 띄우고 확인, 취소 버튼을 제공합니다.
 *
 *
 * @param {boolean} open - modal open 여부
 * @param {function} onClose - modal을 닫는 함수
 * @param {string} buttonText - 버튼 텍스트
 * @param {function} onButtonClick - 버튼 클릭 시 실행되는 함수
 * @param {any} children - modal 내용
 * @param  {...any} props - 추가적인 props, Modal 컴포넌트에 전달됨
 * @returns
 */

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    // width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: '1.25rem',
    overflow: 'hidden',
};

const AlertModal = ({
    open,
    onClose,
    buttonText,
    onButtonClick,
    children,
    ...props
}) => {
    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-describedby='alert-modal-description'
            {...props}
        >
            <Stack sx={style} direction={'column'} justifyContent={'center'}>
                <Stack direction={'column'} p={2} spacing={3} mb={3}>
                    <Stack direction={'row'} justifyContent={'flex-end'}>
                        <IconButton
                            onClick={onClose}
                            style={{
                                width: '1.5rem',
                                height: '1.5rem',
                            }}
                        >
                            <CloseIcon />
                        </IconButton>
                    </Stack>
                    <Box sx={{ px: '3rem' }}>{children}</Box>
                </Stack>
                <Button
                    variant='contained'
                    color='primary'
                    onClick={onButtonClick}
                    sx={{ py: '1.25rem', borderRadius: 0 }}
                >
                    <Typography>{buttonText}</Typography>
                </Button>
            </Stack>
        </Modal>
    );
};

export default AlertModal;
