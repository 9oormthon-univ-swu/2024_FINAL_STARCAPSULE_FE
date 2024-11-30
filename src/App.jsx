import './App.css';
import { ThemeProvider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import theme from './constants/theme';
import React, { useEffect } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Routes,
    useLocation,
} from 'react-router-dom';
import LoginPage from './pages/Onboarding/LoginPage';
import PopupAfter from './pages/Onboarding/PopupAfter';
import SnowballMake from './pages/Onboarding/SnowballMake';
import RecordForm from './pages/Record/RecordForm';
import CreationComplete from './pages/RecordComplete/CreationComplete';
import MyCreationComplete from './pages/RecordComplete/MyCreationComplete';
import GuestForm from './pages/Record/GuestForm';
import CalendarPage from './pages/calendar/CalendarPage';
import RecordFormAfter from './pages/RecordComplete/RecordFormAfter';
import GuestFormAfter from './pages/RecordComplete/GuestFormAfter';
import CalendarDetail from './pages/RecordComplete/CalendarDetail'; // 파일을 못찾는다는 에러가 떠서 임시 주석처리했습니다.
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { HelmetProvider } from 'react-helmet-async';
import SnackBarNoti from './components/SnackbarNoti';
import { useSnackbarStore } from './stores/useSnackbarStore';
import { AnimatePresence } from 'framer-motion';
import Error404 from './pages/error/Error404';
import Error500 from './pages/error/Error500';
import ErrorBoundary from './pages/error/ErrorBoundary';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import MainPage from './pages/main/MainPage';
import InAppBrowserBlocker from './pages/error/InAppBrowserBlocker';
import Guest from './pages/main/guest/Guest';

function AnimationRoutes() {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const userAgent =
            navigator.userAgent || navigator.vendor || window.opera;

        // 인앱 브라우저 감지
        const isInAppBrowser = /FBAN|FBAV|Instagram|KAKAOTALK|Line/.test(
            userAgent
        );

        // 크롬 브라우저 감지 (인앱 브라우저와 구분)
        const isChrome = /Chrome/i.test(userAgent) && !isInAppBrowser;

        if (isInAppBrowser && location.pathname !== '/in-app-browser-blocker') {
            // 현재 경로를 쿼리 파라미터로 전달
            const currentPath = location.pathname + location.search;
            navigate(
                `/in-app-browser-blocker?redirect=${encodeURIComponent(currentPath)}`
            );
        }
    }, [navigate, location]);

    return (
        <AnimatePresence>
            <ErrorBoundary>
                <Routes location={location} key={location.pathname}>
                    <Route path='/' element={<LoginPage />} />
                    <Route path='/popupafter' element={<PopupAfter />} />
                    <Route path='/snowballmake' element={<SnowballMake />} />
                    <Route path='/main/:userId' element={<MainPage />} />
                    <Route path='/record/:userId' element={<RecordForm />} />
                    <Route
                        path='/recordafter/:userId/:memoryId'
                        element={<RecordFormAfter />}
                    />
                    <Route
                        path='/guestafter/:userId/:memoryId'
                        element={<GuestFormAfter />}
                    />
                    <Route
                        path='/guestrecord/:userId'
                        element={<GuestForm />}
                    />
                    <Route
                        path='/calendar/:userId'
                        element={<CalendarPage />}
                    />
                    <Route
                        path='/complete/:userId'
                        element={<CreationComplete />}
                    />
                    <Route
                        path='/mycomplete/:userId'
                        element={<MyCreationComplete />}
                    />
                    <Route
                        path='/calendar-detail/:userId'
                        element={<CalendarDetail />}
                    />
                    <Route path='/500' element={<Error500 />} />
                    <Route path='*' element={<Error404 />} />
                    <Route
                        path='/in-app-browser-blocker'
                        element={<InAppBrowserBlocker />}
                    />
                </Routes>
            </ErrorBoundary>
        </AnimatePresence>
    );
}

function App() {
    dayjs.locale('ko');
    dayjs.extend(utc);
    dayjs.extend(timezone);
    dayjs.tz.setDefault('Asia/Seoul');
    dayjs.extend(isSameOrAfter);

    const { open, text, severity, setClose } = useSnackbarStore();

    useEffect(() => {
        const handleAppInstalled = () => {
            localStorage.setItem('pwaInstalled', 'true');
        };

        const handleBeforeInstallPrompt = (event) => {
            window.deferredPrompt = event;
            const doNotShowPWA = localStorage.getItem('doNotShowPWA');
            if (doNotShowPWA === 'true') return;
            localStorage.setItem('pwaInstalled', 'false');
        };

        window.addEventListener('appinstalled', handleAppInstalled);
        window.addEventListener(
            'beforeinstallprompt',
            handleBeforeInstallPrompt
        );

        return () => {
            window.removeEventListener('appinstalled', handleAppInstalled);
            window.removeEventListener(
                'beforeinstallprompt',
                handleBeforeInstallPrompt
            );
        };
    }, []);
    return (
        <HelmetProvider>
            <ThemeProvider theme={theme}>
                <Router>
                    <SnackBarNoti
                        openSnackbar={open}
                        handleCloseSnackbar={setClose}
                        snackbarText={text}
                        severity={severity}
                    />
                    <AnimationRoutes />
                </Router>
            </ThemeProvider>
        </HelmetProvider>
    );
}

export default App;