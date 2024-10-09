import './App.css';
import { ThemeProvider } from '@mui/material';
import theme from './constants/theme';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/Onboarding/LoginPage';
import PopupPage from './pages/Onboarding/PopupPage';
import SnowballMake from './pages/Onboarding/SnowballMake';
import RecordForm from './pages/Record/RecordForm';
import CreationComplete from './pages/MyRecord/CreationComplete';
import Main from './pages/main/Main';
import Guest from './pages/guest/Guest';
import Calendar from './pages/main/Calendar';

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Router>
                <Routes>
                    <Route path='/' element={<LoginPage />} />
                    <Route path='/popup' element={<PopupPage />} />
                    <Route path='/snowballmake' element={<SnowballMake />} />
                    <Route path='/main/:userId' element={<Main />} />
                    <Route path='/guest' element={<Guest />} />
                    <Route path='/record' element={<RecordForm />} />
                    <Route path="/calendar" element={<Calendar />} />
                    <Route path='/complete' element={<CreationComplete />} />
                </Routes>
            </Router>
        </ThemeProvider>
    );
}

export default App;
