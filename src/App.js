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
import GuestForm from './pages/Record/GuestForm';
import Guest from './pages/guest/Guest';
import CalendarPage from './pages/main/CalendarPage';
import Test from './pages/Record/Test';

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Router>
                <Routes>
                    <Route path='/' element={<LoginPage />} />
                    <Route path='/popup' element={<PopupPage />} />
                    <Route path='/snowballmake' element={<SnowballMake />} />
                    <Route path='/main/:userId' element={<Main />} />
                    <Route path='/guest/:userId' element={<Guest />} />
                    <Route path='/record' element={<RecordForm />} />
                    <Route path='/guestrecord' element={<GuestForm />} />
                    <Route path='/calendar' element={<CalendarPage />} />
                    <Route path='/complete' element={<CreationComplete />} />
                    <Route path='/test' element={<Test />} />
                    <Route path='*' element={<div>Not Found</div>} />t{' '}
                </Routes>
            </Router>
        </ThemeProvider>
    );
}

export default App;
