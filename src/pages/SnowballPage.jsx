import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #2B3B52;
  color: #fff;
`;

const IconWrapper = styled.div`
  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`;

const SubTitle = styled.p`
  font-size: 16px;
  text-align: center;
  margin-bottom: 40px;
`;

const SnowballButton = styled.button`
  background-color: #8B614E;
  color: white;
  padding: 15px 30px;
  border-radius: 30px;
  font-size: 16px;
  border: none;
  cursor: pointer;
`;

const SnowballPage = () => {
  return (
    <Container>
      <IconWrapper>
       
        
      </IconWrapper>
      <Title>스노우볼 만들기</Title>
      <SubTitle>질문에 대한 답변을 매일 작성하고<br />주변 사람들에게 추억을 전달받아요</SubTitle>
      <SnowballButton>스노우볼 만들기</SnowballButton>
    </Container>
  );
};

export default SnowballPage;
