import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Snowfall from 'react-snowfall';  
import backgroundBottom from '../../assets/background_bottom.svg'; 

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

  const handleKakaoLogin = () => {
    navigate('/popup');
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
      <SubTitle>
  질문에 대한 답변을 매일 작성하고<br />
  주변 사람들에게 추억을 전달받아요
</SubTitle>
<Button onClick={handleKakaoLogin}>
     스노우볼 만들기
      </Button>
      <BottomImage src={backgroundBottom} alt="Snow background" /> 
    </Container>
  );
};

export default SnowballPage;
