import './App.css';  
import { ThemeProvider } from '@mui/material';
import theme from './constants/theme';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/Onboarding/LoginPage';
import PopupPage from './pages/Onboarding/PopupPage';
import SnowballMake from './pages/Onboarding/SnowballMake'; 
import Text from './pages/text';        
import TextMessage from './pages/textmessage';
import Redirection from './Redirection'; // Redirection 컴포넌트 import 추가

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Router>
                <Routes>
                    <Route path="/" element={<LoginPage />} />
                    <Route path="/popup" element={<PopupPage />} />
                    <Route path="/snowballmake" element={<SnowballMake />} /> 
                    <Route path="/text" element={<Text />} />               
                    <Route path="/textmessage" element={<TextMessage />} /> 
                    <Route path="/kakao/callback" element={<Redirection />} /> {/* Redirection 추가 */}
                </Routes>
            </Router>
        </ThemeProvider>
    );
}

export default App;

