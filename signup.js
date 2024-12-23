async function handleSignup(event) {
    event.preventDefault();

    const username = document.getElementById('signup-username').value.trim();
    const email = document.getElementById('signup-email').value.trim();
    const password = document.getElementById('signup-password').value;

    if (!username || !email || !password) {
        alert("Please fill in all fields.");
        return;
    }

    try {
        // Simulated successful sign-up for demo purposes
        const isSignupSuccessful = true; // Replace with actual sign-up logic

        if (isSignupSuccessful) {
            alert('Sign-up successful! Redirecting to homepage...');
            window.location.href = 'index.html'; // Redirect to homepage
        } else {
            alert('Sign-up failed. Please try again.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again later.');
    }
}

function redirectToLogin() {
    window.location.href = 'login.html';
}
