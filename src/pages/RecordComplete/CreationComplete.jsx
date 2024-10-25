import styled from 'styled-components';
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100vw;
    max-width: 480px;
    position: relative;
    overflow: hidden;
    margin: 0 auto;
    background-color: #27405e;
`;

const SubTitle = styled.p`
    font-size: 24px;
    position: absolute;
    bottom: 550px;
    transform: translateX(-50%);
    left: 50%;
    color: white;
    white-space: nowrap;
    line-height: 1.5;
    text-align: center;
    font-family: 'Noto Sans';
    font-weight: 700;
`;

const SnowballName = styled.span`
    color: #ddb892;
`;

const SVGImage = styled.img`
    position: absolute;
    bottom: 380px;
    left: 50%;
    transform: translateX(-50%);
    width: 250px;
    height: 150px;
`;

const CreationComplete = () => {
    const { userId } = useParams();
    const navigate = useNavigate();

    const snowballName = localStorage.getItem('snowballName') || '이름';

    const handleClick = () => {
        navigate(`/main/${userId}`);
    };

    return (
        <Container onClick={handleClick}>
            <SubTitle>
                <SnowballName>{snowballName}</SnowballName>님과의
                <br />
                추억이 전달되었어요
            </SubTitle>
            <SVGImage src={'/assets/Frame_26085556.svg'} alt='Frame SVG' />
        </Container>
    );
};

export default CreationComplete;
