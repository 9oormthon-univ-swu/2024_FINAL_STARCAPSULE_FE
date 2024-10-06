import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Redirection = () => {
  const navigate = useNavigate();
  
  // URL에서 토큰을 가져오는 함수
  const getTokenFromURL = () => {
    return new URL(window.location.href).searchParams.get('token'); // ?token=이상한코드
  };

  useEffect(() => {
    const token = getTokenFromURL(); // URL에서 토큰 가져오기
    
    if (token) {
    
      const userInfoURL = 'http://your-api-endpoint.com/userinfo'; 
     
      // 토큰을 사용하여 API 요청
      axios.get(userInfoURL, {
        headers: {
          'Authorization': `Bearer ${token}`, // Authorization 헤더에 토큰 추가
        },
      })
      .then((response) => {
        console.log(response.data); // 응답 데이터 확인

        // 첫 번째 가입자 체크
        if (response.data.isFirstTimeUser) {
          navigate('/snowballmake'); 
        } else {
          navigate('/snowball'); 
        }
      })
      .catch((error) => {
        console.error('Error fetching user info:', error); 
      });
    }
  }, [navigate]);
  
  return <div>로그인 중입니다.</div>; 
};

export default Redirection;
