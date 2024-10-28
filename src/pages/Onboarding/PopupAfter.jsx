import React, { useState } from 'react';
import styled from 'styled-components';
import PopupButton from './PopupButton';

const PopupWrapper = styled.div`
    display: ${(props) => (props.isOpen ? 'flex' : 'none')};
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
    width: 100%; 
    height: auto; 
`;

const StyledSvg = styled.img`
    width: 280px; 
    height: 320px; 
`;

const TextWrapper = styled.div`
    position: absolute;
    top: 60px;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    z-index: 1;
`;

const StyledBodyText = styled.div`
    color: #7f5539;
    text-align: center;
    -webkit-text-stroke-width: 0.7px;
    -webkit-text-stroke-color: var(--button1, #7f5539);
    font-size: 30px;
    font-style: normal;
    margin-top: 13px;
    line-height: 36px;
    font-family: 'Griun NltoTAENGGU', sans-serif;
    white-space: nowrap;
`;

const CheckboxWrapper = styled.div`
    display: flex;
    align-items: center;
    margin-top: 14px; //체크박스 위치 이거로 고정
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
    font-size: 16px;
    color: white;
    margin-left: 8px;
    cursor: pointer;
`;

const ButtonWrapper = styled.div`
    margin-top: -35px; 
    position: relative; //체크박스에 영향이 가지않게
`;

const PopupAfter = ({ isOpen, onClose }) => {
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    return (
        <PopupWrapper isOpen={isOpen}>
            <PopupContent>
                <SvgWrapper>
                    <StyledSvg src={'/assets/Popup.svg'} alt='popup' />
                    <TextWrapper>
                        <StyledBodyText>
                            그동안의 추억이<br />
                            공개되었어요!
                        </StyledBodyText>
                    </TextWrapper>
                </SvgWrapper>

                {/* 체크박스 섹션 */}
                <CheckboxWrapper onClick={handleCheckboxChange}>
                    <StyledCheckbox>
                        {isChecked ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <rect width="20" height="20" rx="4" fill="#7F5539"/>
                                <path d="M5 9L9 14L15.5 6" stroke="#FFFCFA" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <rect width="20" height="20" rx="4" fill="#FFFCFA"/>
                                <path d="M5 9L9 14L15.5 6" stroke="#D5D1CD" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        )}
                    </StyledCheckbox>
                    <CheckboxLabel>오늘 하루 질문 보지 않기</CheckboxLabel>
                </CheckboxWrapper>

                {/* 버튼 섹션 */}
                <ButtonWrapper>
                    <PopupButton text="추억 모아보기" onClick={onClose} />
                </ButtonWrapper>
            </PopupContent>
        </PopupWrapper>
    );
};

export default PopupAfter;
