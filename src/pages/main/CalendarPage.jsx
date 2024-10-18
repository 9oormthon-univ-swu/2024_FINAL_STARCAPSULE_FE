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
    fill: #d5d1cd;
`;

const CloseButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    position: absolute;
    top: 26px;
    margin-left: -490px;
    color: #d5d1cd;
`;

const TitleWrapper = styled.div`
    text-align: center;
    margin-top: 110px;
    margin-left: -220px;
`;

const Title = styled.h1`
    color: var(--grey, #d5d1cd);
    font-family: 'Noto Sans';
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
`;

const SubTitle = styled.p`
    color: var(--white, #fffcfa);
    font-family: 'Noto Sans';
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    margin-left: -83px;
    margin-top: 5px;
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
                    <StyledCloseIcon
                        style={{ width: '30px', height: '30px' }}
                    />
                </CloseButton>
                <TitleWrapper>
                    <Title>당신의 추억을 모아 퍼즐을 완성하세요!</Title>
                    <SubTitle>보관된 추억 조각 0개</SubTitle>
                </TitleWrapper>
            </Header>
            <Calendar />
        </CalendarPageWrapper>
    );
};

export default CalendarPage;
