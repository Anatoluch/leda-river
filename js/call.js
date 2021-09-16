$(document).ready(function () {
	function showSuccess() {
		let callModal = `<div style="margin: 0 auto;
    padding: 15px 25px;
    position: relative;
    z-index: 2;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 45px;
    background: rgba(27, 75, 90, 0.25);
    backdrop-filter: blur(4px);
    overflow: hidden;"><p style="text-align: center; font-family: sans-serif; color: #ff0000 !important; font-size: 32px; font-weight: 400; text-shadow: 0 0 5px #fff;">Спасибо!<br>Ваша заявка принята!</p>
  </div>`;
		document.querySelector(".paralaxe-header__call-row").insertAdjacentHTML("afterbegin", callModal);
    setTimeout(hideSuccess, 3500);
	}
  function hideSuccess(){
    document.querySelector(".paralaxe-header__call-row").innerHTML = "";
  }
	//Валидация формы заказа звонка
	$(".call-form").validate({
		rules: {
			clientName: {
				required: true,
			},
			clientPhone: {
				required: true,
				digits: true,
				minlength: 10,
				maxlength: 12,
			},
		},
		messages: {
			clientName: {
				required: "А как к Вам обращаться?!",
			},
			clientPhone: {
				required: "Ваш телефон?",
				digits: "Только цифры!",
				minlength: "Ошибка ввода!!!",
				maxlength: "Ошибка ввода!!!",
			},
		},
		submitHandler: function (form) {
			ajaxCallFormSubmit();
		},
	});
	//Отправка данных формы обратной связи
	// Функция AJAX запрса на сервер
	function ajaxCallFormSubmit() {
		let string = $(".call-form").serialize(); // Сохраняем данные введенные в форму в строку.

		//Формируем ajax запрос
		$.ajax({
			type: "POST", // Тип запроса - POST
			url: "php/call.php", // Куда отправляем запрос
			data: string, // Какие даные отправляем, в данном случае отправляем переменную string

			// Функция если все прошло успешно
			success: async function () {
				await $(".call-form").slideUp(900);
				document.querySelector(
					".paralaxe-header__call-row"
				).style.cssText = `padding: 0 !important;`;
				setTimeout(showSuccess, 1100);
			},
		});
		// Чтобы по Submit больше ничего не выполнялось - делаем возврат false чтобы прервать цепочку срабатывания остальных функций
		return false;
	}
});