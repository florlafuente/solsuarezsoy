<?php
// Check for empty fields
if(empty($_POST['nombre'])      ||
   empty($_POST['email'])     ||
   empty($_POST['comentarios'])   ||
   !filter_var($_POST['email'],FILTER_VALIDATE_EMAIL))
   {
   echo "No arguments Provided!";
   return false;
   }
   
$name = strip_tags(htmlspecialchars($_POST['nombre']));
$email_address = strip_tags(htmlspecialchars($_POST['email']));
$phone = strip_tags(htmlspecialchars($_POST['phone']));
$message = strip_tags(htmlspecialchars($_POST['message']));
   
// Create the email and send the message
$to = 'lafuente.florencia@gmail.com'; // Add your email address inbetween the '' replacing yourname@yourdomain.com - This is where the form will send a message to.
$email_subject = "Contacto desde la web:  $name";
$email_body = "Recibiste un mensaje desde el formulario de contacto\n\n"."Acá están los detalles:\n\nNombre: $name\n\nEmail: $email_address\n\nMessage:\n$message";
$headers = "From: noreply@solsuarezsoy.com.ar\n"; // This is the email address the generated message will be from. We recommend using something like noreply@yourdomain.com.
$headers .= "Reply-To: $email_address";   
mail($to,$email_subject,$email_body,$headers);
return true;         
?>
