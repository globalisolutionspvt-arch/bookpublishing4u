<?php
// Set headers for JSON response and CORS
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Email configuration
$to_email = "info@instantdesigning.com";
$from_email = "noreply@instantdesigning.com";
$website_name = "Instant Self Publishing";

// Response array
$response = array();

// Check if request is POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    $response['success'] = false;
    $response['message'] = 'Invalid request method.';
    echo json_encode($response);
    exit;
}

// Sanitize and validate input data
function sanitize_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

function validate_email($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL);
}

// Get and sanitize form data
$name = isset($_POST['name']) ? sanitize_input($_POST['name']) : '';
$email = isset($_POST['email']) ? sanitize_input($_POST['email']) : '';
$phone = isset($_POST['phone']) ? sanitize_input($_POST['phone']) : '';
$message = isset($_POST['message']) ? sanitize_input($_POST['message']) : '';

// Additional fields for popup form
$url = isset($_POST['url']) ? sanitize_input($_POST['url']) : '';
$domain = isset($_POST['domain']) ? sanitize_input($_POST['domain']) : '';
$subject_override = isset($_POST['subject']) ? sanitize_input($_POST['subject']) : '';

// Validation
$errors = array();

if (empty($name)) {
    $errors[] = "Name is required.";
}

if (empty($email)) {
    $errors[] = "Email is required.";
} else if (!validate_email($email)) {
    $errors[] = "Please enter a valid email address.";
}

if (empty($phone)) {
    $errors[] = "Phone number is required.";
}

if (empty($message)) {
    $errors[] = "Message is required.";
}

// If there are validation errors
if (!empty($errors)) {
    $response['success'] = false;
    $response['message'] = implode(' ', $errors);
    echo json_encode($response);
    exit;
}

// Determine email subject
if (!empty($subject_override)) {
    $subject = $subject_override;
} else {
    $subject = "New Inquiry from $website_name Website";
}

// Create HTML email content
$html_message = "
<!DOCTYPE html>
<html>
<head>
    <meta charset='UTF-8'>
    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
    <title>New Contact Form Submission</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 0;
            padding: 20px;
            background-color: #f4f4f4;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 10px;
            box-shadow: 0 0 20px rgba(0,0,0,0.1);
            overflow: hidden;
        }
        .header {
            background: linear-gradient(135deg, #0099FF, #0066CC);
            color: white;
            padding: 30px;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            font-size: 28px;
            font-weight: bold;
        }
        .header p {
            margin: 10px 0 0 0;
            font-size: 16px;
            opacity: 0.9;
        }
        .content {
            padding: 40px 30px;
        }
        .field-group {
            margin-bottom: 25px;
            border-left: 4px solid #0099FF;
            padding-left: 20px;
            background-color: #f8f9fa;
            padding: 15px 20px;
            border-radius: 5px;
        }
        .field-label {
            font-weight: bold;
            color: #0066CC;
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 8px;
            display: block;
        }
        .field-value {
            font-size: 16px;
            color: #333;
            line-height: 1.5;
            word-wrap: break-word;
        }
        .message-content {
            background-color: #ffffff;
            border: 2px solid #e9ecef;
            border-radius: 8px;
            padding: 20px;
            font-style: italic;
            color: #555;
        }
        .footer {
            background-color: #f8f9fa;
            padding: 20px 30px;
            text-align: center;
            border-top: 1px solid #dee2e6;
        }
        .footer p {
            margin: 0;
            color: #6c757d;
            font-size: 14px;
        }
        .contact-info {
            background-color: #e3f2fd;
            padding: 20px;
            border-radius: 8px;
            margin-top: 20px;
        }
        .contact-info h3 {
            margin: 0 0 15px 0;
            color: #0066CC;
            font-size: 18px;
        }
        .contact-info p {
            margin: 5px 0;
            color: #333;
        }
        .urgent {
            background-color: #fff3cd;
            border: 1px solid #ffeaa7;
            border-radius: 5px;
            padding: 15px;
            margin-bottom: 20px;
        }
        .urgent strong {
            color: #856404;
        }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h1>📚 New Contact Form Submission</h1>
            <p>Instant Self Publishing - Professional Publishing Services</p>
        </div>
        
        <div class='content'>
            <div class='urgent'>
                <strong>🔔 New Lead Alert:</strong> A potential client has submitted an inquiry through your website.
            </div>
            
            <div class='field-group'>
                <span class='field-label'>👤 Full Name</span>
                <div class='field-value'>$name</div>
            </div>
            
            <div class='field-group'>
                <span class='field-label'>📧 Email Address</span>
                <div class='field-value'><a href='mailto:$email' style='color: #0099FF; text-decoration: none;'>$email</a></div>
            </div>
            
            <div class='field-group'>
                <span class='field-label'>📞 Phone Number</span>
                <div class='field-value'><a href='tel:$phone' style='color: #0099FF; text-decoration: none;'>$phone</a></div>
            </div>
            
            <div class='field-group'>
                <span class='field-label'>💬 Project Details / Message</span>
                <div class='message-content'>$message</div>
            </div>";

// Add additional fields if they exist (for popup form)
if (!empty($url)) {
    $html_message .= "
            <div class='field-group'>
                <span class='field-label'>🌐 Page URL</span>
                <div class='field-value'>$url</div>
            </div>";
}

if (!empty($domain)) {
    $html_message .= "
            <div class='field-group'>
                <span class='field-label'>🏠 Domain</span>
                <div class='field-value'>$domain</div>
            </div>";
}

$html_message .= "
            <div class='contact-info'>
                <h3>📋 Quick Action Items:</h3>
                <p>• Respond within 24 hours for best conversion rates</p>
                <p>• Call the client directly for immediate engagement</p>
                <p>• Send a personalized quote based on their project details</p>
                <p>• Add to your CRM system for follow-up tracking</p>
            </div>
        </div>
        
        <div class='footer'>
            <p>📅 Received on " . date('F j, Y \a\t g:i A') . " | 🌍 IP Address: " . $_SERVER['REMOTE_ADDR'] . "</p>
            <p>This email was automatically generated from your Instant Self Publishing website contact form.</p>
        </div>
    </div>
</body>
</html>";

// Create plain text version
$plain_message = "
NEW CONTACT FORM SUBMISSION - $website_name
========================================

CONTACT INFORMATION:
Name: $name
Email: $email
Phone: $phone

PROJECT DETAILS:
$message
";

if (!empty($url)) {
    $plain_message .= "\nPage URL: $url";
}
if (!empty($domain)) {
    $plain_message .= "\nDomain: $domain";
}

$plain_message .= "\n\nReceived on: " . date('F j, Y \a\t g:i A') . "\nIP Address: " . $_SERVER['REMOTE_ADDR'];

// Email headers
$headers = array();
$headers[] = "MIME-Version: 1.0";
$headers[] = "Content-Type: text/html; charset=UTF-8";
$headers[] = "From: $website_name <$from_email>";
$headers[] = "Reply-To: $name <$email>";
$headers[] = "X-Mailer: PHP/" . phpversion();
$headers[] = "X-Priority: 1"; // High priority
$headers[] = "X-MSMail-Priority: High";
$headers[] = "Importance: High";

// Convert headers array to string
$headers_string = implode("\r\n", $headers);

// Send email
if (mail($to_email, $subject, $html_message, $headers_string)) {
    // Email sent successfully
    $response['success'] = true;
    $response['message'] = "Thank you for your message! We'll get back to you within 24 hours.";
    
    // Log the submission (optional)
    $log_entry = date('Y-m-d H:i:s') . " - New submission from: $name ($email) - Phone: $phone\n";
    file_put_contents('contact_submissions.log', $log_entry, FILE_APPEND | LOCK_EX);
    
} else {
    // Email failed to send
    $response['success'] = false;
    $response['message'] = "Sorry, there was an error sending your message. Please try again or call us directly.";
    
    // Log the error
    $error_log = date('Y-m-d H:i:s') . " - Failed to send email for: $name ($email)\n";
    file_put_contents('email_errors.log', $error_log, FILE_APPEND | LOCK_EX);
}

// Send auto-reply to user
$auto_reply_subject = "Thank you for contacting $website_name!";
$auto_reply_message = "
<!DOCTYPE html>
<html>
<head>
    <meta charset='UTF-8'>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #0099FF, #0066CC); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: white; padding: 30px; border: 1px solid #ddd; }
        .footer { background: #f8f9fa; padding: 20px; text-align: center; border-radius: 0 0 10px 10px; }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h1>📚 Thank You, $name!</h1>
            <p>Your inquiry has been received</p>
        </div>
        <div class='content'>
            <h2>We've Got Your Message!</h2>
            <p>Thank you for reaching out to Book Publisher Amazon. We're excited about the possibility of helping you bring your book to life!</p>
            
            <h3>What Happens Next?</h3>
            <ul>
                <li><strong>Quick Response:</strong> Our team will review your project details and get back to you within 24 hours</li>
                <li><strong>Free Consultation:</strong> We'll schedule a call to discuss your publishing goals and timeline</li>
                <li><strong>Custom Quote:</strong> You'll receive a personalized proposal based on your specific needs</li>
            </ul>
            
            <h3>Your Submission Details:</h3>
            <p><strong>Name:</strong> $name<br>
            <strong>Email:</strong> $email<br>
            <strong>Phone:</strong> $phone<br>
            <strong>Project Details:</strong> $message</p>
            
            <div style='background: #e3f2fd; padding: 20px; border-radius: 8px; margin: 20px 0;'>
                <h3>📞 Need Immediate Assistance?</h3>
                <p>Call us directly at <strong>727-607-2721</strong><br>
                Monday - Friday: 9 AM - 6 PM EST</p>
            </div>
        </div>
        <div class='footer'>
            <p>Book Publisher Amazon | Professional Publishing Services<br>
            Email: contact@bookpublisheramazon.com | Phone: 727-607-2721</p>
        </div>
    </div>
</body>
</html>";

$auto_reply_headers = array();
$auto_reply_headers[] = "MIME-Version: 1.0";
$auto_reply_headers[] = "Content-Type: text/html; charset=UTF-8";
$auto_reply_headers[] = "From: $website_name <$from_email>";
$auto_reply_headers[] = "X-Mailer: PHP/" . phpversion();

mail($email, $auto_reply_subject, $auto_reply_message, implode("\r\n", $auto_reply_headers));

// Return JSON response
echo json_encode($response);
?>