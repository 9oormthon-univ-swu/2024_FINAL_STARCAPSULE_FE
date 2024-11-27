import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100dvh;
    width: 100vw;
    max-width: 480px;
    position: relative;
    overflow: hidden;
    margin: 0 auto;
    background-color: #27405e;
`;

const Title = styled.p`
    color: var(--kakao-logo, #000);
    text-align: center;
    -webkit-text-stroke-width: 0.2px;
    -webkit-text-stroke-color: var(--kakao-logo, #000);
    font-family: 'Kaisei Decol';
    font-size: 12px;
    font-style: normal;
    font-weight: bold;
    line-height: normal;
    background-color: #fff;
    color: #27405e;
    padding: 5px 10px;
    border-radius: 15px;
    position: fixed;
    top: calc(50% - 200px);
    left: 50%;
    transform: translateX(-50%);
`;

const QuestionText = styled.p`
    font-size: 18px;
    color: #fff;
    position: fixed;
    font-family: 'Griun NltoTAENGGU', sans-serif;
    top: calc(50% - 155px);
    left: 50%;
    transform: translateX(-50%);
    white-space: nowrap;
    text-align: center;
    color: var(--main2, #ddb892);
    font-style: normal;
    font-weight: 400;
    line-height: normal;
`;

const SubTitle = styled.p`
    font-family: 'Noto Sans';
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    color: #d5d1cd;
    position: fixed;
    top: 35%;
    left: 50%;
    transform: translateX(-50%);
    white-space: nowrap;
    line-height: 1.5;
`;

const SVGImage = styled.img`
    position: fixed;
    top: calc(40%);
    left: 50%;
    transform: translateX(-50%);
    width: 250px;
    height: 150px;
`;

const ObjectImage = styled.img`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 70px;
    height: 70px;
    flex-shrink: 0;
`;

const MyCreationComplete = () => {
    const { userId } = useParams(); // userId를 useParams로 가져오기
    const navigate = useNavigate();

    const [questionId, setQuestionId] = useState('');
    const [question, setQuestion] = useState('');
    const selectedObject = localStorage.getItem('selectedObject') || '없음';

    useEffect(() => {
        const storedQuestionId = localStorage.getItem('dailyQuestionId');
        const storedQuestion = localStorage.getItem('dailyQuestion');

        if (storedQuestionId) {
            setQuestionId(storedQuestionId);
        }
        if (storedQuestion) {
            setQuestion(storedQuestion);
        }
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate(`/main/${userId}?page=1`); // 일정 시간 후 자동 이동
        }, 5000); 

        return () => clearTimeout(timer); 
    }, [navigate, userId]); 

    const handleClick = () => {
        navigate(`/main/${userId}?page=1`); // userId를 URL에 반영
    };

    const getObjectImagePath = (objectName) => {
        return `/assets/object/${objectName.toLowerCase()}.svg`;  
    };

    return (
        <Container onClick={handleClick}>
            <Helmet>
                <title>스노로그 - 2024의 추억이 쌓이는 중</title>
                <meta
                    name='description'
                    content='스노로그에서 남은 2024의 추억을 쌓아보세요.'
                />
                <meta
                    property='og:title'
                    content='스노로그 - 2024의 추억이 쌓이는 중'
                />
                <meta
                    property='og:description'
                    content='스노로그에서 남은 2024의 추억을 쌓아보세요.'
                />
                <meta property='og:type' content='website' />
            </Helmet>
            <Title>self {questionId || '1'}</Title>
            <QuestionText>
                {question || '가장 행복했던 일은 무엇인가요?'}
            </QuestionText>
            <SubTitle>추억이 보관되었어요</SubTitle>
            <SVGImage src={'/assets/Frame_26085556.svg'} alt='Frame SVG' />
            <ObjectImage src={getObjectImagePath(selectedObject)} alt='Selected Object SVG' />
        </Container>
    );
};

export default MyCreationComplete;
