$(document).ready(function () {
	function showSuccess() {
		let callModal = `<div style="margin: 0 auto;
    padding: 15px 25px;
    position: relative;
    z-index: 2;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 77, 136, 0.5);
    overflow: hidden;"><p style="text-align: center; font-family: sans-serif; color: #ff0000 !important; font-size: 32px; font-weight: 400; text-shadow: 0 0 5px #fff;">Спасибо!<br>Ваша заявка принята!</p>
  </div>`;
		document
			.querySelector(".callback-form__row")
			.insertAdjacentHTML("afterbegin", callModal);
		setTimeout(hideSuccess, 3500);
	}
	function hideSuccess() {
		document.querySelector(".callback-form__row").innerHTML = "";
	}
	// Запрет ввода других символов, кроме кириллицы
	let nameInp = document.querySelector('#nameInp');

	nameInp.addEventListener('input', cleanInpChar);

	function cleanInpChar(){
		this.value = this.value.replace(/[^ А-Яа-я-]/g, '');
	}
	// Запрет ввода других символов, кроме цифр
	let telInp = document.querySelector('#telInp');

	telInp.addEventListener('input', cleanInpDigit);

	function cleanInpDigit(){
		this.value = this.value.replace(/[^+0-9]/g, '');
	}
	//Валидация формы заказа звонка
	$(".callback-form").validate({
		rules: {
			clientName: {
				required: true,
				minlength: 2,
				maxlength: 21,
			},
			clientPhone: {
				required: true,
				// digits: true,
				minlength: 11,
				maxlength: 13,
			},
		},
		messages: {
			clientName: {
				required: "А как к Вам обращаться?!",
				minlength: "Имя введено некорректно!",
				maxlength: "Ваше имя слишком длинное!",
			},
			clientPhone: {
				required: "Ваш телефон?",
				// digits: "Только цифры!",
				minlength: "Неверный номер!",
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
		let string = $(".callback-form").serialize(); // Сохраняем данные введенные в форму в строку.

		//Формируем ajax запрос
		$.ajax({
			type: "POST", // Тип запроса - POST
			url: "../php/callback.php", // Куда отправляем запрос
			data: string, // Какие даные отправляем, в данном случае отправляем переменную string

			// Функция если все прошло успешно
			success: async function () {
				await $(".callback-form").slideUp(900);
				document.querySelector(
					".callback-form__row"
				).style.cssText = `padding: 0 !important;`;
				setTimeout(showSuccess, 1100);
			},
		});
		// Чтобы по Submit больше ничего не выполнялось - делаем возврат false чтобы прервать цепочку срабатывания остальных функций
		return false;
	}
});
