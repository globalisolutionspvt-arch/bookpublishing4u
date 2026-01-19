


<html lang="en">
<head>
	<meta charset="utf-8" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
	<meta name="viewport" content="width=device-width, initial-scale=1">

	<title></title>
	<link href='https://fonts.googleapis.com/css?family=Lato:300,400|Montserrat:700' rel='stylesheet' type='text/css'>
	<style>
		@import url(//cdnjs.cloudflare.com/ajax/libs/normalize/3.0.1/normalize.min.css);
		@import url(//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css);
	</style>
	<link rel="stylesheet" href="https://2-22-4-dot-lead-pages.appspot.com/static/lp918/min/default_thank_you.css">
	<script src="https://2-22-4-dot-lead-pages.appspot.com/static/lp918/min/jquery-1.9.1.min.js"></script>
	<script src="https://2-22-4-dot-lead-pages.appspot.com/static/lp918/min/html5shiv.js"></script>

</head>
<body>
	<header class="site-header" id="header">
		<h1 class="site-header__title" data-lead-id="site-header-title">THANK YOU!</h1>
	</header>

	<div class="main-content">
		<i class="fa fa-check main-content__checkmark" id="checkmark"></i>
		<p class="main-content__body" data-lead-id="main-content-body">Thanks a bunch for filling that out. It means a lot to us, just like you do! We really appreciate you giving us a moment of your time today. Thanks for being you.</p>
	</div>

	<footer class="site-footer" id="footer">
		<p class="site-footer__fineprint" id="fineprint">Copyright ©2025 | All Rights Reserved</p>
	</footer>
	

	
	
	
	
	
</body>
</html>
<script type="text/javascript">   
    function Redirect() 
    {  
        window.location = "https://instantbookpublish.com/"; 
    } 
    document.write("You will be redirected to a new page in 5 seconds"); 
    setTimeout(Redirect, 5000);   
</script>



<?php
//Import PHPMailer classes into the global namespace
//These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

if(isset($_POST['Discount']))
{
    $name = $_POST['name'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    //echo htmlspecialchars($_POST['text']);
    $text = $_POST['msg'];

    

      //Load Composer's autoloader
      require 'PHPMailer/Exception.php';
      require 'PHPMailer/PHPMailer.php';
      require 'PHPMailer/SMTP.php';

      //Create an instance; passing `true` enables exceptions
      $mail = new PHPMailer(true);

      try {
          //Server settings
          //$mail->SMTPDebug = SMTP::DEBUG_SERVER;                      //Enable verbose debug output
          $mail->isSMTP();                                            //Send using SMTP
          $mail->Host       = 'smtp.hostinger.com';                     //Set the SMTP server to send through
          $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
          $mail->Username   = 'info@instantdesigning.com';                     //SMTP username
          $mail->Password   = 'Globalit@190$%$%$';                               //SMTP password
          $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            //Enable implicit TLS encryption
          $mail->Port       = 465;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`

          //Recipients
          $mail->setFrom('info@instantdesigning.com', 'Contact Form');
          $mail->addAddress('info@instantdesigning.com', 'Instant Designing Illustration');     //Add a recipient

          //Attachments
          //$mail->addAttachment('/var/tmp/file.tar.gz');         //Add attachments
          //$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    //Optional name

          //Content
          $mail->isHTML(true);                                  //Set email format to HTML
          $mail->Subject = '50% Discount Form';
          $mail->Body    = "Sender Name - $name <br> Sender Email - $email <br> Sender Phone Number - $phone <br> Message - $text";
          //$mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

          $mail->send();
          echo 'Successfully Send';
      } catch (Exception $e) {
          echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
    }

  }

?>

<?php

if(isset($_POST['contactForm']))
{
    $name = $_POST['name'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $msg = $_POST['massage'];

    

      //Load Composer's autoloader
      require 'PHPMailer/Exception.php';
      require 'PHPMailer/PHPMailer.php';
      require 'PHPMailer/SMTP.php';

      //Create an instance; passing `true` enables exceptions
      $mail = new PHPMailer(true);

      try {
          //Server settings
          //$mail->SMTPDebug = SMTP::DEBUG_SERVER;                      //Enable verbose debug output
          $mail->isSMTP();                                            //Send using SMTP
          $mail->Host       = 'smtp.hostinger.com';                     //Set the SMTP server to send through
          $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
          $mail->Username   = 'info@instantdesigning.com';                     //SMTP username
          $mail->Password   = 'Globalit@190$%$%$';                               //SMTP password
          $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            //Enable implicit TLS encryption
          $mail->Port       = 465;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`

          //Recipients
          $mail->setFrom('info@instantdesigning.com', 'Contact Form');
          $mail->addAddress('info@instantdesigning.com', 'Instant Designing Illustration');     //Add a recipient

          //Attachments
          //$mail->addAttachment('/var/tmp/file.tar.gz');         //Add attachments
          //$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    //Optional name

          //Content
          $mail->isHTML(true);                                  //Set email format to HTML
          $mail->Subject = 'Signup Form';
          $mail->Body    = "Sender Name - $name <br> Sender Email - $email <br> Sender Phone Number - $phone <br> Message - $msg";
          //$mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

          $mail->send();
          echo 'Successfully Send';
          //echo 'header "location: https://stellarbookspublishing.co/thankyou/';
      } catch (Exception $e) {
          echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
    }

  }

?>

<?php

if(isset($_POST['send_msg']))
{
    $name = $_POST['name'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $msg = $_POST['massage'];

    

      //Load Composer's autoloader
      require 'PHPMailer/Exception.php';
      require 'PHPMailer/PHPMailer.php';
      require 'PHPMailer/SMTP.php';

      //Create an instance; passing `true` enables exceptions
      $mail = new PHPMailer(true);

      try {
          //Server settings
          //$mail->SMTPDebug = SMTP::DEBUG_SERVER;                      //Enable verbose debug output
          $mail->isSMTP();                                            //Send using SMTP
          $mail->Host       = 'smtp.hostinger.com';                     //Set the SMTP server to send through
          $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
          $mail->Username   = 'info@instantdesigning.com';                     //SMTP username
          $mail->Password   = 'Globalit@190$%$%$';                               //SMTP password
          $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            //Enable implicit TLS encryption
          $mail->Port       = 465;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`

          //Recipients
          $mail->setFrom('info@instantdesigning.com', 'Contact Form');
          $mail->addAddress('info@instantdesigning.com', 'Instant Designing Illustration');     //Add a recipient

          //Attachments
          //$mail->addAttachment('/var/tmp/file.tar.gz');         //Add attachments
          //$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    //Optional name

          //Content
          $mail->isHTML(true);                                  //Set email format to HTML
          $mail->Subject = 'Let’s Get Started Form';
          $mail->Body    = "Sender Name - $name <br> Sender Email - $email <br> Sender Phone Number - $phone <br> Message - $msg1";
          //$mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

          $mail->send();
          echo 'Successfully Send';
          //echo 'header "location: https://stellarbookspublishing.com/thankyou/';
      } catch (Exception $e) {
          echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
    }

  }

?>

<?php

if(isset($_POST['submit2']))
{
    $name = $_POST['name'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $msg = $_POST['message'];

    

      //Load Composer's autoloader
      require 'PHPMailer/Exception.php';
      require 'PHPMailer/PHPMailer.php';
      require 'PHPMailer/SMTP.php';

      //Create an instance; passing `true` enables exceptions
      $mail = new PHPMailer(true);

      try {
          //Server settings
          //$mail->SMTPDebug = SMTP::DEBUG_SERVER;                      //Enable verbose debug output
          $mail->isSMTP();                                            //Send using SMTP
          $mail->Host       = 'smtp.hostinger.com';                     //Set the SMTP server to send through
          $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
          $mail->Username   = 'info@instantdesigning.com';                     //SMTP username
          $mail->Password   = 'Globalit@190$%$%$';                               //SMTP password
          $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            //Enable implicit TLS encryption
          $mail->Port       = 465;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`

          //Recipients
          $mail->setFrom('info@instantdesigning.com', 'Contact Form');
          $mail->addAddress('info@instantdesigning.com', 'Instant Designing Illustration');     //Add a recipient

          //Attachments
          //$mail->addAttachment('/var/tmp/file.tar.gz');         //Add attachments
          //$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    //Optional name

          //Content
          $mail->isHTML(true);                                  //Set email format to HTML
          $mail->Subject = 'Limited Time Offer';
          $mail->Body    = "Sender Name - $name <br> Sender Email - $email <br> Sender Phone Number - $phone <br> Message - $msg2";
          //$mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

          $mail->send();
          echo 'Successfully Send';
          //echo 'header "location: https://stellarbookspublishing.co/thankyou/';
      } catch (Exception $e) {
          echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
    }

  }

?>
<?php

if(isset($_POST['lets-started']))
{
    $name = $_POST['name'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
        $msg = $_POST['message'];


    

      //Load Composer's autoloader
      require 'PHPMailer/Exception.php';
      require 'PHPMailer/PHPMailer.php';
      require 'PHPMailer/SMTP.php';

      //Create an instance; passing `true` enables exceptions
      $mail = new PHPMailer(true);

      try {
          //Server settings
          //$mail->SMTPDebug = SMTP::DEBUG_SERVER;                      //Enable verbose debug output
          $mail->isSMTP();                                            //Send using SMTP
          $mail->Host       = 'smtp.hostinger.com';                     //Set the SMTP server to send through
          $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
          $mail->Username   = 'info@instantdesigning.com';                     //SMTP username
          $mail->Password   = 'Globalit@190$%$%$';                               //SMTP password
          $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            //Enable implicit TLS encryption
          $mail->Port       = 465;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`

          //Recipients
          $mail->setFrom('info@instantdesigning.com', 'SUBSCRIBE NOW Form');
          $mail->addAddress('info@instantdesigning.com', 'Instant Designing Illustration');     //Add a recipient

          //Attachments
          //$mail->addAttachment('/var/tmp/file.tar.gz');         //Add attachments
          //$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    //Optional name

          //Content
          $mail->isHTML(true);                                  //Set email format to HTML
          $mail->Subject = 'Limited Time Offer';
          $mail->Body    = "Sender Name - $name <br> Sender Phone Number - $phone <br> Sender Email - $email <br> Message - $msg";
          //$mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

          $mail->send();
          echo 'Successfully Send';
          //echo 'header "location: https://stellarbookspublishing.co/thankyou/';
      } catch (Exception $e) {
          echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
    }

  }

?>

<?php

if(isset($_POST['signupForm']))  // Changed from signupBtn to signupForm
{
    $name = $_POST['cn'];     // Changed from 'name' to 'cn'
    $phone = $_POST['pn'];    // Changed from 'phone' to 'pn'
    $email = $_POST['em'];    // Changed from 'email' to 'em'
    $msg = $_POST['msg'];
    $subject = $_POST['subject'];  // Added subject field

    //Load Composer's autoloader
    require 'PHPMailer/Exception.php';
    require 'PHPMailer/PHPMailer.php';
    require 'PHPMailer/SMTP.php';

    //Create an instance; passing `true` enables exceptions
    $mail = new PHPMailer(true);

    try {
        //Server settings
        $mail->isSMTP();
        $mail->Host       = 'smtp.hostinger.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = 'info@instantdesigning.com';
        $mail->Password   = 'Globalit@190$%$%$';
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
        $mail->Port       = 465;

        //Recipients
        $mail->setFrom('info@instantdesigning.com', 'Contact Form');
        $mail->addAddress('info@instantdesigning.com', 'Instant Designing Illustration');

        //Content
        $mail->isHTML(true);
        $mail->Subject = $subject;  // Using the subject from form
        $mail->Body    = "Sender Name - $name <br> Sender Phone Number - $phone <br> Sender Email - $email <br> Message - $msg";

        $mail->send();
        // Email sent successfully - page will continue loading
        
    } catch (Exception $e) {
        echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
    }
}

?>