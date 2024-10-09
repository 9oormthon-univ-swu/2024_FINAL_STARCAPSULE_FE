import React from 'react';
import styled from 'styled-components';
import { ReactComponent as CalendarIcon } from '../../assets/calendar/before_puzzle_1130.svg'; // 경로 확인

const PopupWrapper = styled.div`
  display: flex; /* 항상 보이도록 수정 */
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
  z-index: 1010;
`;

const Calendar = () => {
  return (
    <PopupWrapper>
      <PopupContent>
        <CalendarIcon width="500px" height="500px" /> {/* SVG 표시 */}
      </PopupContent>
    </PopupWrapper>
  );
};

export default Calendar;
