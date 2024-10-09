import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom'; 
import Calendar from './Calendar'; 
import CloseIcon from '../../components/icons/CloseIcon'; 

const CalendarPageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100vh; 
  overflow: hidden; 
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Header = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  right: 20px;
  display: flex;
  flex-direction: column; 
  align-items: center;
  z-index: 10000; 
`;

const StyledCloseIcon = styled(CloseIcon)`
  fill: #D5D1CD; 
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  position: absolute;
  top: 10px;
  margin-left: -500px;
  color: #D5D1CD; 
`;

const TitleWrapper = styled.div`
  text-align: center;
  margin-top: 40px; 
`;

const Title = styled.h1`
  font-size: 18px;
  font-weight: bold;
  color: #fff;
`;

const SubTitle = styled.p`
  font-size: 14px;
  color: #fff;
`;

const CalendarPage = () => {
  const navigate = useNavigate(); 

  const handleClose = () => {
    navigate(-1); 
  };

  return (
    <CalendarPageWrapper>
      <Header>
        <CloseButton onClick={handleClose}> 
          <StyledCloseIcon width="24px" height="24px" />
        </CloseButton>
        <TitleWrapper>
          <Title>당신의 추억을 모아 퍼즐을 완성하세요!</Title>
          <SubTitle>보관된 추억 조각 2개</SubTitle>
        </TitleWrapper>
      </Header>
      <Calendar />
    </CalendarPageWrapper>
  );
};

export default CalendarPage;
