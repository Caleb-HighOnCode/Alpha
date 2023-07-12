<?php
 
if(isset($_POST['email'])) {
 
 
    $email_to = "jcalebjohn474@gmail.com";
 
    $email_subject = "New Contact Form Received From Website";
 
     
  
 
    $first_name = $_POST['name'];
  
    $email_from = $_POST['email'];
 
    $telephone = $_POST['number']; 
 
    $comments = $_POST['message']; 

 
@mail($email_to, $comments, $telephone, $comments);  
 
?>
 

 
 
 
 
<h1>Thank you for your message!</h1> <h2>We will contact you as soon as possible.</h2>

 
 
 
<?php
 
}
 
?>
