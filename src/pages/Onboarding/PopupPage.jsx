import React, { useEffect, useState } from 'react'; 
import styled from 'styled-components';
import PopupButton from './PopupButton';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

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
    color: #282828;
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

const CheckboxWrapper = styled.div`
    display: flex;
    align-items: center;
    margin-top: 10px; 
`;

const StyledCheckbox = styled.div`
    width: 20px;
    height: 20px;
    cursor: pointer;

    svg {
        display: block;
    }
`;

const CheckboxLabel = styled.label`
    font-size: 16px;
    color: white; 
    margin-left: 8px;
    cursor: pointer;
`;

const ButtonWrapper = styled.div`
    margin-top: -45px; 
    position: relative; 
`;

const PopupPage = ({ isOpen, onClose }) => {
    const [question, setQuestion] = useState('');
    const [date, setDate] = useState('');
    const [isChecked, setIsChecked] = useState(false); // 체크박스 상태
    const { userId } = useParams();
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
                    `${import.meta.env.VITE_API_URL}/api/question`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                console.log('Response:', response.data);

                const result = response.data.result;
                setQuestion(result.question || '');

                const apiDate = result.date;
                if (apiDate) {
                    const dateObj = new Date(apiDate);
                    const formattedDate = `${dateObj.getMonth() + 1}월 ${dateObj.getDate()}일`;
                    setDate(formattedDate);

                    localStorage.setItem('dailyQuestion', result.question);
                    localStorage.setItem('dailyDate', formattedDate);
                    localStorage.setItem('dailyQuestionId', result.id);

                    // 내 추억 조회 API 호출 및 질문 ID 비교
                    const memoryResponse = await axios.get(
                        `${import.meta.env.VITE_API_URL}/api/my_memory/${result.id}`,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );

                    console.log('Memory Response:', memoryResponse.data); // 내 추억 데이터 확인을 위한 콘솔 출력

                    // 질문이 이미 작성되었다면 팝업 닫기
                    if (memoryResponse.data.dailyQuestion?.id === result.id) {
                        console.log('질문이 이미 작성되었습니다.');
                        onClose();
                    } else {
                        console.log('질문이 작성되지 않았습니다.');
                    }
                }
            } catch (error) {
                console.error('Error fetching question or memory:', error);
            }
        };

        fetchQuestion();
    }, [onClose]);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
        if (!isChecked) {
            const today = new Date().toISOString().split('T')[0];
            localStorage.setItem('popupCheckedDate', today); // 체크박스가 체크된 날짜 저장
        }
    };

    const handleButtonClick = () => {
        onClose();
        navigate(`/record/${userId}`);
    };

    return (
        <PopupWrapper isOpen={isOpen}>
            <PopupContent>
                <SvgWrapper>
                    <img src='/assets/Popup.svg' alt='popup' />
                    <CloseButton onClick={onClose}>✕</CloseButton>
                    <TextWrapper>
                        <StyledTitle>{question || '질문을 불러오는 중입니다...'}</StyledTitle>
                        <StyledBodyText>
                            <span>{date.split('월')[0] || '01'}</span>월{' '}
                            <span>{date.split('월 ')[1]?.split('일')[0] || '01'}</span>일 질문에 대한
                            <br />
                            추억을 기록하러 가볼까요?
                        </StyledBodyText>
                    </TextWrapper>
                </SvgWrapper>
                <CheckboxWrapper onClick={handleCheckboxChange}>
                    <StyledCheckbox>
                        {isChecked ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <rect width="20" height="20" rx="4" fill="#7F5539"/>
                                <path d="M5 9L9 14L15.5 6" stroke="#FFFCFA" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <rect width="20" height="20" rx="4" fill="#FFFCFA"/>
                                <path d="M5 9L9 14L15.5 6" stroke="#D5D1CD" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        )}
                    </StyledCheckbox>
                    <CheckboxLabel>
                        오늘 하루 질문 보지 않기
                    </CheckboxLabel>
                </CheckboxWrapper>
                <ButtonWrapper>
                <PopupButton text="추억 기록하기" onClick={handleButtonClick} />
                </ButtonWrapper>
            </PopupContent>
        </PopupWrapper>
    );
};

export default PopupPage;
