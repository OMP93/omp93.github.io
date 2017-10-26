// firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/3.6.8/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.6.8/firebase-messaging.js');

firebase.initializeApp({
    messagingSenderId: '530470765559'
});

const messaging = firebase.messaging();

messaging.onMessage(function(payload) {
    console.log("Message received. ", payload);
    // ...
});