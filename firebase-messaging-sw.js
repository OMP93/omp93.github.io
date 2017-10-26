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

self.addEventListener('notificationclick', function(event) {
    const target = event.notification.data.click_action || '/';
    event.notification.close();

    // This looks to see if the current is already open and focuses if it is
    event.waitUntil(clients.matchAll({
        type: 'window',
        includeUncontrolled: true
    }).then(function(clientList) {
        // clientList always is empty?!
        for (var i = 0; i < clientList.length; i++) {
            var client = clientList[i];
            if (client.url == target && 'focus' in client) {
                return client.focus();
            }
        }

        return clients.openWindow(target);
    }));
});