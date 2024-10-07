import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Snowfall from 'react-snowfall';
import axios from 'axios';  
import backgroundBottom from '../../assets/background_bottom.svg'; 

import '@dotlottie/player-component';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  max-width: 480px; 
  background: linear-gradient(180deg, #0B0A1B 0%, #27405E 100%); 
  position: relative;
  overflow: hidden;
  margin: 0 auto; 
  background-color: white; 
`;

const SubTitle = styled.p`
  font-size: 19px;
  color: #fff;
  position: absolute; 
  bottom: 300px;
  transform: translateX(-50%);
  left: 50%; 
  white-space: nowrap; 
  line-height: 1.5;
`;

const Button = styled.button`
  display: inline-flex;
  height: 62px;
  padding: 20px 109px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  border: none;
  border-radius: 20px;
  background: var(--main2, #DDB892);
  box-shadow: 0px 0px 4px 0px rgba(40, 40, 40, 0.20);
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  position: absolute;
  bottom: 40px;
  z-index: 10;
`;

const BottomImage = styled.img`
  position: absolute;
  bottom: 0;
  height: 100vh;
  bottom: -335px; 
  width: 100vw;
  max-width: 480px; 
  object-fit: contain; 
`;

const SnowballPage = () => {
  const navigate = useNavigate();

  // URL에서 토큰 가져오기
  const getTokenFromURL = () => {
    return new URL(window.location.href).searchParams.get('token');
  };

   // 버튼 클릭 시 스노우볼 생성 API 호출
   const handleCreateSnowball = () => {
    const token = getTokenFromURL(); // URL에서 토큰 추출
    const snowballAPI = 'http://34.64.85.134:8888/api/capsule'; 

    if (token) {
      axios.post(snowballAPI, {}, {
        headers: {
          Authorization: `Bearer ${token}`, // Authorization 헤더에 토큰 포함
        },
      })
      .then((response) => {
        console.log('스노우볼 생성 성공:', response.data);
        navigate('/popup'); 
      })
      .catch((error) => {
        console.error('스노우볼 생성 실패:', error);
      });
    } else {
      console.error('토큰이 URL에 없습니다');
    }
  };

  return (
    <Container>
      <Snowfall 
        color="white" 
        snowflakeCount={33}  
        speed={[0, 0.5]}    
        wind={[0, 0.5]}      
        radius={[0.5, 3]}    
      />
      
      {/* Lottie 애니메이션 추가 */}
      <dotlottie-player 
        src="https://lottie.host/699c976a-3836-4dd2-9858-edaa2d16b866/KDNntsFKi1.json" 
        background="transparent" 
        speed="1" 
        style={{ width: '300px', height: '300px', position: 'absolute', bottom: '410px', left: '50%', transform: 'translateX(-50%)' }} 
        loop 
        autoplay>
      </dotlottie-player>

      <SubTitle>
        질문에 대한 답변을 매일 작성하고<br />
        주변 사람들에게 추억을 전달받아요
      </SubTitle>

      <Button onClick={handleCreateSnowball}>
        스노우볼 만들기
      </Button>
      
      <BottomImage src={backgroundBottom} alt="Snow background" /> 
    </Container>
  );
};

export default SnowballPage;
