function validateForm(event) {
    event.preventDefault(); // Prevent the form from submitting

    var name = document.getElementById('name').value.trim();
    var email = document.getElementById('email').value.trim();
    var number = document.getElementById('number').value.trim();
    var password = document.getElementById('password').value.trim();
    var confirmPassword = document.getElementById('confirmPassword').value.trim();
    var errorMessage = '';

    // Check if fields are empty
    if (!name || !email || !number || !password || !confirmPassword) {
        errorMessage += 'All fields are required.\n';
    }

    // Check email format
    var emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/;
    if (!emailPattern.test(email)) {
        errorMessage += 'Email address must contain @ sign and a ., there should be few letters before the @ sign, there should be three letters between @ sign and a . There must be 3 or 2 letters after the .\n';
    }

    // Check phone number
    if (!/^\d{10}$/.test(number)) {
        errorMessage += 'Phone number must be 10 digits.\n';
    }

    // Check password
    if (password.length < 7 || !/[A-Z]/.test(password) || !/\d/.test(password) || !/[&$#@]/.test(password)) {
        errorMessage += 'Password must be at least 7 characters long and contain at least one capital letter, one digit, and one special character (&,$,#,@).\n';
    }

    // Check if passwords match
    if (password !== confirmPassword) {
        errorMessage += 'Passwords do not match.\n';
    }

    if (errorMessage) {
        alert(errorMessage);
        return false;
    }

    // If validation passes, confirm the form data
    var isConfirmed = confirm(`Name: ${name}\nEmail: ${email}\nPhone Number: ${number}\nPassword: ${password}\nConfirm Password: ${confirmPassword}\n\nIs this information correct?\nPressing ok will clear the form after submitting. `);

    if (isConfirmed) {
        // Optionally, reset the form
        document.querySelector('form').reset();
    }

    return false; // Prevent the form from submitting
}