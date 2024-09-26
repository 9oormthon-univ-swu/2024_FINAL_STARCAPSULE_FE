import React, { useState } from 'react';
import styled from 'styled-components';
import TransmissionModal from '../components/TransmissionModal'; // 모달 컴포넌트 임포트

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #2B3B52;
  color: #fff;
`;

const Title = styled.h1`
  font-family: 'Times New Roman', serif;
  font-size: 36px;
  margin-bottom: 10px;
`;

const SubTitle = styled.p`
  font-size: 16px;
  margin-bottom: 40px;
`;

const KakaoButton = styled.button`
  background-color: #FFE812;
  color: black;
  padding: 15px 40px;
  border-radius: 30px;
  font-size: 18px;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const KakaoIcon = styled.span`
  margin-right: 10px;
`;

const LoginPage = () => {
  const [modalOpen, setModalOpen] = useState(false); 

  return (
    <Container>
      <Title>Snow Log</Title>
      <SubTitle>추억을 보관하고 공유받아 나만의 스노우볼을 완성해요</SubTitle>
      <KakaoButton onClick={() => setModalOpen(true)}> 
        <KakaoIcon>💬</KakaoIcon>카카오 로그인
      </KakaoButton>
      <TransmissionModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={() => {
          setModalOpen(false); 
          console.log("모달의 확인을 눌렀을 때의 액션을 처리"); 
        }}
      />
    </Container>
  );
};

export default LoginPage;
