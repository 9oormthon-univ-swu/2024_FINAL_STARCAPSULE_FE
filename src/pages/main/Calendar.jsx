import React from 'react';
import styled from 'styled-components';
import Layout from '@/layouts/Layout';

// 아이콘을 리스트로 정의
const calendarIcons = Array.from(
    { length: 32 },
    (_, i) => `/assets/calendar/white_puzzle_${i + 1}.svg`
);

const PopupWrapper = styled.div`
    display: flex;
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

const GridContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(6, 1fr);
    grid-gap: -10px;
    width: 80%;
    max-width: 467px;
    height: 600px;
    margin: 0 auto;
    margin: 150px auto 0;
`;

const IconWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    &:nth-child(1) {
        transform: translate(-6.5px, -5px);
    }
    &:nth-child(2) {
        transform: translate(-2px, 7px);
    }
    &:nth-child(3) {
        transform: translate(2.5px, -13px);
    }
    &:nth-child(4) {
        transform: translate(6px, -5.5px);
    }
    &:nth-child(5) {
        transform: translate(10.5px, 6px);
    }
    &:nth-child(6) {
        transform: translate(-6.5px, -30.5px);
    }
    &:nth-child(7) {
        transform: translate(-2px, -10px);
    }
    &:nth-child(8) {
        transform: translate(2.8px, -29px);
    }
    &:nth-child(9) {
        transform: translate(6px, -31px);
    }
    &:nth-child(10) {
        transform: translate(10.5px, -7px);
    }
    &:nth-child(11) {
        transform: translate(-6.5px, -43.5px);
    }
    &:nth-child(12) {
        transform: translate(-2px, -51px);
    }
    &:nth-child(13) {
        transform: translate(3px, -39px);
    }
    &:nth-child(14) {
        transform: translate(6px, -58px);
    }
    &:nth-child(15) {
        transform: translate(10.5px, -34.5px);
    }
    &:nth-child(16) {
        transform: translate(-6.5px, -42px);
    }
    &:nth-child(17) {
        transform: translate(-2px, -70px);
    }
    &:nth-child(18) {
        transform: translate(3px, -53px);
    }
    &:nth-child(19) {
        transform: translate(6px, -68px);
    }
    &:nth-child(20) {
        transform: translate(10.5px, -57px);
    }
    &:nth-child(21) {
        transform: translate(-6.5px, -53px);
    }
    &:nth-child(22) {
        transform: translate(-2px, -70px);
    }
    &:nth-child(23) {
        transform: translate(3px, -54px);
    }
    &:nth-child(24) {
        transform: translate(6px, -65px);
    }
    &:nth-child(25) {
        transform: translate(10.5px, -65.5px);
    }
    &:nth-child(26) {
        transform: translate(-6.5px, -64px);
    }
    &:nth-child(27) {
        transform: translate(-2px, -67px);
    }
    &:nth-child(28) {
        transform: translate(3px, -58.5px);
    }
    &:nth-child(29) {
        transform: translate(6px, -63.5px);
    }
    &:nth-child(30) {
        transform: translate(10.5px, -63.5px);
    }
`;

const Calendar = () => {
    return (
        <Layout snow sx={{ padding: '20px 0' }}>
            <PopupWrapper>
                <GridContainer>
                    {calendarIcons.map((iconSrc, index) => (
                        <IconWrapper key={index}>
                            <img src={iconSrc} alt={`calendar ${index + 1}`} />
                        </IconWrapper>
                    ))}
                </GridContainer>
            </PopupWrapper>
        </Layout>
    );
};

export default Calendar;
