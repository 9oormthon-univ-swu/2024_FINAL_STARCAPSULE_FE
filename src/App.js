import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import PopupPage from './pages/PopupPage';
import SnowballPage from './pages/SnowballPage';
import Text from './pages/text';          // 추가한 Text 페이지
import TextMessage from './pages/textmessage'; // 추가한 TextMessage 페이지

const App = () => {
  return (
    <Router>
      <Routes>
        {/* 로그인 페이지가 첫 번째로 뜨도록 설정 */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/popup" element={<PopupPage />} />
        <Route path="/snowball" element={<SnowballPage />} />
        <Route path="/text" element={<Text />} />               {/* Text 페이지 추가 */}
        <Route path="/textmessage" element={<TextMessage />} /> {/* TextMessage 페이지 추가 */}
      </Routes>
    </Router>
  );
};

export default App;

