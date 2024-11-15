// Import the functions you need from the SDKs you need 
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging, getToken } from "firebase/messaging";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAgPHpjdSQV0pS0y40s56J1-hw7ZksMEdo",
  authDomain: "snowlog-56317.firebaseapp.com",
  projectId: "snowlog-56317",
  storageBucket: "snowlog-56317.firebasestorage.app",
  messagingSenderId: "1006468192835",
  appId: "1:1006468192835:web:d7e195df42051495ef12f6",
  measurementId: "G-ZNNB3Y0NJX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Cloud Messaging
const messaging = getMessaging(app);

async function handleAllowNotification() {
  const permission = await Notification.requestPermission();

  if (permission === 'granted') {
    console.log('알림 권한이 허용되었습니다.');
    await getDeviceToken();  // 권한 허용 후 토큰 가져오기
  } else if (permission === 'denied') {
    console.log('알림 권한이 거부되었습니다.');
  } else {
    console.log('사용자가 알림 권한을 결정하지 않았습니다.');
  }
}

async function getDeviceToken() {
  // VAPID 키를 사용하여 토큰을 요청
  await getToken(messaging, {
    vapidKey: "BNBLWswHiYVgBr4Y9xwgAbUgx8xIb6nj66gCGn0SYkq8zZ0kneMi9Uudb7o9CJ2ADXnRn1IBtArREBi4ffSmgSU"
  })
  .then((currentToken) => {
    if (currentToken) {
      // 토큰을 서버로 전송하거나 UI 업데이트
      //console.log("토큰: ", currentToken);
      //alert("토큰: " + currentToken);
    } else {
      console.log("토큰을 가져오지 못했습니다. 권한을 다시 요청하세요.");
    }
  })
  .catch((err) => {
    console.error("토큰을 가져오는 중 에러 발생: ", err);
    alert(err);
  });
}

handleAllowNotification();
