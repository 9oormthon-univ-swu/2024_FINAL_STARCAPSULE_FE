import './App.css';
import { ThemeProvider } from '@mui/material';
import theme from './constants/theme';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/Onboarding/LoginPage';
import PopupAfter from './pages/Onboarding/PopupAfter';
import SnowballMake from './pages/Onboarding/SnowballMake';
import RecordForm from './pages/Record/RecordForm';
import CreationComplete from './pages/RecordComplete/CreationComplete';
import MyCreationComplete from './pages/RecordComplete/MyCreationComplete';
import Main from './pages/main/Main';
import GuestForm from './pages/Record/GuestForm';
import Guest from './pages/guest/Guest';
import CalendarPage from './pages/main/CalendarPage';
import RecordFormAfter from './pages/RecordComplete/RecordFormAfter';
import GuestFormAfter from './pages/RecordComplete/GuestFormAfter';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { Helmet, HelmetProvider } from 'react-helmet-async';

function App() {
    dayjs.locale('ko');
    dayjs.extend(utc);
    dayjs.extend(timezone);
    dayjs.tz.setDefault('Asia/Seoul');
    return (
        <HelmetProvider>
            <ThemeProvider theme={theme}>
                <Router>
                    <Routes>
                        <Route path='/' element={<LoginPage />} />
                        <Route path='/popupafter' element={<PopupAfter />} />
                        <Route
                            path='/snowballmake'
                            element={<SnowballMake />}
                        />
                        <Route path='/main/:userId' element={<Main />} />
                        <Route path='/guest/:userId' element={<Guest />} />
                        <Route
                            path='/record/:userId'
                            element={<RecordForm />}
                        />
                        <Route
                            path='/recordafter/:userId'
                            element={<RecordFormAfter />}
                        />
                        <Route
                            path='/guestafter/:userId'
                            element={<GuestFormAfter />}
                        />
                        <Route
                            path='/guestrecord/:userId'
                            element={<GuestForm />}
                        />
                        <Route path='/calendar' element={<CalendarPage />} />
                        <Route
                            path='/complete/:userId'
                            element={<CreationComplete />}
                        />
                        <Route
                            path='/mycomplete/:userId'
                            element={<MyCreationComplete />}
                        />
                        <Route path='*' element={<div>Not Found</div>} />
                    </Routes>
                </Router>
            </ThemeProvider>
        </HelmetProvider>
    );
}

export default App;
