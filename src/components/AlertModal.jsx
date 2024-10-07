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

const ModalContainer = styled(Stack)(() => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    boxShadow: 24,
    borderRadius: '1.25rem',
    height: 'fit-content',
    width: ['80vw', 'fit-content'],
    maxWidth: '20rem',
    overflow: 'hidden',
}));

// mui의 반응형 적용을 위해 그대로 두었음
const modalDescriptionStyle = {
    px: [2, 6],
    pb: 3,
    wordBreak: 'keep-all',
};

const ModalButton = styled(Button)(({ theme }) => ({
    padding: '1.25rem 0',
    borderRadius: 0,
    backgroundColor: theme.palette.custom.button1,
}));

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
            <ModalContainer direction={'column'} justifyContent={'center'}>
                <Stack
                    direction={'column'}
                    p={2}
                    spacing={3}
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
                    <Box
                        sx={modalDescriptionStyle}
                        id='alert-modal-description'
                    >
                        {children}
                    </Box>
                </Stack>
                <ModalButton variant='contained' onClick={onButtonClick}>
                    <Typography variant='title2'>{buttonText}</Typography>
                </ModalButton>
            </ModalContainer>
        </Modal>
    );
};

export default AlertModal;
