document.addEventListener('DOMContentLoaded', function () {
    // Initialize FullCalendar
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        editable: true,
        selectable: true,
        events: [
            {
                title: 'Example Event',
                start: new Date().toISOString().split('T')[0],
                description: 'An example event'
            }
        ]
    });
    calendar.render();
});

// Fetch Notifications (Mock Functionality)
function fetchNotifications() {
    const notifications = [
        'New Study Guide available!',
        'Flashcards updated for Topic 3.',
        'Live session scheduled for next week.'
    ];

    const notificationList = document.getElementById('notifications');
    notificationList.innerHTML = '<ul>' + notifications.map(notif => `<li>${notif}</li>`).join('') + '</ul>';
}
