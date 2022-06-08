<?php
$to = 'leda-river@mail.ru';
$project_name = "Leda~River - отзыв!";
$email_from = "reviews@leda-river.ru";



if (isset($_POST['sendMail'])) {
  $name  = substr($_POST['reviewsUserName'], 0, 64);
  // $tel = substr( $_POST['tel'], 0, 64 );
  $email   = substr($_POST['reviewsEmail'], 0, 64);
  $message = strip_tags(trim($_POST['reviewText']));


  if (!empty($_FILES['avatarFile']['tmp_name']) and $_FILES['avatarFile']['error'] == 0) {
    $filepath = $_FILES['avatarFile']['tmp_name'];
    $filename = $_FILES['avatarFile']['name'];
    $filetype = $_FILES['avatarFile']['type'];
  } else {
    $filepath = '';
    $filename = '';
  }

  $allowed_filetypes = array('.jpg', '.gif', '.jpeg', '.png'); // Здесь мы перечисляем допустимые типы файлов
  $ext = substr($filename, strpos($filename, '.'), strlen($filename) - 1); // В переменную $ext заносим расширение загруженного файла.

  if (!in_array($ext, $allowed_filetypes)) {
    $filepath = '';
    $filename = '';
    $_FILES = null;
    // $filetype = '';
    // die('Данный тип файла не поддерживается.');
  }


  $body = "Имя:\r\n" . $name . "\r\n\r\n";
  // $body .= "Контактный номер:\r\n".$tel."\r\n\r\n";
  $body .= "E-mail:\r\n" . $email . "\r\n\r\n";
  $body .= "Отзыв:\r\n" . $message;

  send_mail($to, $body, $email, $filepath, $filename);
}

// Вспомогательная функция для отправки почтового сообщения с вложением
function send_mail($to, $body, $email, $filepath, $filename)
{
  $subject = 'Отзыв о нас';
  $boundary = "--" . md5(uniqid(time())); // генерируем разделитель
  // $headers = "From: ".$email_from."\r\n";   
  $headers = "Reply-To: " . $to . "\r\n";
  $headers .= "MIME-Version: 1.0\r\n";
  $headers .= "Content-Type: multipart/mixed; boundary=\"" . $boundary . "\"\r\n";
  $multipart = "--" . $boundary . "\r\n";
  $multipart .= "Content-type: text/plain; charset=\"utf-8\"\r\n";
  $multipart .= "Content-Transfer-Encoding: quoted-printable\r\n\r\n";

  $body = $body . "\r\n\r\n";

  $multipart .= $body;

  $file = '';
  if (!empty($filepath)) {
    $fp = fopen($filepath, "r");
    if ($fp) {
      $content = fread($fp, filesize($filepath));
      fclose($fp);
      $file .= "--" . $boundary . "\r\n";
      $file .= "Content-Type: application/octet-stream\r\n";
      $file .= "Content-Transfer-Encoding: base64\r\n";
      $file .= "Content-Disposition: attachment; filename=\"" . $filename . "\"\r\n\r\n";
      $file .= chunk_split(base64_encode($content)) . "\r\n";
    }
  }
  $multipart .= $file . "--" . $boundary . "--\r\n";

  // Максимальный размер загружаемого файла
  ini_set('upload_max_filesize', '1M');

  // Максимально разрешённое количество одновременно загружаемых файлов
  ini_set('max_file_uploads', '1');

  mail($to, $subject, $multipart, $headers);
}
