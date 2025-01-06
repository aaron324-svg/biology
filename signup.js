// Import Firebase Authentication
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";

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

// Handle Signup Function
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
        // Create user with Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Update the user's display name
        await updateProfile(user, {
            displayName: username,
        });

        console.log('User signed up:', user);
        alert('Sign-up successful! Redirecting to homepage...');
        window.location.href = 'index.html'; // Redirect to homepage
    } catch (error) {
        console.error('Error during sign-up:', error);
        alert(error.message); // Display Firebase error message
    }
}

// Redirect to Login Function
function redirectToLogin() {
    window.location.href = 'login.html';
}

// Attach Event Listener
document.getElementById('signup-form').addEventListener('submit', handleSignup);
document.getElementById('login-link').addEventListener('click', redirectToLogin);
