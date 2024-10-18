import React from 'react';
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

const PopupAfter = ({ isOpen, onClose }) => {
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
                <PopupButton text="추억 모아보기" onClick={onClose} />
            </PopupContent>
        </PopupWrapper>
    );
};

export default PopupAfter;
