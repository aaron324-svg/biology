const express = require('express');
const bcrypt = require('bcrypt');

const app = express();
app.use(express.json()); // Middleware to parse JSON requests

// In-memory user database (for demonstration)
const users = [];

// Sign-up route to hash and store user passwords
app.post('/signup', async (req, res) => {
    const { username, password } = req.body;

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ username, password: hashedPassword });

    console.log('User signed up:', { username, hashedPassword });
    res.status(201).send('User signed up successfully!');
});

// Login route to verify passwords
async function handleLogin(event) {
    event.preventDefault();

    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    try {
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
            localStorage.setItem('isLoggedIn', 'true'); // Mark user as logged in
            localStorage.setItem('justLoggedIn', 'true'); // Set justLoggedIn flag
            window.location.href = 'index.html'; // Redirect to homepage
        } else {
            alert('Invalid username or password.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again later.');
    }
}


// Start the server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
