<?php

//Script Foreach
$c = true;

// For POST method only!

// Save Basic Form parametrs
$project_name = "Leda~River - сообщение с сайта!";
$admin_email = "gotohunt@bk.ru";
$email_from = "info@leda-river.ru";

// Serialize form fields - that filled-in by User
foreach ( $_POST as $key => $value ) {
	if ( $value != "" && $key != "project_name" && $key != "admin_email" && $key != "form_subject" && $key != "email_from" ) {
		$message .= "
		" . ( ($c = !$c) ? '<tr>':'<tr style="background-color: #f8f8f8;">' ) . "
		<td style='padding: 10px; border: #e9e9e9 1px solid;'><b>$key</b></td>
		<td style='padding: 10px; border: #e9e9e9 1px solid;'>$value</td>
	</tr>
	";
	}
}

// Create message text for sending on email
$message = "<table style='width: 100%;'>$message</table>";

// Function to save User data in file
function send_user_data_in_txt_file ($message){

    //HERE SAVE TEXT INFO
	$f = fopen('form_fill.html', 'a+');
	fwrite($f, date('Y-m-d H:i:s'). "\n");
    fwrite($f, $message );
    fwrite($f, "\n" . "\n" . "\n" . "\n");

}

// Adjusting text encoding
function adopt($text) {
	return '=?UTF-8?B?'.base64_encode($text).'?=';
}

$form_subject = 'Сообщение с моего сайта-портфолио!';

// Preparing header
$headers = "MIME-Version: 1.0" . PHP_EOL .
"Content-Type: text/html; charset=utf-8" . PHP_EOL .
'From: '.adopt($project_name).' <'.$email_from.'>' . PHP_EOL .
'Reply-To: '.$admin_email.'' . PHP_EOL;
//Captcha
// // Проверка того, что есть данные из капчи
// if (!$_POST["g-recaptcha-response"]) {
//     // Если данных нет, то программа останавливается и выводит ошибку
// 	 exit("<div class='contact-form__success'>
// 	 <h2>Произошла ошибка, капча не пройдена!<br>Обновите страницу и попробуйте снова!
// 	 </h2>
// 	</div>");
// } else { // Иначе создаём запрос для проверки капчи
//     // URL куда отправлять запрос для проверки
//     $url = "https://www.google.com/recaptcha/api/siteverify";
//     // Ключ для сервера
//     $key = "6Lca_DUaAAAAABoPFMB_2Qg7SQ96Uig9trseawCi";
//     // Данные для запроса
//     $query = array(
//         "secret" => $key, // Ключ для сервера
//         "response" => $_POST["g-recaptcha-response"], // Данные от капчи
//         "remoteip" => $_SERVER['REMOTE_ADDR'] // Адрес сервера
//     );
 
//     // Создаём запрос для отправки
//     $ch = curl_init();
//     // Настраиваем запрос 
//     curl_setopt($ch, CURLOPT_URL, $url); 
//     curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); 
//     curl_setopt($ch, CURLOPT_POST, true); 
//     curl_setopt($ch, CURLOPT_POSTFIELDS, $query); 
//     // отправляет и возвращает данные
//     $data = json_decode(curl_exec($ch), $assoc=true); 
//     // Закрытие соединения
//     curl_close($ch);
 
//     // Если нет success то
//     if (!$data['success']) {
//         // Останавливает программу и выводит "ВЫ РОБОТ"
//         exit("ВЫ РОБОТ");
//     } else {
//         // Иначе выводим логин и Email
//         echo "<div class='contact-form__success'>
// 		<h2>Ваше сообщение отправлено!<br>
// 		Я свяжусь с&nbsp;Вами в&nbsp;ближайшее время!
// 		</h2>
// 	  </div> ";
//     }
// }
//Captcha
// Sending email to admin
mail($to, $form_subject, $message, $headers);

// Saving user data in file
send_user_data_in_txt_file ($message);

// header('location: ../thankyou.php');
// Я закомментил вывод сообщения об отправке, чтобы избежать дублей с капчей!!!
echo "<div class='contact-form__success'>
		<h2>Ваше сообщение отправлено!<br>
		Я свяжусь с&nbsp;Вами в&nbsp;ближайшее время!
		</h2>
	  </div> ";

?>


