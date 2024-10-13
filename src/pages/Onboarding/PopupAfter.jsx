import React from 'react';
import styled from 'styled-components';
import Popup from '../../assets/Popup.svg';

const PopupWrapper = styled.div`
    display: ${(props) => (props.isOpen ? 'flex' : 'none')};
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.6);
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

const StyledBodyText = styled.div`
    color: var(--font, #282828);
    text-align: center;
    font-family: 'Noto Sans', sans-serif;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    margin-top: 20px;
    line-height: 1.4;
    width: 220px;
    white-space: normal;
    word-break: break-word;

    span {
        font-family: 'Bigshot One', cursive;
    }
`;

const PopupAfter = ({ isOpen, onClose }) => {
    return (
        <PopupWrapper isOpen={isOpen}>
            <PopupContent>
                <SvgWrapper>
                    <Popup />
                    <CloseButton onClick={onClose}>✕</CloseButton>
                    <TextWrapper>
                        <StyledBodyText>
                            그동안의 추억이 공개되었어요!
                        </StyledBodyText>
                    </TextWrapper>
                </SvgWrapper>
            </PopupContent>
        </PopupWrapper>
    );
};

export default PopupAfter;
