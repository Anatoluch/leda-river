$(document).ready(function () {
	const scrollFix = document.body.closest("html"); // html для noscroll
	const formBlock = document.querySelector(".call-form");

	let formModalBtnOn = document.querySelectorAll(".btn-show"); // кнопка для вызова модалки с формой

	//Скрипт для fake-placeholder'а формы заказа брони
	const callFormItems = document.querySelectorAll(".call-form__input");
	const fakePlaceholder = document.querySelectorAll(".call-form__fake-placeholder"); // коллекция всех фейковых placeholders
	
	for (let item of callFormItems) {
		const thisParent = item.closest(".call-form__item-row");
		const thisPlaceholder = thisParent.querySelector(".call-form__fake-placeholder");
		//Текстовое поле (input) в фокусе
		item.addEventListener("focus", function () {
			if (thisPlaceholder) {
				thisPlaceholder.classList.add("active");
			}
		});
		//Текстовое поле теряет фокус
		item.addEventListener("blur", function () {
			if (item.value.length > 0) {
				if (thisPlaceholder) {
					thisPlaceholder.classList.add("active");
				}
			} else {
				if (thisPlaceholder) {
					thisPlaceholder.classList.remove("active");
				}
			}
		});
	};

		// Выбор даты
		let dateInp = document.querySelector('#dateInp');
		let dateTimeNow = new Date(); // текущие дата и время (локальный часовой пояс)
		let dateYear, dateMonth, dateDay, dateHour;
	
		dateYear = (dateTimeNow.getFullYear()).toString(); //метод получения текущего года
		dateMonth = (dateTimeNow.getMonth() + 1).toString(); //метод получения текущего месяца
		dateDay = (dateTimeNow.getDate()).toString(); //метод получения текущего дня
	
		if (dateMonth < 10) {
			dateMonth = `0${dateMonth}`;
		}
	
		dateInp.min = `${dateYear}-${dateMonth}-${dateDay}T09:00`; // Формирование параметра выбора минимальной даты

	// Отображение счётчика символов ввода
	let textField = document.querySelector('#commentInp');
	let counterRow = document.querySelector('.call-form__text-counter');

	// Текстовое поле в фокусе
	textField.addEventListener('focus', function(){
		counterRow.classList.remove('transp-count');
	});
	// Потеря фокуса
	textField.addEventListener('blur', function(){
		counterRow.classList.add('transp-count');
	});

	//Ограничение длины поля "пожелания/комментарии"
	let maxCount = 360;
	let counterSpan = document.querySelector('#char-counter');
	$(".call-form textarea").keyup(function() {
	if (this.value.length > maxCount)
		this.value = this.value.substr(0, maxCount);
	});
	//Счетчик оставшихся для вода символов (пожелания/комментарии)
	$("#char-counter").html(maxCount);
	$("#commentInp").keyup(function() {
	let revText = this.value.length;
	if (this.value.length > maxCount) {
		this.value = this.value.substr(0, maxCount);
	}
	let cnt = (maxCount - revText);
	if(cnt <= 0){$("#char-counter").html('0');}
	else {$("#char-counter").html(cnt);}
}); 
	// Вызов формы по клику на кнопке
	formModalBtnOn.forEach(function (item) {
		item.addEventListener("click", function (e) {
			e.preventDefault();
			document.querySelector(".call-form__wrapper").classList.remove("hidden");
			scrollFix.classList.add("noscroll"); // добавления класса noscroll для всего html
		});
	});
	// Удаление формы со страницы по клику на "крестик" формы
	document.querySelector(".close-form").addEventListener("click", function () {
		document.querySelector(".call-form__wrapper").classList.add("hidden");
		scrollFix.classList.remove("noscroll");
		formBlock.reset();
		humCheckbox.checked = false;
		botCheckbox.checked = true;
		submitBtn.disabled = true;
		controlQuestion.disabled = true;
		botCheckbox.style = 'display:block';
		humCheckbox.style = 'display:none';
		fakeBotPlaceholder.classList.add('hidden');
		controlQuestion.style = 'display:none';
		botTestRow.classList.add('hidden');
		callFormPolicy.disabled = false;
		controlQuestion.blur();
		counterSpan.innerText = maxCount;
		fakeBotPlaceholder.classList.remove("active");
		formBlock.removeAttribute('method', 'POST'); // Удаление метода отправки данных формы
		formBlock.removeAttribute('action', './php/call.php'); // Удаление обработчика формы
		fakePlaceholder.forEach(function(item){
			item.classList.remove("active");
		});
	});

	//Запрет вставки скопированного в инпуты формы
	let formCallInputs = document.querySelectorAll('.call-form input');

	formCallInputs.forEach(function(item){
		item.addEventListener('paste', function(e){
			e.preventDefault();
		});
	});

	//Проверка на роботов
	let callFormPolicy = document.querySelector('.call-form__policy'); // чекбокс политики конфиденциальности
	let botTestRow = document.querySelector('.bot-test'); // ячейка проверки ботов
	let submitBtn = document.querySelector(".submit-btn__wrapper .btn"); // кнопка отправки заявки
	let botCheckbox = document.querySelector("#bot-checkbox");
	let humCheckbox = document.querySelector("#hum-checkbox");
	let fakeBotPlaceholder = document.querySelector('#bot-placeholder'); // Фейковый placeholder контрольного вопроса
	let controlQuestion = document.querySelector('#control-question');
	// let captcha = document.querySelector('.bot-test .g-recaptcha');


	callFormPolicy.addEventListener('change', function(e){
		if (e.target.checked == true) {
			botTestRow.classList.remove('hidden');
		} else {
			botTestRow.classList.add('hidden');
		}
	});
	// Отображение "Вы человек" по снятию галочки с "Вы робот"
	botCheckbox.addEventListener('change', function(e){
		if (e.target.checked == false) {
			botCheckbox.style = 'display:none';
			humCheckbox.style = 'display:block';
		}
	});

	// Отображение контрольного вопроса и скрытие чекбокса "Вы человек"
	humCheckbox.addEventListener('change', function(e){
		if (e.target.checked) {
			humCheckbox.style = 'display:none';
			fakeBotPlaceholder.classList.remove('hidden');
			controlQuestion.style = 'display:block';
			controlQuestion.disabled = false;
		} else {
			submitBtn.disabled = true;
			controlQuestion.disabled = true;
			controlQuestion.style = 'display:none';
		}
	});
	controlQuestion.addEventListener('input', function(e){
		let inputValue = e.target.value.toLowerCase();
		if (inputValue === "москва") {
			submitBtn.disabled = false;
			formBlock.setAttribute('method', 'POST'); // Добавление метода отправки данных формы
			formBlock.setAttribute('action', './php/call.php'); // Добавление обработчика формы
			fakeBotPlaceholder.classList.add('hidden');
			controlQuestion.style = 'display:none';
			fakeBotPlaceholder.classList.remove("active");
			controlQuestion.blur();
			botTestRow.classList.add('hidden');
			callFormPolicy.disabled = true;
		} else {
			submitBtn.disabled = true;
		}
	});
	// Запрет ввода других символов,в т.ч. пробелов, кроме кириллицы в input контрольного вопроса
	controlQuestion.addEventListener("input", cleanControlQuestionChar);
	function cleanControlQuestionChar() {
		this.value = this.value.replace(/[^А-Яа-я-]/g, "");
	};
	
	// Запрет ввода других символов, кроме кириллицы
	let nameInp = document.querySelector("#nameInp");

	nameInp.addEventListener("input", cleanInpChar);

	function cleanInpChar() {
		this.value = this.value.replace(/[^ А-Яа-я-]/g, "");
	};
	// Запрет ввода других символов, кроме цифр
	let telInp = document.querySelector("#telInp");

	telInp.addEventListener("input", cleanInpDigit);

	function cleanInpDigit() {
		this.value = this.value.replace(/[^+0-9]/g, "");
	};
	//Валидация формы заказа звонка
	$(".call-form").validate({
		rules: {
			clientName: {
				required: true,
				minlength: 2,
				maxlength: 21,
			},
			clientPhone: {
				required: true,
				minlength: 11,
				maxlength: 13,
			},
			date: {
				required: true,
				minlength: 12,
				maxlength: 16,
			},
			policy_agreement: {
				required: true,
			},
			botQuestion: {
				required: true,
				minlength: 6,
				maxlength: 6,
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
			date: {
				required: "Дата и время выхода в море?",
				minlength: "Ошибка ввода!",
				maxlength: "Ошибка ввода!",
			},
			policy_agreement: {
				required: "Чтобы отправить сообщение, нужно принять политику конфиденциальности!",
			},
			botQuestion: {
				required: "Обязательное поле!",
				minlength: "Ошибка ввода!",
				maxlength: "Ошибка ввода!",
			},
		},
		submitHandler: function (form) {
			ajaxCallFormSubmit();
		},
	});

	// Ф-ия при успешной отправки формы
	function showSuccess() {
		let callModal = `<div style="margin: auto;
    padding: 15px 25px;
    position: relative;
    z-index: 2;
    display: flex;
		width: 95vw;
		min-width: 320px;
		max-width: 600px;
    justify-content: center;
    align-items: center;
    border-radius: 0;
		background: rgba(27, 75, 90, 0.25);
    backdrop-filter: blur(4px);
    overflow: hidden;"><p style="text-align: center; font-family: sans-serif; color: #fff !important; font-size: 45px; font-weight: 500;">Спасибо!<br>Ваша&nbsp;заявка принята!</p>
		</div>`;
		document.querySelector(".close-form").classList.add("hidden");
		document
			.querySelector(".paralaxe-header__call-row")
			.insertAdjacentHTML("afterbegin", callModal);
		document.querySelector(".call-form__title").classList.add("hidden");
		formBlock.classList.add("hidden");
		setTimeout(hideSuccess, 3500);
		setTimeout(function () {
			location.reload();
		}, 3500);
	};
	function hideSuccess() {
		scrollFix.classList.remove("noscroll");
		document.querySelector(".call-form__wrapper").classList.add("hidden");
		formBlock.classList.remove("hidden");
		callModal.innerHTML = "";
	};
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
