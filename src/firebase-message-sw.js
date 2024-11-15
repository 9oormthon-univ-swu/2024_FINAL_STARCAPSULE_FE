import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

// Firebase 설정
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
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export async function handleAllowNotification() {
  const permission = await Notification.requestPermission();
  if (permission === 'granted') {
    console.log('알림 권한이 허용되었습니다.');
    await getDeviceToken();
  } else {
    console.log('알림 권한이 거부되었습니다.');
  }
}

async function getDeviceToken() {
  await getToken(messaging, {
    vapidKey: "BNBLWswHiYVgBr4Y9xwgAbUgx8xIb6nj66gCGn0SYkq8zZ0kneMi9Uudb7o9CJ2ADXnRn1IBtArREBi4ffSmgSU"
  })
  .then((currentToken) => {
    if (currentToken) {
      // 토큰을 서버로 전송하거나 UI 업데이트
      console.log("토큰: ", currentToken);
      // 토큰을 로컬 스토리지에 저장
      localStorage.setItem("notificationToken", currentToken);
    } else {
      console.log("토큰을 가져오지 못했습니다.");
    }
  })
  .catch((err) => {
    console.error("토큰을 가져오는 중 에러 발생: ", err);
  });
}
