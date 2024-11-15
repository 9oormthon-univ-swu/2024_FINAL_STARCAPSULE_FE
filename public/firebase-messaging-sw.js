// firebase-messaging-sw.js

importScripts('https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/9.1.3/firebase-messaging.js');

// Firebase 앱 설정
const firebaseConfig = {
  apiKey: "AIzaSyAgPHpjdSQV0pS0y40s56J1-hw7ZksMEdo",
  authDomain: "snowlog-56317.firebaseapp.com",
  projectId: "snowlog-56317",
  storageBucket: "snowlog-56317.firebasestorage.app",
  messagingSenderId: "1006468192835",
  appId: "1:1006468192835:web:d7e195df42051495ef12f6",
  measurementId: "G-ZNNB3Y0NJX"
};

// Firebase 초기화
firebase.initializeApp(firebaseConfig);

// Firebase Messaging 인스턴스 생성
const messaging = firebase.messaging();

// 푸시 알림 수신 처리
messaging.onBackgroundMessage(function(payload) {
  console.log('[서비스 워커] 백그라운드 푸시 알림 수신', payload);
  // 알림을 표시하는 방식은 사용자 정의 가능
  const notificationTitle = '백그라운드 푸시 알림';
  const notificationOptions = {
    body: payload.data.status,
    icon: '/firebase-logo.png',
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
