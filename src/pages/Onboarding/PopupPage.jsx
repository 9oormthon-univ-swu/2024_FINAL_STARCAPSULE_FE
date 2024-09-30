import React from 'react';
import styled from 'styled-components';

const PopupWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #2B3B52;
`; 

const PopupContent = styled.div`
  background-color: #F6ECE1;
  padding: 20px;
  border-radius: 15px;
  text-align: center;
  position: relative;
`;

const PopupTitle = styled.h2`
  font-size: 18px;
  color: #8B614E;
  margin-bottom: 10px;
`;

const PopupText = styled.p`
  font-size: 14px;
  color: #8B614E;
  margin-bottom: 20px;
`;

const RecordButton = styled.button`
  background-color: #8B614E;
  color: #fff;
  padding: 10px 20px;
  border-radius: 30px;
  font-size: 16px;
  border: none;
  cursor: pointer;
`;

const CloseButton = styled.span`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  font-size: 18px;
`;

const PopupPage = () => {
  return (
    <PopupWrapper>
      <PopupContent>
        <PopupTitle>올해 가장 행복했던 일은 무엇인가요?</PopupTitle>
        <PopupText>11월 30일 질문에 대한 추억을 기록하러 가볼까요?</PopupText>
        <RecordButton>추억 기록하기</RecordButton>
        <CloseButton>✕</CloseButton>
      </PopupContent>
    </PopupWrapper>
  );
};

export default PopupPage;
