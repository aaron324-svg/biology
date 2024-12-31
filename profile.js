// JavaScript for Profile Page Interactivity

// Select elements
const editPictureButton = document.querySelector(".edit-picture");
const profilePicture = document.querySelector(".profile-picture img");
const saveBioButton = document.querySelector(".save-bio");
const bioTextarea = document.getElementById("profile-bio");

// Change Profile Picture
editPictureButton.addEventListener("click", () => {
    const newPicture = prompt("Enter the URL of the new profile picture:");
    if (newPicture) {
        profilePicture.src = newPicture;
        alert("Profile picture updated!");
    }
});

// Save Bio
saveBioButton.addEventListener("click", () => {
    const bioText = bioTextarea.value.trim();
    if (bioText) {
        alert("Bio saved: " + bioText);
    } else {
        alert("Please enter a bio before saving.");
    }
});
