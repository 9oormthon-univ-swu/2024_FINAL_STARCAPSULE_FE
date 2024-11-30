import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

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
    background-color: #C3DEF7;
`;

const SnowballName = styled.span`
    color: #405EAB;
`;

const SVGImageContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    top: calc(-5%);
    width: 250px;
    height: 250px;
`;

const SubTitle = styled.p`
    font-size: 24px;
    color: white;
    white-space: nowrap;
    line-height: 1.5;
    text-align: center;
    font-family: 'Noto Sans';
    font-weight: 700;
    margin-bottom: 20px;
`;

const SVG = styled.svg`
    width: 200px;
    height: 200px;
    position: relative;
`;

const ObjectImage = styled.img`
    position: absolute;
    top: 80%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 65px;
    height: 65px;
    flex-shrink: 0;
`;
const CreationComplete = () => {
    const { userId } = useParams();
    const navigate = useNavigate();
    const [memoryData, setMemoryData] = useState(null);
    // const snowballName = localStorage.getItem('snowballName') || '이름';
    const selectedObject = localStorage.getItem('selectedObject') || '없음';

    const handleClick = () => {
        navigate(`/main/${userId}?page=1`);
    };

    const getObjectImagePath = (objectName) => {
        return `/assets/object/${objectName.toLowerCase()}.svg`;
    };

     useEffect(() => {
        const timer = setTimeout(() => {
            navigate(`/main/${userId}?page=1`);
        }, 5000);

        return () => clearTimeout(timer);
    }, [navigate, userId]); 

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
            <SVGImageContainer>
                <SubTitle>
                    <SnowballName>
                        {memoryData?.result?.writer || '작성자'}
                    </SnowballName>
                    님과의
                    <br />
                    추억이 전달되었어요
                </SubTitle>
                <SVG xmlns="http://www.w3.org/2000/svg" width="230" height="153" viewBox="0 0 230 153" fill="none">
                    <path d="M0 136.729V16.3662C0 7.52965 7.16344 0.366211 16 0.366211H121.179L213.467 0.366187C222.304 0.366185 229.467 7.52962 229.467 16.3662V136.729C229.467 145.565 222.304 152.729 213.467 152.729H16C7.16344 152.729 0 145.565 0 136.729Z" fill="#5A77B7"/>
                    <path d="M85.0285 81.9596C104.757 63.485 135.595 64.0321 154.655 83.195L217.933 146.813C219.815 148.705 218.475 151.928 215.806 151.928L17.905 151.928C15.1846 151.928 13.8687 148.598 15.8544 146.739L85.0285 81.9596Z" fill="#5A77B7"/>
                    <path d="M126.961 106.893C119.67 112.698 109.336 112.698 102.045 106.893L0.000175817 25.6455L0.00017666 16.0001C0.000177432 7.16356 7.16361 0.000125564 16.0002 0.000126337L213.006 0.000128301C221.842 0.000129073 229.006 7.16357 229.006 16.0001L229.006 25.6455L126.961 106.893Z" fill="#7296E6"/>
                </SVG>
                <ObjectImage
                    src={getObjectImagePath(selectedObject)}
                    alt='Selected Object SVG'
                />
            </SVGImageContainer>
        </Container>
    );
};

export default CreationComplete;
