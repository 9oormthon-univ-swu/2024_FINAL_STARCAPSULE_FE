import AlertModal from '@/components/AlertModal';
import { EditIcon } from '@/components/icons';
import useModal from '@/hooks/useModal';
import { Check } from '@mui/icons-material';
import { IconButton, Stack, styled, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';

// eslint-disable-next-line no-unused-vars
const MainTitle = ({ nickname, setNickname }) => {
    const [isRow, setIsRow] = useState(nickname.length <= 5);
    const [isEditable, setIsEditable] = useState(false);
    const divRef = useRef(null);
    const nicknameRef = useRef(nickname);

    const Input = styled('div')(({ theme }) => ({
        color: theme.palette.custom.main2,
        display: 'inline-block',
        width: 'fit-content',
        outline: 'none',
        border: 'none',
        textDecoration: isEditable ? 'underline' : 'none',
        ...theme.typography.Heading1,
    }));

    useEffect(() => {
        nicknameRef.current = nickname;
    }, [nickname]);

    useEffect(() => {
        setIsRow(nicknameRef.current.length <= 5);
        console.log(nicknameRef.current.length);
    }, [nicknameRef.current.length]);

    const cancelModal = useModal();

    const setCursorToEnd = () => {
        setTimeout(() => {
            if (divRef.current) {
                divRef.current.focus();
                const range = document.createRange();
                const selection = window.getSelection();
                range.selectNodeContents(divRef.current);
                range.collapse(false);
                selection.removeAllRanges();
                selection.addRange(range);
            }
        }, 0);
    };

    const onCancelModalClose = () => {
        cancelModal.closeModal();
        setCursorToEnd();
    };

    const onUseOriginalNickname = () => {
        divRef.current.innerText = nickname;
        setIsEditable(false);
        cancelModal.closeModal();
    };

    const handleEditClick = () => {
        setIsEditable('plaintext-only');
        // 다음 렌더링이 완료된 후에 포커스 설정
        setCursorToEnd();
    };

    const handleInput = (e) => {
        const newValue = e.target.innerText;
        nicknameRef.current = newValue;
        if (newValue.length > 5) {
            setIsRow(false);
            setCursorToEnd();
        } else {
            setIsRow(true);
            setCursorToEnd();
        }
    };

    // const handleBlur = () => {
    // cancelModal.openModal();
    // };

    return (
        <>
            <Stack
                spacing={isRow ? 0.5 : 0.25}
                alignItems={isRow ? 'center' : 'flex-start'}
                justifyContent={isRow ? 'flex-start' : 'row'}
                direction={isRow ? 'row' : 'column'}
            >
                <Typography variant='Heading1'>
                    <Input
                        onInput={handleInput}
                        ref={divRef}
                        contentEditable={isEditable}
                        suppressContentEditableWarning={true}
                        style={{}}
                        spellCheck={false}
                    >
                        {nickname.current ?? nickname}
                    </Input>
                    님의
                </Typography>
                <Stack
                    direction={'row'}
                    alignItems={'center'}
                    spacing={'0.25rem'}
                >
                    <Typography variant='Heading1'>스노우볼</Typography>
                    {!isEditable ? (
                        <IconButton
                            onClick={handleEditClick}
                            suppressContentEditableWarning={true}
                            sx={{
                                w: '1.5rem !important',
                                h: '1.5rem !important',
                                p: 0,
                            }}
                        >
                            <EditIcon color='custom.white' />
                        </IconButton>
                    ) : (
                        <IconButton>
                            <Check color='custom.white' />
                        </IconButton>
                    )}
                </Stack>
            </Stack>
            <AlertModal
                open={cancelModal.isOpen}
                onClose={onCancelModalClose}
                buttonText={'기존 닉네임 쓰기'}
                onButtonClick={onUseOriginalNickname}
            >
                <Typography variant='Subtitle2'>
                    원래의 닉네임을 사용할까요?
                </Typography>
            </AlertModal>
        </>
    );
};

export default MainTitle;
