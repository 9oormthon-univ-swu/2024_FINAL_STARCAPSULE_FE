import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as Popup } from '../../assets/Popup.svg';
import PopupButton from './PopupButton';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

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
    color: #7f5539;
    text-align: center;
    -webkit-text-stroke-width: 0.7px;
    -webkit-text-stroke-color: var(--button1, #7f5539);
    font-size: 23px;
    font-style: normal;
    margin-top: 13px;
    line-height: 28px;
    font-family: 'Griun NltoTAENGGU', sans-serif;
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

const PopupPage = ({ isOpen, onClose }) => {
    const [question, setQuestion] = useState('');
    const [date, setDate] = useState('');
    const navigate = useNavigate(); 

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.log('로그인 하세요.');
            return;
        }

        const fetchQuestion = async () => {
            try {
                console.log('Token:', token);

                const response = await axios.get(
                    `${process.env.REACT_APP_API_URL}/api/question`, 
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            Accept: '*/*',
                        },
                    }
                );

                console.log('Response:', response.data);

                const result = response.data.result;

                // 질문이 있으면 설정하고, 없으면 빈 문자열 유지
                setQuestion(result.question || '');

                // 날짜를 "MM-DD" 형식으로 변환
                const apiDate = result.date;
                if (apiDate) {
                    const dateObj = new Date(apiDate);
                    const formattedDate = `${dateObj.getMonth() + 1}월 ${dateObj.getDate()}일`;
                    setDate(formattedDate); 
                    
                    // 질문, 날짜, ID를 로컬 스토리지에 저장
                    localStorage.setItem('dailyQuestion', result.question);
                    localStorage.setItem('dailyDate', formattedDate);
                    localStorage.setItem('dailyQuestionId', result.id); 
                }
            } catch (error) {
                if (error.response) {
                    console.error('Error response data:', error.response.data);
                    console.error('Error status:', error.response.status);
                } else if (error.request) {
                    console.error('Error request:', error.request);
                } else {
                    console.error('Error message:', error.message);
                }
            }
        };

        fetchQuestion();
    }, []);

   
    const handleButtonClick = () => {
        onClose(); 
        navigate('/record'); 
    };

    return (
        <PopupWrapper isOpen={isOpen}>
            <PopupContent>
                <SvgWrapper>
                    <Popup /> 
                    <CloseButton onClick={onClose}>✕</CloseButton>
                    <TextWrapper>
                        <StyledTitle>
                            {question || '질문을 불러오는 중입니다...'} 
                        </StyledTitle>
                        <StyledBodyText>
                            <span>{date.split('월')[0] || '01'}</span>월 <span>{date.split('월 ')[1]?.split('일')[0] || '01'}</span>일 질문에 대한<br />
                            추억을 기록하러 가볼까요?
                        </StyledBodyText>
                    </TextWrapper>
                </SvgWrapper>
                <PopupButton onClick={handleButtonClick} /> 
            </PopupContent> 
        </PopupWrapper>
    );
};

export default PopupPage;
