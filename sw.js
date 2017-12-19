self.addEventListener('push', function (event) {
    const options = JSON.parse(event.data.text());
    options.data = options;
    event.waitUntil(
        self.registration.showNotification(options.title, options)
    );
    // Track open
    fetch('https://api.mailfire.io/v1/webpush/show/' + options.id, {
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