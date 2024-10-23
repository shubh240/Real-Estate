importScripts("https://www.gstatic.com/firebasejs/9.0.2/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.0.2/firebase-messaging-compat.js");

const firebaseConfig = {
    apiKey: "AIzaSyAUEzoXl4xys51aweLExJ5MvKNj3vQ7F2E",
    authDomain: "bboyo-real-estate.firebaseapp.com",
    projectId: "bboyo-real-estate",
    storageBucket: "bboyo-real-estate.appspot.com",
    messagingSenderId: "774502937147",
    appId: "1:774502937147:web:2f8e2e4dcfb03ba19d621e",
    measurementId: "G-G3YWKCX1QK"
  };
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {

  const notificationTitle = payload.data.title;
  const notificationOptions = {
    body: payload.data.message,
    icon: './assets/imges/card-2.png',
    tag: payload.data.notification_tag,
    data: {
      url: 'https://www.bboyo.com/'
    }
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener('notificationclick', function (event) {
  const notification = event.notification;
  const urlToOpen = notification.data.url || 'https://www.bboyo.com/';

  event.waitUntil(
    clients.openWindow(urlToOpen).then(function () {
      notification.close(); 
    })
  );
});
