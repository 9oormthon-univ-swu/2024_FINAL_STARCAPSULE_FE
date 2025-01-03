import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
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
    background-color: #c3def7;
`;

const SnowballName = styled.span`
    color: #405eab;
`;

const SVGImage = styled.img`
    width: 100%;
    height: 100%;
    position: relative;
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
    color: #4a4d48;
`;

const SVG = styled.svg`
    width: 200px;
    height: 200px;
    position: relative;
`;

const ObjectImage = styled.img`
    position: absolute;
    top: 70%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 3rem;
    height: 3rem;
    flex-shrink: 0;
`;
const CreationComplete = () => {
    const { userId } = useParams();
    const navigate = useNavigate();
    const [memoryData, _] = useState(null);

    const selectedObject = localStorage.getItem('selectedObject') || '없음';

    const handleClick = () => {
        navigate(`/main/${userId}?page=1&makeSnowball=true`);
    };

    const getObjectImagePath = (objectName) => {
        return `/assets/object/${objectName.toLowerCase()}.svg`;
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate(`/main/${userId}?page=1&makeSnowball=true`);
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
                <SVGImage
                    src={'/assets/Frame_1321315804.svg'}
                    alt='Frame SVG'
                />
                <ObjectImage
                    src={getObjectImagePath(selectedObject)}
                    alt='Selected Object SVG'
                />
            </SVGImageContainer>
        </Container>
    );
};

export default CreationComplete;
