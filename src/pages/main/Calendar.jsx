import React from 'react';
import styled from 'styled-components';
import Layout from '@/layouts/Layout';
import CalendarIcon1130 from '@/assets/calendar/white_puzzle_1.svg';
import CalendarIcon1 from '@/assets/calendar/white_puzzle_2.svg';
import CalendarIcon2 from '@/assets/calendar/white_puzzle_3.svg';
import CalendarIcon3 from '@/assets/calendar/white_puzzle_4.svg';
import CalendarIcon4 from '@/assets/calendar/white_puzzle_5.svg';
import CalendarIcon5 from '@/assets/calendar/white_puzzle_6.svg';
import CalendarIcon6 from '@/assets/calendar/white_puzzle_7.svg';
import CalendarIcon7 from '@/assets/calendar/white_puzzle_8.svg';
import CalendarIcon8 from '@/assets/calendar/white_puzzle_9.svg';
import CalendarIcon9 from '@/assets/calendar/white_puzzle_10.svg';
import CalendarIcon10 from '@/assets/calendar/white_puzzle_11.svg';
import CalendarIcon11 from '@/assets/calendar/white_puzzle_12.svg';
import CalendarIcon12 from '@/assets/calendar/white_puzzle_13.svg';
import CalendarIcon13 from '@/assets/calendar/white_puzzle_14.svg';
import CalendarIcon14 from '@/assets/calendar/white_puzzle_15.svg';
import CalendarIcon15 from '@/assets/calendar/white_puzzle_16.svg';
import CalendarIcon16 from '@/assets/calendar/white_puzzle_17.svg';
import CalendarIcon17 from '@/assets/calendar/white_puzzle_18.svg';
import CalendarIcon18 from '@/assets/calendar/white_puzzle_19.svg';
import CalendarIcon19 from '@/assets/calendar/white_puzzle_20.svg';
import CalendarIcon20 from '@/assets/calendar/white_puzzle_21.svg';
import CalendarIcon21 from '@/assets/calendar/white_puzzle_22.svg';
import CalendarIcon22 from '@/assets/calendar/white_puzzle_23.svg';
import CalendarIcon23 from '@/assets/calendar/white_puzzle_24.svg';
import CalendarIcon24 from '@/assets/calendar/white_puzzle_25.svg';
import CalendarIcon25 from '@/assets/calendar/white_puzzle_26.svg';
import CalendarIcon26 from '@/assets/calendar/white_puzzle_27.svg';
import CalendarIcon27 from '@/assets/calendar/white_puzzle_28.svg';
import CalendarIcon28 from '@/assets/calendar/white_puzzle_29.svg';
import CalendarIcon29 from '@/assets/calendar/white_puzzle_30.svg';
import CalendarIcon30 from '@/assets/calendar/white_puzzle_31.svg';
import CalendarIcon31 from '@/assets/calendar/white_puzzle_32.svg';

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
        <Layout snow={true} sx={{ padding: '20px 0' }}>
            <PopupWrapper>
                <GridContainer>
                    <IconWrapper>
                        <CalendarIcon1130 width='190%' height='auto' />
                    </IconWrapper>
                    <IconWrapper>
                        <CalendarIcon1 width='190%' height='auto' />
                    </IconWrapper>
                    <IconWrapper>
                        <CalendarIcon2 width='190%' height='auto' />
                    </IconWrapper>
                    <IconWrapper>
                        <CalendarIcon3 width='190%' height='auto' />
                    </IconWrapper>
                    <IconWrapper>
                        <CalendarIcon4 width='190%' height='auto' />
                    </IconWrapper>
                    <IconWrapper>
                        <CalendarIcon5 width='190%' height='auto' />
                    </IconWrapper>
                    <IconWrapper>
                        <CalendarIcon6 width='190%' height='auto' />
                    </IconWrapper>
                    <IconWrapper>
                        <CalendarIcon7 width='190%' height='auto' />
                    </IconWrapper>
                    <IconWrapper>
                        <CalendarIcon8 width='190%' height='auto' />
                    </IconWrapper>
                    <IconWrapper>
                        <CalendarIcon9 width='190%' height='auto' />
                    </IconWrapper>
                    <IconWrapper>
                        <CalendarIcon10 width='190%' height='auto' />
                    </IconWrapper>
                    <IconWrapper>
                        <CalendarIcon11 width='190%' height='auto' />
                    </IconWrapper>
                    <IconWrapper>
                        <CalendarIcon12 width='190%' height='auto' />
                    </IconWrapper>
                    <IconWrapper>
                        <CalendarIcon13 width='190%' height='auto' />
                    </IconWrapper>
                    <IconWrapper>
                        <CalendarIcon14 width='190%' height='auto' />
                    </IconWrapper>
                    <IconWrapper>
                        <CalendarIcon15 width='190%' height='auto' />
                    </IconWrapper>
                    <IconWrapper>
                        <CalendarIcon16 width='190%' height='auto' />
                    </IconWrapper>
                    <IconWrapper>
                        <CalendarIcon17 width='190%' height='auto' />
                    </IconWrapper>
                    <IconWrapper>
                        <CalendarIcon18 width='190%' height='auto' />
                    </IconWrapper>
                    <IconWrapper>
                        <CalendarIcon19 width='190%' height='auto' />
                    </IconWrapper>
                    <IconWrapper>
                        <CalendarIcon20 width='190%' height='auto' />
                    </IconWrapper>
                    <IconWrapper>
                        <CalendarIcon21 width='190%' height='auto' />
                    </IconWrapper>
                    <IconWrapper>
                        <CalendarIcon22 width='190%' height='auto' />
                    </IconWrapper>
                    <IconWrapper>
                        <CalendarIcon23 width='190%' height='auto' />
                    </IconWrapper>
                    <IconWrapper>
                        <CalendarIcon24 width='190%' height='auto' />
                    </IconWrapper>
                    <IconWrapper>
                        <CalendarIcon25 width='190%' height='auto' />
                    </IconWrapper>
                    <IconWrapper>
                        <CalendarIcon26 width='190%' height='auto' />
                    </IconWrapper>
                    <IconWrapper>
                        <CalendarIcon27 width='190%' height='auto' />
                    </IconWrapper>
                    <IconWrapper>
                        <CalendarIcon28 width='190%' height='auto' />
                    </IconWrapper>
                    <IconWrapper>
                        <CalendarIcon29 width='190%' height='auto' />
                    </IconWrapper>
                    <CalendarIcon30
                        style={{
                            width: '205%',
                            height: 'auto',
                            transform: 'translate( -6.5px, -63px)',
                            maxWidth: 'none',
                            maxHeight: 'none',
                        }}
                    />
                    <CalendarIcon31
                        style={{
                            width: '310%',
                            height: 'auto',
                            transform: 'translate( 95px, -62px)',
                            maxWidth: 'none',
                            maxHeight: 'none',
                        }}
                    />
                </GridContainer>
            </PopupWrapper>
        </Layout>
    );
};

export default Calendar;
