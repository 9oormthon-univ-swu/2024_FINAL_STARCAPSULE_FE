import React, { useRef, useState } from 'react';
import { EditIcon, CheckIcon } from '@/components/icons';
import { IconButton, Stack, styled, Typography } from '@mui/material';

const StyledIconButton = styled(IconButton)(() => ({
    width: '2rem',
    height: '2rem',
    boxSizing: 'border-box',
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
    color: theme.palette.custom.white,
    padding: '0.25rem 0',
}));

const MainTitle = ({ nickname, setNickname }) => {
    const [isRow, setIsRow] = useState(nickname.length <= 5);
    const [isEditable, setIsEditable] = useState(false);
    const divRef = useRef(null);
    const nicknameRef = useRef(nickname);

    const Input = styled('span')(({ theme }) => ({
        color: theme.palette.custom.main2,
        display: 'inline-block',
        width: 'fit-content',
        outline: 'none',
        border: 'none',
        ...theme.typography.Heading1,
        '&:empty:before': {
            content: 'attr(placeholder)',
            color: theme.palette.custom.grey,
        },
    }));

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

    const handleEditClick = () => {
        setIsEditable('plaintext-only');
        setCursorToEnd();
    };

    const handleInput = (e) => {
        const newValue = e.target.innerText;
        nicknameRef.current = newValue;
        if (newValue.length > 5) {
            if (newValue.length > 10) {
                divRef.current.innerText = newValue.slice(0, 10);
            }
            setIsRow(false);
        } else {
            setIsRow(true);
        }
        setCursorToEnd();
    };

    // eslint-disable-next-line no-unused-vars
    const handleReBtnClick = () => {
        divRef.current.innerText = nickname;
        nicknameRef.current = nickname;
    };

    const handleConfirmClick = () => {
        setIsEditable(false);
        if (nicknameRef.current !== nickname) {
            setNickname(nicknameRef.current);
            window.alert('닉네임이 변경되었습니다.');
        }
    };

    const handleOnBlur = () => {
        nicknameRef.current = nickname;
        setIsEditable(false);
    };

    return (
        <Stack
            direction={isRow < 6 ? 'row' : 'column'}
            spacing={isRow < 6 ? 1 : 0}
            alignItems={isRow < 6 ? 'center' : 'flex-start'}
            justifyContent={isRow < 6 ? 'flex-start' : 'row'}
        >
            <StyledTypography
                variant='Heading1'
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    flexDirection: 'row',
                }}
            >
                <Input
                    onInput={handleInput}
                    ref={divRef}
                    contentEditable={isEditable}
                    suppressContentEditableWarning={true}
                    spellCheck={false}
                    placeholder={'닉네임을 입력해주세요'}
                    onBlur={handleOnBlur}
                >
                    {nicknameRef.current ?? nickname}
                </Input>
                {/* {isEditable && (
                    <StyledIconButton onClick={handleReBtnClick}>
                        <CheckIcon sx={{ color: 'custom.main1' }} />
                    </StyledIconButton>
                )} */}
                님의
            </StyledTypography>
            <Stack direction={'row'} alignItems={'center'} spacing={'0.25rem'}>
                <StyledTypography variant='Heading1'>스노우볼</StyledTypography>
                {!isEditable ? (
                    <StyledIconButton onClick={handleEditClick}>
                        <EditIcon sx={{ color: 'custom.white' }} />
                    </StyledIconButton>
                ) : (
                    <StyledIconButton
                        onClick={handleConfirmClick}
                        color='main1'
                    >
                        <CheckIcon sx={{ color: 'custom.main1' }} />
                    </StyledIconButton>
                )}
            </Stack>
        </Stack>
    );
};

export default MainTitle;
