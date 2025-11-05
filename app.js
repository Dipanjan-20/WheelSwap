// Toggle the sliding drawer
function toggleDrawer() {
  const drawer = document.getElementById("drawer");
  if (drawer.style.right === "0px") {
    drawer.style.right = "-100%";
  } else {
    drawer.style.right = "0px";
  }
}

// Example: Dynamically set user details from localStorage (if available)
window.onload = () => {
  const userName = localStorage.getItem("userName"); // Get name from localStorage
  const userEmail = localStorage.getItem("userEmail"); // Get email from localStorage
  const profilePicUrl = localStorage.getItem("profilePicUrl") || ""; // Get profile pic URL from localStorage or use default

  // Check if user is logged in (i.e., userName exists)
  if (userName && userEmail) {
    document.getElementById("user-name").textContent = userName;
    document.getElementById("user-email").textContent = userEmail;
    const profilePic = document.getElementById("profile-pic");
    profilePic.src = profilePicUrl || "default-dp.png"; // Use default image if no profile pic URL
    toggleProfile(true); // Show profile section and hide login button
  } else {
    toggleProfile(false); // Show login button and hide profile section
  }
};

// Handle login/logout button toggle
function toggleProfile(isLoggedIn) {
  const profileSection = document.getElementById("profile-section");
  const loginButton = document.getElementById("login-btn");

  if (isLoggedIn) {
    profileSection.classList.remove("hidden"); // Show profile
    loginButton.textContent = "Logout"; // Change button text to "Logout"
    loginButton.onclick = handleLogout; // Set logout behavior
  } else {
    profileSection.classList.add("hidden"); // Hide profile
    loginButton.textContent = "Login"; // Change button text to "Login"
    loginButton.onclick = handleLogin; // Set login behavior
  }
}

// Handle login action
function handleLogin() {
  // Logic to handle user login
  alert('Login functionality goes here!');

  // Example of setting user data in localStorage after successful login
  localStorage.setItem("userName", "Dipanjan Saha");
  localStorage.setItem("userEmail", "dipanjan.saha@example.com");
  localStorage.setItem("profilePicUrl", "path/to/profile-pic.jpg");

  // Simulate profile display after login
  window.location.reload(); // Reload page to show profile section
}

// Handle logout action
function handleLogout() {
  // Logic to handle user logout
  localStorage.removeItem("userName");
  localStorage.removeItem("userEmail");
  localStorage.removeItem("profilePicUrl");

  // Simulate logout by reloading the page
  window.location.reload(); // Reload page to hide profile and show login button
}

// Example signup form submission (replace with your actual form)
document.getElementById('signup-form').addEventListener('submit', async function (event) {
  event.preventDefault(); // Prevent default behavior

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const response = await fetch('http://localhost:3000/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      // Store user data in localStorage after successful signup
      localStorage.setItem("userName", data.name);
      localStorage.setItem("userEmail", data.email);
      localStorage.setItem("profilePicUrl", data.profilePicUrl || ""); // Replace with actual data if available

      // Redirect to home page or refresh to update UI
      window.location.href = 'index.html'; // Redirect to home page
    } else {
      const errorData = await response.json();
      alert(errorData.error || 'Error signing up. Try again.');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred. Please try again later.');
  }
});
