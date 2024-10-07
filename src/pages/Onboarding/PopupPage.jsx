import React from 'react';
import styled from 'styled-components';
import { ReactComponent as Popup } from '../../assets/Popup.svg'; 

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
  top: 15px;
  right: 35px;
  cursor: pointer;
  font-size: 18px;
  z-index: 1; 
`;

const TextWrapper = styled.div`
  position: absolute;
  top: 50px; 
  left: 50%;
  transform: translateX(-50%); 
  text-align: center; 
  z-index: 1; 
`;

const StyledTitle = styled.div`
  color: var(--button1, #7F5539);
  text-align: center;
  -webkit-text-stroke-width: 0.3px;
  -webkit-text-stroke-color: var(--button1, #7F5539);
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 28px;
  font-family: 'Griun NltoTAENGG', sans-serif; 
`;


const StyledBodyText = styled.div`
  color: var(--font, #282828);
  text-align: center;
  font-family: "Noto Sans";
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;


const StyledButton = styled.button`
  border-radius: 20px;
  background: var(--button1, #7F5539); 
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);
  color: white; 
  padding: 10px 20px; 
  border: none; 
  cursor: pointer; 
  width: 185.915px; 
  height: 50.905px; 
  flex-shrink: 0; 
  margin-top: -70px; 
  z-index: 1; 
`;

const PopupPage = ({ isOpen, onClose }) => {
  return (
    <PopupWrapper isOpen={isOpen}>
      <PopupContent>
        <SvgWrapper>
          <Popup /> {/* SVG 렌더링 */}
          <CloseButton onClick={onClose}>✕</CloseButton>
          <TextWrapper>
            <StyledTitle gutterBottom>
              올해 가장 행복했던 일은 무엇인가요?
            </StyledTitle>
            <StyledBodyText gutterBottom>
              11월 30일 질문에 대한 추억을 기록하러 가볼까요?
            </StyledBodyText>
          </TextWrapper>
        </SvgWrapper>
        <StyledButton onClick={onClose}>
          추억 기록하기
        </StyledButton>
      </PopupContent>
    </PopupWrapper>
  );
};

export default PopupPage;