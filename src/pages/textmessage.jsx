import React from 'react';
import styled from 'styled-components';

const TextMessage = () => {
  return (
    <Container>
      <DateText>2024년 11월 30일</DateText>
      <ToText>To. 구르미</ToText>
      <MessageBox>
        <ImagePlaceholder />
        <Message>안녕하세요 안녕하세요 안녕하세요 안녕하세요 안녕하세요 안녕하세요...</Message>
      </MessageBox>
      <ToWriter>To. 작성자</ToWriter>
      <SaveButton>이미지 저장하기</SaveButton>
    </Container>
  );
};

export default TextMessage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #000;
  color: #fff;
`;

const DateText = styled.div`
  margin-bottom: 20px;
  font-size: 18px;
  color: #e3b88d;
`;

const ToText = styled.div`
  margin-bottom: 10px;
  font-size: 20px;
  font-weight: bold;
`;

const MessageBox = styled.div`
  background-color: #fff;
  color: #000;
  width: 80%;
  height: 300px;
  margin-bottom: 20px;
  padding: 20px;
  border-radius: 10px;
  overflow: auto;
`;

const ImagePlaceholder = styled.div`
  width: 100%;
  height: 150px;
  background-color: #ccc;
  margin-bottom: 10px;
`;

const Message = styled.p`
  white-space: pre-line;
`;

const ToWriter = styled.div`
  margin-top: 20px;
  font-size: 18px;
`;

const SaveButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
  background-color: #a67c52;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #8a613e;
  }
`;
