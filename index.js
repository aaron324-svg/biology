// Fetch Notifications
function fetchNotifications() {
    // Mock notifications - Replace with backend API call if needed
    const notifications = [
        { id: 1, message: "New study guide available for Biology HL." },
        { id: 2, message: "Past Papers updated with 2023 exams." },
        { id: 3, message: "Join the YouTube live session on cell biology!" },
    ];

    // Get dismissed notifications from localStorage
    const dismissedNotifications = JSON.parse(localStorage.getItem('dismissedNotifications')) || [];

    // Filter out dismissed notifications
    const activeNotifications = notifications.filter(
        (notification) => !dismissedNotifications.includes(notification.id)
    );

    const notificationsContainer = document.getElementById('notifications');
    notificationsContainer.innerHTML = ""; // Clear existing notifications

    if (activeNotifications.length === 0) {
        notificationsContainer.innerHTML = "<p>No new notifications.</p>";
    } else {
        activeNotifications.forEach((notification) => {
            const notificationItem = document.createElement('div');
            notificationItem.classList.add('notification-item');

            const notificationText = document.createElement('p');
            notificationText.textContent = notification.message;

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Dismiss';
            deleteButton.onclick = () => {
                dismissNotification(notification.id, notificationItem);
            };

            notificationItem.appendChild(notificationText);
            notificationItem.appendChild(deleteButton);
            notificationsContainer.appendChild(notificationItem);
        });
    }
}

// Dismiss Notification
function dismissNotification(notificationId, notificationElement) {
    // Add the notification ID to localStorage
    const dismissedNotifications = JSON.parse(localStorage.getItem('dismissedNotifications')) || [];
    if (!dismissedNotifications.includes(notificationId)) {
        dismissedNotifications.push(notificationId);
        localStorage.setItem('dismissedNotifications', JSON.stringify(dismissedNotifications));
    }

    // Remove the notification from the DOM
    notificationElement.remove();

    // Show "No new notifications" if all notifications are dismissed
    const remainingNotifications = document.querySelectorAll('.notification-item');
    if (remainingNotifications.length === 0) {
        document.getElementById('notifications').innerHTML = "<p>No new notifications.</p>";
    }
}

// Fetch notifications on page load
fetchNotifications();
