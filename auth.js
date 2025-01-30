// auth.js
document.addEventListener('DOMContentLoaded', function() {
    // Login Form Handler
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            // For demo purposes, store user info in localStorage
            // In a real application, this would come from backend
            const mockUserData = {
                fullName: "John Doe",
                email: email,
                occupation: "BTech Student",
                isLoggedIn: true
            };
            
            localStorage.setItem('userData', JSON.stringify(mockUserData));
            
            // Show success message and redirect
            alert('Login successful!');
            window.location.href = 'index.html';
        });
    }

    // Signup Form Handler
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = {
                fullName: document.getElementById('fullName').value,
                email: document.getElementById('signupEmail').value,
                mobile: document.getElementById('mobile').value,
                password: document.getElementById('signupPassword').value,
                address: document.getElementById('address').value,
                occupation: document.getElementById('occupation').value, // New field
                isLoggedIn: true
            };
            
            // Validate mobile number
            if (!isValidMobile(formData.mobile)) {
                alert('Please enter a valid 10-digit mobile number');
                return;
            }
            
            // Store user data in localStorage
            localStorage.setItem('userData', JSON.stringify(formData));
            
            // Show success message
            alert('Account created successfully!');
            window.location.href = 'index.html';
        });
    }

    // Helper Functions
    function isValidMobile(mobile) {
        return /^[0-9]{10}$/.test(mobile);
    }

    // Check login status on every page
    function checkLoginStatus() {
        const userData = JSON.parse(localStorage.getItem('userData') || '{}');
        const authButtons = document.querySelector('.auth-buttons');
        const userInfo = document.querySelector('.user-info');
        
        if (userData.isLoggedIn && authButtons) {
            if (userInfo) {
                userInfo.innerHTML = `
                    <span class="user-name">${userData.fullName}</span>
                    <span class="user-occupation">${userData.occupation}</span>
                    <button onclick="logout()" class="logout-btn">Logout</button>
                `;
            }
            if (authButtons) {
                authButtons.style.display = 'none';
            }
        }
    }
    
// Forgot Password Handler
const forgotPasswordLink = document.querySelector('.forgot-password');
if (forgotPasswordLink) {
    forgotPasswordLink.addEventListener('click', function(e) {
        e.preventDefault();
        showForgotPasswordModal();
    });
}

// Helper Functions
function isValidMobile(mobile) {
    return /^[0-9]{10}$/.test(mobile);
}

function showForgotPasswordModal() {
    // Create modal HTML
    const modal = document.createElement('div');
    modal.className = 'forgot-modal';
    modal.innerHTML = `
        <div class="forgot-modal-content">
            <h3>Reset Password</h3>
            <p>Enter your email address to receive a password reset link.</p>
            <form id="forgotPasswordForm">
                <div class="form-group">
                    <input type="email" placeholder="Enter your email" required>
                </div>
                <button type="submit" class="auth-button">Send Reset Link</button>
            </form>
            <button onclick="this.closest('.forgot-modal').remove()" 
                    style="position: absolute; top: 10px; right: 10px; 
                           background: none; border: none; cursor: pointer;">✕</button>
        </div>
    `;

    // Add modal to page
    document.body.appendChild(modal);
    
    // Handle form submission
    const form = modal.querySelector('form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        
        // Here you would typically make an API call to your backend
        console.log('Password reset requested for:', email);
        
        // For demo purposes, show success message
        alert('Password reset link sent to your email!');
        modal.remove();
    });

    // Show modal with animation
    setTimeout(() => modal.classList.add('active'), 10);
}
    // Logout function
    window.logout = function() {
        localStorage.removeItem('userData');
        window.location.href = 'login.html';
    }

    // Check login status when page loads
    checkLoginStatus();
});