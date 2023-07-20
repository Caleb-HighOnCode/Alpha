<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = test_input($_POST["name"]);
    $email = test_input($_POST["email"]);
    $number = test_input($_POST["number"]);
    $message = test_input($_POST["message"]);

    // Validate name (must not be empty)
    if (empty($name)) {
        showAlertAndRedirect("Name is required.");
    }

    // Validate email
    if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        showAlertAndRedirect("Invalid email address.");
    }

    // Validate phone number (must be numeric and at least 10 digits)
    if (empty($number) || !preg_match("/^[0-9]{10,}$/", $number)) {
        showAlertAndRedirect("Invalid phone number. Please enter a 10-digit numeric value.");
    }

    // Validate message (must not be empty)
    if (empty($message)) {
        showAlertAndRedirect("Message is required.");
    }

    // Compose the email content (with HTML formatting)
    $to_email = "jcalebjohn474@gmail.com";
    $subject = "New Contact Form Website";
    $email_content = "<html><body>";
    $email_content .= "<h2>Contact Details:</h2>";
    $email_content .= "<p><strong>Name:</strong> $name</p>";
    $email_content .= "<p><strong>Email:</strong> $email</p>";
    $email_content .= "<p><strong>Phone Number:</strong> $number</p>";
    $email_content .= "<h2>Message:</h2>";
    $email_content .= "<p>$message</p>";
    $email_content .= "</body></html>";

    // Additional headers for HTML email
    $headers = "From: $email" . "\r\n";
    $headers .= "Reply-To: $email" . "\r\n";
    $headers .= "Content-type: text/html; charset=UTF-8" . "\r\n";

    // Send the email
    if (mail($to_email, $subject, $email_content, $headers)) {
        // Email sent successfully
        echo "success";
    } else {
        // Error sending email
        showAlertAndRedirect("Oops! Something went wrong while sending the email. Please try again later.");
    }
} else {
    // Redirect if accessed directly without form submission
    header("Location: index.html");
    exit();
}

// Function to sanitize form inputs
function test_input($data)
{
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

// Function to show alert message and redirect
function showAlertAndRedirect($message)
{
    echo "<script>alert('$message');window.location.href='contact.html';</script>";
}
?>
