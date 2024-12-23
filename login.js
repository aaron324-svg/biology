async function handleLogin(event) {
    event.preventDefault();

    const username = document.getElementById('login-username').value.trim();
    const password = document.getElementById('login-password').value;

    if (!username || !password) {
        alert("Please enter both username and password.");
        return;
    }

    try {
        // Simulated successful login for demo purposes
        const isValidUser = true; // Replace with actual validation logic

        if (isValidUser) {
            alert('Login successful!');
            window.location.href = 'index.html'; // Redirect to homepage
        } else {
            alert('Invalid username or password.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again later.');
    }
}

function redirectToSignup() {
    window.location.href = 'signup.html';
}
