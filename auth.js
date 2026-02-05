// Authentication JavaScript for Login and Registration

// Toggle Password Visibility
function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const eyeIcon = input.parentElement.querySelector('.eye-icon');
    
    if (input.type === 'password') {
        input.type = 'text';
        eyeIcon.textContent = '🙈';
    } else {
        input.type = 'password';
        eyeIcon.textContent = '👁️';
    }
}

// Password Strength Checker
const passwordInput = document.getElementById('password');
if (passwordInput) {
    passwordInput.addEventListener('input', function() {
        const password = this.value;
        const strengthFill = document.getElementById('strengthFill');
        const strengthText = document.getElementById('strengthText');
        
        if (password.length === 0) {
            strengthFill.style.width = '0';
            strengthFill.className = 'strength-fill';
            strengthText.textContent = 'Enter password';
            return;
        }
        
        let strength = 0;
        
        // Length check
        if (password.length >= 8) strength++;
        if (password.length >= 12) strength++;
        
        // Complexity checks
        if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^a-zA-Z0-9]/.test(password)) strength++;
        
        if (strength <= 2) {
            strengthFill.className = 'strength-fill weak';
            strengthText.textContent = 'Weak password';
        } else if (strength <= 4) {
            strengthFill.className = 'strength-fill medium';
            strengthText.textContent = 'Medium password';
        } else {
            strengthFill.className = 'strength-fill strong';
            strengthText.textContent = 'Strong password';
        }
    });
}

// Form Validation Functions
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[0-9]{10}$/;
    return re.test(phone);
}

function validatePassword(password) {
    return password.length >= 8;
}

function showError(input, message) {
    const formGroup = input.closest('.form-group');
    const errorMessage = formGroup.querySelector('.error-message');
    
    input.classList.add('error');
    errorMessage.textContent = message;
}

function clearError(input) {
    const formGroup = input.closest('.form-group');
    const errorMessage = formGroup.querySelector('.error-message');
    
    input.classList.remove('error');
    errorMessage.textContent = '';
}

// Registration Form Handler
const registerForm = document.getElementById('registerForm');
if (registerForm) {
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        
        // Get form values
        const firstName = document.getElementById('firstName');
        const lastName = document.getElementById('lastName');
        const email = document.getElementById('email');
        const phone = document.getElementById('phone');
        const password = document.getElementById('password');
        const confirmPassword = document.getElementById('confirmPassword');
        const terms = document.getElementById('terms');
        
        // Clear previous errors
        [firstName, lastName, email, phone, password, confirmPassword].forEach(clearError);
        
        // Validate First Name
        if (firstName.value.trim() === '') {
            showError(firstName, 'First name is required');
            isValid = false;
        } else if (firstName.value.trim().length < 2) {
            showError(firstName, 'First name must be at least 2 characters');
            isValid = false;
        }
        
        // Validate Last Name
        if (lastName.value.trim() === '') {
            showError(lastName, 'Last name is required');
            isValid = false;
        } else if (lastName.value.trim().length < 2) {
            showError(lastName, 'Last name must be at least 2 characters');
            isValid = false;
        }
        
        // Validate Email
        if (email.value.trim() === '') {
            showError(email, 'Email is required');
            isValid = false;
        } else if (!validateEmail(email.value.trim())) {
            showError(email, 'Please enter a valid email address');
            isValid = false;
        }
        
        // Validate Phone
        if (phone.value.trim() === '') {
            showError(phone, 'Phone number is required');
            isValid = false;
        } else if (!validatePhone(phone.value.trim())) {
            showError(phone, 'Please enter a valid 10-digit phone number');
            isValid = false;
        }
        
        // Validate Password
        if (password.value === '') {
            showError(password, 'Password is required');
            isValid = false;
        } else if (!validatePassword(password.value)) {
            showError(password, 'Password must be at least 8 characters long');
            isValid = false;
        }
        
        // Validate Confirm Password
        if (confirmPassword.value === '') {
            showError(confirmPassword, 'Please confirm your password');
            isValid = false;
        } else if (password.value !== confirmPassword.value) {
            showError(confirmPassword, 'Passwords do not match');
            isValid = false;
        }
        
        // Validate Terms
        if (!terms.checked) {
            const termsGroup = terms.closest('.form-group');
            const errorMessage = termsGroup.querySelector('.error-message');
            errorMessage.textContent = 'You must accept the terms and conditions';
            isValid = false;
        }
        
        if (isValid) {
            // Create user object
            const user = {
                firstName: firstName.value.trim(),
                lastName: lastName.value.trim(),
                email: email.value.trim(),
                phone: phone.value.trim(),
                password: password.value,
                registeredAt: new Date().toISOString()
            };
            
            // Store in localStorage (in production, send to server)
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('isLoggedIn', 'true');
            
            // Show success message
            alert('Registration successful! Redirecting to login...');
            
            // Redirect to login page
            window.location.href = 'login.html';
        }
    });
}

// Login Form Handler
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        
        // Get form values
        const email = document.getElementById('loginEmail');
        const password = document.getElementById('loginPassword');
        const rememberMe = document.getElementById('rememberMe');
        
        // Clear previous errors
        [email, password].forEach(clearError);
        
        // Validate Email
        if (email.value.trim() === '') {
            showError(email, 'Email is required');
            isValid = false;
        } else if (!validateEmail(email.value.trim())) {
            showError(email, 'Please enter a valid email address');
            isValid = false;
        }
        
        // Validate Password
        if (password.value === '') {
            showError(password, 'Password is required');
            isValid = false;
        }
        
        if (isValid) {
            // Get stored user (in production, verify with server)
            const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
            
            // Simple validation (in production, use proper authentication)
            if (storedUser.email === email.value.trim() && storedUser.password === password.value) {
                // Set logged in status
                localStorage.setItem('isLoggedIn', 'true');
                
                if (rememberMe.checked) {
                    localStorage.setItem('rememberMe', 'true');
                }
                
                // Show success message
                alert('Login successful!');
                
                // Redirect to booking page
                window.location.href = 'booking.html';
            } else {
                showError(password, 'Invalid email or password');
            }
        }
    });
}

// Real-time input validation
document.querySelectorAll('input').forEach(input => {
    input.addEventListener('blur', function() {
        if (this.hasAttribute('required') && this.value.trim() === '') {
            showError(this, `${this.previousElementSibling.textContent.replace(' *', '')} is required`);
        } else {
            clearError(this);
        }
    });
    
    input.addEventListener('input', function() {
        if (this.classList.contains('error') && this.value.trim() !== '') {
            clearError(this);
        }
    });
});

// Social Authentication (Demo - would need actual OAuth integration)
document.querySelectorAll('.social-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const provider = this.querySelector('span').textContent;
        alert(`${provider} authentication would be integrated here in production.`);
    });
});
