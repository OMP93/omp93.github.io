// firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/3.6.8/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.6.8/firebase-messaging.js');

firebase.initializeApp({
    messagingSenderId: '530470765559'
});

firebase.messaging();

self.addEventListener('push', function (event) {
    const options = JSON.parse(event.data.text());
    console.log(options);
    // options.data = options;
    event.waitUntil(
        self.registration.showNotification(options.notification.title, options.notification)
    );
    // // Track open
    // fetch('https://api.mailfire.io/v1/webpush/show/' + options.id, {
    //     method: "post"
    // });
});

self.addEventListener('notificationclick', function (event) {
    event.notification.close();
    console.log(event);
    // // Show page
    // event.waitUntil(
    //     clients.matchAll({
    //         type: "window"
    //     }).then(function () {
    //         return clients.openWindow(event.notification.data.url);
    //     })
    // );
    // // Track click
    // fetch('https://api.mailfire.io/v1/webpush/click/' + event.notification.data.id, {
    //     method: "post"
    // });
});