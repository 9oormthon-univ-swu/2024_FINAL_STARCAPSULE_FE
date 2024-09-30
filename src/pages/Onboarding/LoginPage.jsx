import React, { useState } from 'react';
import styled from 'styled-components';
import TransmissionModal from '../../components/TransmissionModal';
import Snowfall from 'react-snowfall';  

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(180deg, #0B0A1B 0%, #27405E 100%); 
  position: relative;
  overflow: hidden;
`;

const Title = styled.h1`
  font-family: 'Dancing Script', cursive;
  font-size: 48px;
  color: #fff;
  margin-bottom: 10px;
`;

const SubTitle = styled.p`
  font-size: 16px;
  color: #fff;
  margin-bottom: 40px;
`;

const KakaoButton = styled.button`
  background-color: #FEE500; 
  color: #3C1E1E; 
  display: flex;
  width: 312px;
  height: 62px;
  padding: 0px 14px;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 12px; 
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0px 0px 4px 0px rgba(40, 40, 40, 0.20);
  
  &:hover {
    background-color: #F7DF00;
  }
`;

const KakaoIcon = styled.span`
  display: inline-block;
  margin-right: 10px;
  width: 24px;
  height: 24px;
`;

const KakaoSVG = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="black"  
    width="24px"
    height="24px"
  >
    <path d="M12,2C6.48,2,2,5.58,2,10.14c0,2.58,1.78,4.87,4.45,6.24C6.15,17.85,5.4,19.81,5.27,19.81c0,0,0,0,0,0c0.26,0.02,3.35-1.24,4.92-2.09c0.61,0.11,1.25,0.18,1.91,0.18c5.52,0,10-3.58,10-8.14S17.52,2,12,2z"/>
  </svg>
);

const LoginPage = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <Container>
      <Snowfall 
        color="white" 
        snowflakeCount={33}  
        speed={[0, 0.5]}    
        wind={[0, 0.5]}      
        radius={[0.5, 3]}    
      />
      <Title>Snow Log</Title>
      <SubTitle>추억을 보관하고 공유받아 나만의 스노우볼을 완성해요</SubTitle>
      <KakaoButton onClick={() => setModalOpen(true)}>
        <KakaoIcon>
          <KakaoSVG />  
        </KakaoIcon>
        카카오 로그인
      </KakaoButton>
      <TransmissionModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={() => {
          setModalOpen(false);
          console.log('모달의 확인을 눌렀을 때의 액션을 처리');
        }}
      />
    </Container>
  );
};

export default LoginPage;
