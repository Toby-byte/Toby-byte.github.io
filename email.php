<?php
if(isset($_POST['submit'])){
    $navn = $_POST['navn'];
    $email = $_POST['email'];
    $besked = $_POST['besked'];

    $to = "cybertoby2349@gmail.com";
    $subject = "Ny besked fra din portfolio hjemmeside";
    $body = "Navn: $navn\nEmail: $email\nBesked: $besked";

    mail($to, $subject, $body);
}
?>