// firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/3.6.8/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.6.8/firebase-messaging.js');

firebase.initializeApp({
    messagingSenderId: '530470765559'
});

firebase.messaging();

self.addEventListener('push', function (event) {

    const data = JSON.parse(event.data.text());

    data.notification.data = data.data;
    data.notification.data.url = data.notification.click_action;

    event.waitUntil(
        self.registration.showNotification(data.notification.title, data.notification)
    );
    // Track open
    fetch('https://api.mailfire.io/v1/webpush/show/' + data.data.id, {
        method: "post"
    });
});

self.addEventListener('notificationclick', function (event) {

     event.notification.close();

    // Show page
    event.waitUntil(
        clients.matchAll({
            type: "window"
        }).then(function () {
            return clients.openWindow(event.notification.data.url);
        })
    );
    // Track click
    fetch('https://api.mailfire.io/v1/webpush/click/' + event.notification.data.id, {
        method: "post"
    });
});