document.querySelector('.save-bio').addEventListener('click', () => {
    const bio = document.getElementById('profile-bio').value;
    alert('Bio saved: ' + bio);
    // Send the updated bio to the back-end for saving
});

document.querySelector('.logout-button').addEventListener('click', () => {
    alert('You have been logged out.');
    window.location.href = 'login.html'; // Redirect to login page
});
