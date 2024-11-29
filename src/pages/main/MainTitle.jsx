import AlertModal from '@/components/AlertModal';
import { CheckIcon, EditIcon } from '@/components/icons';
import useModal from '@/hooks/useModal';
import { Box, IconButton, Stack, styled, Typography } from '@mui/material';
import React, { useState, useEffect, useRef } from 'react';

export const StyledTypography = styled(Typography)(({ theme }) => ({
    color: theme.palette.custom.font,
    wordBreak: 'keep-all',
    whiteSpace: 'pre',
    padding: 0,
}));

const StyledIconButton = styled(IconButton)(() => ({
    width: '2rem',
    height: '2rem',
    boxSizing: 'border-box',
}));

const Input = styled('input')(({ theme }) => ({
    color: theme.palette.custom.main2,
    display: 'inline-block',
    outline: 'none',
    border: 'none',
    backgroundColor: 'transparent',
    padding: '0',
    '&:empty:before': {
        content: 'attr(placeholder)',
        color: theme.palette.custom.grey,
    },
    ...theme.typography.Heading1,
}));

const MainTitle = ({ snowball, setSnowballName, onError, serverTime }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [inputWidth, setInputWidth] = useState(0);
    const inputRef = useRef(null);
    const [currSnowball, setCurrSnowball] = useState(snowball);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        setCurrSnowball(snowball);
    }, [snowball]);

    const { isOpen, openModal, closeModal } = useModal();

    const cancelEdit = () => {
        setCurrSnowball(snowball);
        setIsEditing(false);
        closeModal();
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleBlur = (event) => {
        if (isSaving) return;
        openModal();
    };

    const handleSnowballChange = (event) => {
        setCurrSnowball(event.target.value.slice(0, 10)); // 10자 이상 입력 방지
    };

    const calculateInputWidth = () => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        const font = window.getComputedStyle(inputRef.current).font;
        context.font = font;
        const textWidth = context.measureText(
            currSnowball.length ? currSnowball : '이름'
        ).width;
        setInputWidth(textWidth);
    };

    useEffect(() => {
        if (isEditing) {
            calculateInputWidth();
        }
    }, [currSnowball, isEditing]);

    const onConfirmClick = (event) => {
        event?.preventDefault();
        setIsSaving(true);
        if (!currSnowball.length) return;
        setSnowballName(currSnowball)
            .then(() => {
                setIsSaving(false);
                setIsEditing(false);
            })
            .catch((e) => {
                onError(e);
            });
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            setIsSaving(true);
            onConfirmClick();
        } else if (event.key === 'Escape') {
            openModal();
        }
    };

    return (
        <>
            <Stack
                direction={currSnowball.length > 5 ? 'column' : 'row'}
                sx={{
                    minHeight: '4.25rem',
                }}
            >
                <StyledTypography variant='Heading1'>
                    {isEditing ? (
                        <Input
                            ref={inputRef}
                            type='text'
                            value={currSnowball}
                            onChange={handleSnowballChange}
                            onBlur={handleBlur}
                            spellCheck='false'
                            onKeyDown={handleKeyDown}
                            style={{
                                width: `${inputWidth}px`,
                                transition: 'width 0.2s',
                            }}
                            placeholder='이름'
                            autoFocus
                        />
                    ) : (
                        <Box component={'span'} sx={{ color: 'custom.main2' }}>
                            {snowball}
                        </Box>
                    )}
                    {'님의 '}
                </StyledTypography>
                <StyledTypography variant='Heading1'>
                    {'스노우볼'}
                    {isEditing ? (
                        <StyledIconButton
                            onMouseDown={onConfirmClick}
                            touchstart={onConfirmClick}
                            disabled={!currSnowball.length}
                        >
                            <CheckIcon
                                sx={{
                                    color: currSnowball.length
                                        ? 'custom.main2'
                                        : 'custom.grey',
                                }}
                            />
                        </StyledIconButton>
                    ) : (
                        <StyledIconButton onClick={handleEdit}>
                            <EditIcon sx={{ color: 'custom.font' }} />
                        </StyledIconButton>
                    )}
                </StyledTypography>
                <AlertModal
                    open={isOpen}
                    onClose={closeModal}
                    buttonText={'확인'}
                    onButtonClick={cancelEdit}
                    keepMounted
                >
                    <Typography
                        variant='subtitle1'
                        align='center'
                        sx={{
                            color: 'custom.font',
                        }}
                    >
                        {'닉네임 변경을 취소할까요?'}
                    </Typography>
                </AlertModal>
            </Stack>
        </>
    );
};

export default MainTitle;
