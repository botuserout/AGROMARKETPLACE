// signup.js
document.addEventListener('DOMContentLoaded', function() {
    let selectedUserType = '';
    const userTypeButtons = document.querySelectorAll('.user-type-btn');
    const sellerFields = document.getElementById('sellerFields');
    const buyerFields = document.getElementById('buyerFields');
    const signupForm = document.getElementById('signupForm');

    // User Type Selection
    userTypeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const userType = this.getAttribute('data-type');
            selectedUserType = userType;
            
            // Update button styles
            userTypeButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Show/hide relevant fields
            if (userType === 'seller') {
                sellerFields.style.display = 'block';
                buyerFields.style.display = 'none';
                
                // Make seller fields required
                document.querySelectorAll('#sellerFields input, #sellerFields textarea')
                    .forEach(input => input.required = true);
                document.querySelectorAll('#buyerFields input, #buyerFields textarea, #buyerFields select')
                    .forEach(input => input.required = false);
            } else {
                sellerFields.style.display = 'none';
                buyerFields.style.display = 'block';
                
                // Make buyer fields required
                document.querySelectorAll('#buyerFields input, #buyerFields textarea, #buyerFields select')
                    .forEach(input => input.required = true);
                document.querySelectorAll('#sellerFields input, #sellerFields textarea')
                    .forEach(input => input.required = false);
            }
        });
    });

    // Form Submission
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();

        if (!selectedUserType) {
            alert('Please select an account type (Seller or Buyer)');
            return;
        }

        // Validate mobile number
        const mobile = document.getElementById('mobile').value;
        if (!isValidMobile(mobile)) {
            alert('Please enter a valid 10-digit mobile number');
            return;
        }

        // Collect form data
        const formData = {
            userType: selectedUserType,
            fullName: document.getElementById('fullName').value,
            email: document.getElementById('signupEmail').value,
            mobile: mobile,
            password: document.getElementById('signupPassword').value,
            address: document.getElementById('address').value
        };

        // Add type-specific fields
        if (selectedUserType === 'seller') {
            Object.assign(formData, {
                farmName: document.getElementById('farmName').value,
                farmSize: document.getElementById('farmSize').value,
                productsGrown: document.getElementById('productsGrown').value,
                certifications: document.getElementById('certifications').value
            });
        } else {
            Object.assign(formData, {
                companyName: document.getElementById('companyName').value,
                businessType: document.getElementById('businessType').value,
                purchaseVolume: document.getElementById('purchaseVolume').value,
                preferredProducts: document.getElementById('preferredProducts').value
            });
        }

        // Here you would typically make an API call to your backend
        console.log('Signup attempt:', formData);
        
        // For demo purposes, show success message and redirect
        alert('Account created successfully!');
        window.location.href = 'login.html';
    });

    // Helper Functions
    function isValidMobile(mobile) {
        return /^[0-9]{10}$/.test(mobile);
    }
});