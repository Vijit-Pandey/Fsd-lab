$(document).ready(function() {
    $("#userForm").on("submit", function(event) {
        var isValid = true;

        // Clear previous error messages
        $(".error-message").text("");

        // Validate name
        var name = $("#name").val().trim();
        var namePattern = /^[A-Za-z]+$/;
        if (name === "") {
            isValid = false;
            $("#nameError").text("Name is required.");
        } else if (!namePattern.test(name)) {
            isValid = false;
            $("#nameError").text("Name must contain only letters.");
        }

        // Validate username
        var username = $("#username").val().trim();
        var usernamePattern = /^\S+$/; // Regular expression to ensure no spaces
        if (username === "") {
            isValid = false;
            $("#usernameError").text("Username is required.");
        } else if (!usernamePattern.test(username)) {
            isValid = false;
            $("#usernameError").text("Username must not contain spaces.");
        }

        // Validate phone number
        var phone = $("#phone").val().trim();
        var phonePattern = /^(?!0{10})(?!00)[0-9]{10}$/;
        if (phone === "") {
            isValid = false;
            $("#phoneError").text("Phone number is required.");
        } else if (!phonePattern.test(phone)) {
            isValid = false;
            $("#phoneError").text("Phone number must be 10 digits and cannot be all zeros or start with two zeros.");
        }

        // Validate zipcode
        var zipcode = $("#zipcode").val().trim();
        if (zipcode === "") {
            isValid = false;
            $("#zipcodeError").text("Zipcode is required.");
        }

        // Validate password
        var password = $("#password").val().trim();
        var passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[&$#@]).{7,}$/;
        if (password === "") {
            isValid = false;
            $("#passwordError").text("Password is required.");
        } else if (!passwordPattern.test(password)) {
            isValid = false;
            $("#passwordError").text("Password must be at least 7 characters long and contain at least one capital letter, one digit, and one special character (&,$,#,@).");
        }

        // Validate confirm password
        var confirmPassword = $("#confirm_password").val().trim();
        if (confirmPassword === "") {
            isValid = false;
            $("#confirmPasswordError").text("Confirm password is required.");
        } else if (password !== confirmPassword) {
            isValid = false;
            $("#confirmPasswordError").text("Passwords do not match.");
        }

        // Validate email
        var email = $("#email").val().trim();
        var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (email === "") {
            isValid = false;
            $("#emailError").text("Email is required.");
        } else if (!emailPattern.test(email)) {
            isValid = false;
            $("#emailError").text("Please enter a valid email address.");
        }

        // Prevent form submission if validation fails
        if (!isValid) {
            event.preventDefault();
        }
    });
});
