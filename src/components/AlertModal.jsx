import { Button, IconButton, Modal, Stack, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import React from 'react';

/**
 * AlertModal 컴포넌트는 modal을 띄우고 확인, 취소 버튼을 제공합니다.
 *
 *
 * @param {boolean} open - modal open 여부
 * @param {function} onClose - modal을 닫는 함수
 * @param {string} text - modal에 표시할 텍스트
 * @param {string} confirmText - 확인 버튼 텍스트
 * @param {string} cancelText - 취소 버튼 텍스트
 * @param {function} onConfirm - 확인 버튼 클릭 시 실행할 함수
 * @param {function} onCancel - 취소 버튼 클릭 시 실행할 함수
 * @param {object} cancelButtonProps - 취소 버튼에 전달할 props
 * @param {object} confirmButtonProps - 확인 버튼에 전달할 props
 * @param  {...any} props - 추가적인 props, Modal 컴포넌트에 전달됨
 * @returns
 */

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const AlertModal = ({
    open,
    onClose,
    text, // text to display
    confirmText, // text for the confirm button
    cancelText, // text for the cancel button
    onConfirm, // function to call when the confirm button is clicked
    onCancel, // function to call when the cancel button is clicked
    cancelButtonProps, // props to pass to the cancel button
    confirmButtonProps, // props to pass to the confirm button
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
                <Stack direction={'row'} justifyContent={'flex-end'}>
                    <IconButton onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                </Stack>
                <Typography id={'alert-modal-description'} align='center'>
                    {text}
                </Typography>
                <Stack direction={'row'} w={1} justifyContent={'space-between'}>
                    {cancelText && (
                        <Button
                            onClick={onCancel}
                            sx={{
                                width: 1,
                                height: '3rem',
                            }}
                            {...cancelButtonProps}
                        >
                            {cancelText}
                        </Button>
                    )}
                    {confirmText && (
                        <Button
                            onClick={onConfirm}
                            sx={{
                                width: 1,
                                height: '3rem',
                            }}
                            {...confirmButtonProps}
                        >
                            {confirmText}
                        </Button>
                    )}
                </Stack>
            </Stack>
        </Modal>
    );
};

export default AlertModal;
