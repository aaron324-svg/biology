// Import dependencies
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

// Firebase imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import {
    getAuth,
    signInWithCredential,
    GoogleAuthProvider,
    OAuthProvider,
} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

// Middleware
app.use(cors());
app.use(express.json()); // For parsing JSON data

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/ib_users", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// User Schema
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    provider: { type: String, default: "local" }, // 'google', 'apple', or 'local'
});

const User = mongoose.model("User", userSchema);

// **Routes**

// Sign Up (Local)
app.post("/signup", async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        await newUser.save();
        res.status(201).json({ message: "User registered successfully!" });
    } catch (error) {
        res.status(400).json({ message: "Error registering user!", error });
    }
});

// Log In (Local)
app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found!" });

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid)
            return res.status(401).json({ message: "Invalid password!" });

        // Generate JWT (session token)
        const token = jwt.sign({ userId: user._id }, "YOUR_SECRET_KEY", {
            expiresIn: "1h",
        });

        res.status(200).json({ message: "Login successful!", token });
    } catch (error) {
        res.status(500).json({ message: "Error logging in!", error });
    }
});

// Google/Apple OAuth (Firebase)
app.post("/oauth", async (req, res) => {
    const { token, provider } = req.body;

    try {
        let userCredential;

        if (provider === "google") {
            const googleProvider = new GoogleAuthProvider();
            userCredential = await signInWithCredential(auth, googleProvider.credential(token));
        } else if (provider === "apple") {
            const appleProvider = new OAuthProvider("apple.com");
            userCredential = await signInWithCredential(auth, appleProvider.credential(token));
        }

        const firebaseUser = userCredential.user;
        const email = firebaseUser.email;
        let user = await User.findOne({ email });

        if (!user) {
            user = new User({
                email,
                provider,
                username: email.split("@")[0],
            });
            await user.save();
        }

        const jwtToken = jwt.sign({ userId: user._id }, "YOUR_SECRET_KEY", {
            expiresIn: "1h",
        });

        res.status(200).json({ message: "OAuth successful!", token: jwtToken });
    } catch (error) {
        res.status(500).json({ message: "Error with OAuth login!", error });
    }
});

// Token Middleware
app.use((req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Unauthorized!" });

    try {
        const decoded = jwt.verify(token, "YOUR_SECRET_KEY");
        req.userId = decoded.userId;
        next();
    } catch (error) {
        res.status(403).json({ message: "Invalid token!" });
    }
});

// Admin Dashboard Route (Example)
app.get("/admin/dashboard", async (req, res) => {
    const users = await User.find();
    res.status(200).json({ users });
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
