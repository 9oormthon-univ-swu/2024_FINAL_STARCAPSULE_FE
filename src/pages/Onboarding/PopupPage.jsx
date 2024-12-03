import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PopupButton from './PopupButton';
import { useParams, useNavigate } from 'react-router-dom';
import { Portal } from '@mui/material';
import dayjs from 'dayjs';
import { useUserStore } from '@/stores/useUserStore';

const PopupWrapper = styled.div`
    display: ${(props) => props.is_open};
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 1000;
`;

const PopupContent = styled.div`
    position: relative;
    width: 80%;
    max-width: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const SvgWrapper = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const CloseButton = styled.span`
    position: absolute;
    top: 28px;
    right: 38px;
    cursor: pointer;
    font-size: 21px;
    font-weight: bold;
    z-index: 1;
`;

const TextWrapper = styled.div`
    position: absolute;
    top: 60px;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    z-index: 1;
`;

const StyledTitle = styled.div`
    color: #6485cf;
    text-align: center;

    -webkit-text-stroke-width: 0.30000001192092896;
    -webkit-text-stroke-color: var(--blue01, #6485cf);
    font-family: 'Griun NltoTAENGGU', sans-serif;
    word-break: keep-all;
    font-size: 1.25rem;
    font-style: normal;
    font-weight: 400;
    line-height: 1.75rem;
`;

const StyledBodyText = styled.div`
    color: #4a4d48;
    text-align: center;

    font-family: 'Noto Sans';
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;

    margin-top: 20px;
    width: 220px;
    white-space: normal;
    word-break: break-word;

    span {
        color: #a56592;
    }

    .number {
        font-family: 'Bigshot One', cursive;
    }
`;

const CheckboxWrapper = styled.div`
    display: flex;
    align-items: center;
    margin-top: 10px;
`;

const StyledCheckbox = styled.div`
    width: 20px;
    height: 20px;
    cursor: pointer;

    svg {
        display: block;
    }
`;

const CheckboxLabel = styled.label`
    margin-left: 8px;
    cursor: pointer;
    font-family: 'Noto Sans';
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    color: #fafbff;
`;

const ButtonWrapper = styled.div`
    margin-top: -45px;
    position: relative;
`;

const PopupPage = ({ isOpen, onClose, question, serverTime }) => {
    const [isChecked, setIsChecked] = useState(false);
    const { userId } = useParams();
    const navigate = useNavigate();

    const date = dayjs.utc(serverTime).tz('Asia/Seoul').format('MM월 DD일');

    const { hasWritten } = useUserStore();

    useEffect(() => {
        const lastPopupCheckedDate = localStorage.getItem('popupCheckedDate');
        const today = new Date().toLocaleDateString('ko-KR');


        if (lastPopupCheckedDate === today) {
            onClose();
        }
    }, [onClose]);

    const handleCheckboxChange = () => {
        const newCheckedStatus = !isChecked;
        setIsChecked(newCheckedStatus);

        if (newCheckedStatus) {
            const today = new Date().toLocaleDateString('ko-KR');
            localStorage.setItem('popupCheckedDate', today);
            onClose(); 
        }
    };

    const handleButtonClick = () => {
        onClose();
        navigate(`/record/${userId}`);
    };

    return (
        <Portal container={document.getElementById('capture-container')}>
            <PopupWrapper is_open={isOpen ? 'flex' : 'none'}>
                <PopupContent>
                    <SvgWrapper>
                        <img src='/assets/Popup.svg' alt='popup' />
                        <CloseButton onClick={onClose}>✕</CloseButton>
                        <TextWrapper>
                            <StyledTitle>
                                {question || '질문을 불러오는 중입니다...'}
                            </StyledTitle>
                            <StyledBodyText>
                                <span className='number'>{`${date.split('월')[0] || '01'}`}</span>
                                <span>{'월 '}</span>
                                <span className='number'>
                                    {`${
                                        date.split('월 ')[1]?.split('일')[0] ||
                                        '01'
                                    }`}
                                </span>
                                <span>{'일 '}</span>
                                질문에 대한
                                <br />
                                추억을 기록하러 가볼까요?
                            </StyledBodyText>
                        </TextWrapper>
                    </SvgWrapper>
                    <CheckboxWrapper onClick={handleCheckboxChange}>
                        <StyledCheckbox>
                            {isChecked ? (
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    width='20'
                                    height='20'
                                    viewBox='0 0 20 20'
                                    fill='none'
                                >
                                    <rect
                                        width='20'
                                        height='20'
                                        rx='4'
                                        fill='#6485CF'
                                    />
                                    <path
                                        d='M5 9L9 14L15.5 6'
                                        stroke='#FAFBFF'
                                        stroke-width='3'
                                        stroke-linecap='round'
                                        stroke-linejoin='round'
                                    />
                                </svg>
                            ) : (
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    width='21'
                                    height='20'
                                    viewBox='0 0 21 20'
                                    fill='none'
                                >
                                    <rect
                                        x='0.5'
                                        width='20'
                                        height='20'
                                        rx='4'
                                        fill='#FAFBFF'
                                    />
                                    <path
                                        d='M5.5 9L9.5 14L16 6'
                                        stroke='#B7B7B7'
                                        stroke-width='3'
                                        stroke-linecap='round'
                                        stroke-linejoin='round'
                                    />
                                </svg>
                            )}
                        </StyledCheckbox>
                        <CheckboxLabel>오늘 하루 질문 보지 않기</CheckboxLabel>
                    </CheckboxWrapper>
                    <ButtonWrapper>
                        <PopupButton
                            disabled={hasWritten}
                            text='추억 기록하기'
                            onClick={handleButtonClick}
                        />
                    </ButtonWrapper>
                </PopupContent>
            </PopupWrapper>
        </Portal>
    );
};

export default PopupPage;
