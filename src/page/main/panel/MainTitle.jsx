import AlertModal from '@/components/AlertModal';
import { EditIcon } from '@/components/icons';
import palette from '@/constants/palette';
import textStyles from '@/constants/textStyles';
import useModal from '@/hooks/useModal';
import { Check } from '@mui/icons-material';
import { IconButton, Stack, Typography } from '@mui/material';
import React, { useRef, useState } from 'react';

const MainTitle = ({ nickname }) => {
    const isRow = nickname.length <= 5;
    // const [currNickname, setCurrNickname] = useState(nickname);
    const [isEditable, setIsEditable] = useState(false);
    const divRef = useRef(null);
    const nicknameRef = useRef(nickname);

    // useEffect(() => {
    //     nicknameRef.current = nickname;
    // }, []);

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
        // setCurrNickname(nickname);
        divRef.current.innerText = nickname;
        setIsEditable(false);
        cancelModal.closeModal();
    };

    const handleEditClick = () => {
        setIsEditable('plaintext-only');
        // 다음 렌더링이 완료된 후에 포커스 설정
        setCursorToEnd();
    };
    // contentEditable에서 텍스트 변경을 감지하여 상태 업데이트
    const handleInput = () => {
        const newNickname = divRef.current.innerText; // 현재 텍스트를 가져옴
        nicknameRef.current = newNickname; // 변경된 닉네임을 저장
    };

    const handleBlur = () => {
        cancelModal.openModal();
    };

    return (
        <>
            <Stack
                spacing={isRow ? 0.5 : 0.25}
                alignItems={isRow ? 'center' : 'flex-start'}
                justifyContent={isRow ? 'flex-start' : 'row'}
                direction={isRow ? 'row' : 'column'}
            >
                <Typography variant='Heading1'>
                    <div
                        onInput={handleInput}
                        ref={divRef}
                        contentEditable={isEditable}
                        style={{
                            color: palette.main2,
                            display: 'inline-block',
                            width: 'fit-content',
                            outline: 'none',
                            border: 'none',
                            textDecoration: isEditable ? 'underline' : 'none',
                            ...textStyles.Heading1,
                        }}
                        onBlur={handleBlur}
                    >
                        {nickname.current ?? nickname}
                    </div>
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
