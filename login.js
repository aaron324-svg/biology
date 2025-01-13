// Import Firebase Authentication
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "your-api-key",
    authDomain: "your-auth-domain",
    projectId: "your-project-id",
    storageBucket: "your-storage-bucket",
    messagingSenderId: "your-messaging-sender-id",
    appId: "your-app-id",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Handle Login Function
async function handleLogin(event) {
    event.preventDefault();

    const email = document.getElementById('login-username').value.trim(); // Firebase uses email, not username
    const password = document.getElementById('login-password').value;

    if (!email || !password) {
        alert("Please enter both email and password.");
        return;
    }

    try {
        // Sign in with Firebase Authentication
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Save user token locally for session management
        const idToken = await user.getIdToken();
        localStorage.setItem("authToken", idToken);

        // Notify backend of successful login (optional, for activity tracking)
        await fetch("http://localhost:5000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${idToken}`, // Send token for verification
            },
            body: JSON.stringify({ email }),
        });

        // Successful login
        console.log('User logged in:', user);
        alert('Login successful!');
        window.location.href = 'index.html'; // Redirect to homepage
    } catch (error) {
        console.error('Error during login:', error);
        alert(error.message); // Display Firebase error message
    }
}

// Redirect to Signup Function
function redirectToSignup() {
    window.location.href = 'signup.html';
}

// Attach Event Listener
document.getElementById('login-form').addEventListener('submit', handleLogin);
document.getElementById('signup-link').addEventListener('click', redirectToSignup);

// Additional Functionality for Notification Clearing
localStorage.setItem("notificationsDismissed", "true"); // Example for clearing notifications
