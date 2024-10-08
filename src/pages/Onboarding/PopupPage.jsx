import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as Popup } from '../../assets/Popup.svg'; 
import PopupButton from './PopupButton';
import axios from 'axios';

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

const StyledTitle = styled.div`
  color: #7F5539;
  text-align: center;
  -webkit-text-stroke-width: 0.7px;
  -webkit-text-stroke-color: var(--button1, #7F5539);
  font-size: 23px;
  font-style: normal;
  margin-top: 13px; 
  line-height: 28px;
  font-family: 'Griun NltoTAENGGU', sans-serif; 
`;

const StyledBodyText = styled.div`
  color: var(--font, #282828);
  text-align: center;
  font-family: "Noto Sans", sans-serif;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  margin-top: 20px; 
  line-height: 1.4;
  width: 220px; 
  white-space: normal; 
  word-break: break-word;

  span {
    font-family: "Bigshot One", cursive; 
  }
`;

const PopupPage = ({ isOpen, onClose }) => {
  const [question, setQuestion] = useState('올해 가장 행복했던 일은 무엇인가요?'); // 기본 질문 설정
  const [date, setDate] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.log('로그인 하세요.');
      
      return;
    }

    const fetchQuestion = async () => {
      try {
        
        console.log('Token:', token);

        const response = await axios.get('http://34.64.85.134:8888/api/question', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': '*/*'
          }
        });

        console.log('Response:', response.data); // 서버에서 받은 데이터 출력
        setQuestion(response.data.question || question); // 질문이 있을 경우 업데이트

        // 날짜 포맷팅
        const formattedDate = new Date(response.data.date).toLocaleDateString('ko-KR', {
          year: 'numeric', month: 'long', day: 'numeric'
        });
        setDate(formattedDate);
      } catch (error) {
        if (error.response) {
          console.error('Error response data:', error.response.data);
          console.error('Error status:', error.response.status);
          if (error.response.status === 401) {
            // 401 에러 발생 시, 로그인 페이지로 리다이렉트하는 로직 추가 안해도 될듯
            console.log('인증 오류: 다시 로그인해주세요.');
           
          }
        } else if (error.request) {
          console.error('Error request:', error.request);
        } else {
          console.error('Error message:', error.message);
        }
      }
    };

    fetchQuestion();
  }, []); // 의존성 배열을 비워두어 컴포넌트가 마운트될 때만 실행

  return (
    <PopupWrapper isOpen={isOpen}>
      <PopupContent>
        <SvgWrapper>
          <Popup /> 
          <CloseButton onClick={onClose}>✕</CloseButton>
          <TextWrapper>
            <StyledTitle gutterBottom>
              {question} 
            </StyledTitle>
            <StyledBodyText gutterBottom>
              <span>{date.split(' ')[1] || '11'}</span>월 <span>{date.split(' ')[2] || '30'}</span>일 질문에 대한<br />
              추억을 기록하러 가볼까요?
            </StyledBodyText>
          </TextWrapper>
        </SvgWrapper>
        <PopupButton onClick={onClose} /> 
      </PopupContent>
    </PopupWrapper>
  );
};

export default PopupPage;
