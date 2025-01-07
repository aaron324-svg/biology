// Fetch Notifications
function fetchNotifications() {
    const notifications = [
        { id: 1, message: "New study guide available for Biology HL." },
        { id: 2, message: "Past Papers updated with 2023 exams." },
        { id: 3, message: "Join the YouTube live session on cell biology!" },
    ];

    const notificationsContainer = document.getElementById('notifications');
    notificationsContainer.innerHTML = ""; // Clear existing notifications

    if (notifications.length === 0) {
        notificationsContainer.innerHTML = "<p>No new notifications.</p>";
    } else {
        notifications.forEach(notification => {
            const notificationItem = document.createElement('div');
            notificationItem.classList.add('notification-item');

            const notificationText = document.createElement('p');
            notificationText.textContent = notification.message;

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Dismiss';
            deleteButton.onclick = () => notificationItem.remove();

            notificationItem.appendChild(notificationText);
            notificationItem.appendChild(deleteButton);
            notificationsContainer.appendChild(notificationItem);
        });
    }
}

// Initialize FullCalendar
document.addEventListener('DOMContentLoaded', function () {
    const calendarEl = document.getElementById('calendar');

    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay',
        },
        editable: true, // Allow adding and modifying events
        selectable: true, // Allow selecting dates for new events
        events: [
            {
                title: 'Biology HL Study Session',
                start: '2025-01-10',
                description: 'Zoom link: https://zoom.us/example',
            },
            {
                title: 'Past Paper Discussion',
                start: '2025-01-15',
                end: '2025-01-16',
                description: 'Join to discuss key concepts from past papers.',
            },
            {
                title: 'Internal Assessment Deadline',
                start: '2025-01-20',
                description: 'Submit your IA via ManageBac.',
            },
        ],
        eventClick: function (info) {
            alert(`Event: ${info.event.title}\nDescription: ${info.event.extendedProps.description}`);
        },
        select: function (info) {
            const title = prompt('Enter event title:');
            if (title) {
                calendar.addEvent({
                    title: title,
                    start: info.startStr,
                    end: info.endStr,
                    allDay: info.allDay,
                });
                alert('Event added!');
            }
            calendar.unselect(); // Clear selection
        },
        eventDrop: function (info) {
            alert(`Event moved to ${info.event.start.toISOString()}`);
            // Update event in the backend if necessary
        },
        eventResize: function (info) {
            alert(`Event duration updated to end at ${info.event.end.toISOString()}`);
            // Update event in the backend if necessary
        },
    });

    calendar.render();
});

// Fetch notifications on page load
fetchNotifications();
