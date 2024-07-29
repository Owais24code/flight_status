importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js",
);

const firebaseConfig = {
  apiKey: "AIzaSyCcjtdl2aszQnIX8H6sMYrECIOVuhilK1k",
  authDomain: "test-34ced.firebaseapp.com",
  projectId: "test-34ced",
  storageBucket: "test-34ced.appspot.com",
  messagingSenderId: "329485395162",
  appId: "1:329485395162:web:0dcebba51b0650b1bd71e3",
  measurementId: "G-5X84WV413Z",
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload,
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
