// Notifications Functionality
function fetchNotifications() {
    // Mock notifications - Replace with your backend API call if needed
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
            const notificationItem = document.createElement('p');
            notificationItem.textContent = notification.message;
            notificationsContainer.appendChild(notificationItem);
        });
    }
}

// FullCalendar Initialization
document.addEventListener('DOMContentLoaded', function () {
    const calendarEl = document.getElementById('calendar');
    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        editable: true,
        selectable: true,
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay',
        },
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
    });
    calendar.render();
});
