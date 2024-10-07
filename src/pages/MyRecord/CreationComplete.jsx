import styled from 'styled-components';
import frameSVG from '../../assets/Frame_26085556.svg'; 

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
  background-color: #27405E;
`;

const SubTitle = styled.p`
  font-size: 24px;
  color: #fff;
  position: absolute; 
  bottom: 550px;
  transform: translateX(-50%);
  left: 50%; 
  white-space: nowrap; 
  line-height: 1.5;
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
  return (
    <Container>
      <SubTitle>
        님과의<br />
        추억이 전달되었어요
      </SubTitle>
     
      <SVGImage src={frameSVG} alt="Frame SVG" />
    </Container>
  );
};

export default CreationComplete;
