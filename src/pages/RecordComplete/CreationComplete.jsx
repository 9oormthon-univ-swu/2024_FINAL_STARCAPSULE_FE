import styled from 'styled-components';
import React, { useEffect } from 'react';
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

const ObjectImage = styled.img`
    position: absolute;
    top: 52%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 70px;
    height: 70px;
    flex-shrink: 0;
`;

const CreationComplete = () => {
    const { userId } = useParams();
    const navigate = useNavigate();
    const [memoryData, setMemoryData] = useState(null);
    // const snowballName = localStorage.getItem('snowballName') || '이름';
    const selectedObject = localStorage.getItem('selectedObject') || '없음';

    const handleClick = () => {
        navigate(`/guest/${userId}?page=1`);
    };

    const getObjectImagePath = (objectName) => {
        return `/assets/object/${objectName.toLowerCase()}.svg`;  
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate(`/guest/${userId}?page=1`);
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
            <SubTitle>
                <SnowballName>{memoryData?.result?.writer || '작성자'}</SnowballName>님과의
                <br />
                추억이 전달되었어요
            </SubTitle>
            <SVGImage src={'/assets/Frame_26085556.svg'} alt='Frame SVG' />
            <ObjectImage src={getObjectImagePath(selectedObject)} alt='Selected Object SVG' />
        </Container>
    );
};

export default CreationComplete;
