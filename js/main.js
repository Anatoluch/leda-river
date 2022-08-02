/*
Из-за конфликтов при подключении этого файла с add-review.js, а именно появление ошибок 
на обработчиках событий элементов, отсутствующих на странице reviews.html, пришлось 
обернуть большинсво обработчиков событий в конструкцию 
if (element){
	element.addEventListener('type', listener, options)
}
*/
$(document).ready(function () {
	// Проверка на поддержку JS
	let jsTest = document.querySelector(".js-test");
	let jsTestH3 = document.querySelector("#js-test-h3");
	let jsTestP = document.querySelector("#js-test-p");
	let jsOk = document.createElement('h3');
	jsOk.classList.add('js-ok');
	jsOkTextNode = document.createTextNode('Всё OK! Ваш браузер поддерживает JavaScript!');
	jsOk.appendChild(jsOkTextNode);

	if (jsTest.classList.contains("js-test")) {
		jsTestH3.classList.add("transperent");
		jsTestP.classList.add("transperent");
		setTimeout(function () {
			jsTestH3.remove();
			jsTest.prepend(jsOk);
			jsTestP.remove();
		}, 400);
		setTimeout(function () {
			jsOk.classList.add("transperent");
			jsTest.classList.add("transperent");
		}, 1200);
		setTimeout(function () {
			jsTest.remove();
		}, 1600);
	}

	// Фиксирование меню при скролле
	$(window).scroll(function () {
		if ($(window).scrollTop() > 360 && $(window).scrollTop() < 770) {
			$("#nav-wrapper").fadeIn(900); //Появление прилипающего мобильного меню сверху страницы
		} else if ($(window).scrollTop() >= 770) {
			$("#nav-wrapper-pc").fadeIn(900); //Появление прилипающего меню сверху страницы (ПК)
			$("#nav-wrapper").fadeIn(900); //Появление прилипающего мобильного меню сверху страницы
		} else {
			$("#nav-wrapper").fadeOut(150); //Исчезание прилипающего мобильного меню сверху страницы
			$("#nav-wrapper-pc").fadeOut(150); //Исчезание прилипающего меню сверху страницы (ПК)
		}
	});

	// Событие "контектсное меню" запрет вызова контекстного меню
	// document.addEventListener("contextmenu", function (e) {
	// 	e.preventDefault();
	// });
	//Запрет открытия исходного кода страницы горячими клавишами
	// document.addEventListener("keydown", function (e) {
	// 	if (e.ctrlKey && (e.keyCode === 85 || e.keyCode === 117)) {
	// 		// ctrl-u ctrl-f6
	// 		e.preventDefault();
	// 		alert("Доступ к исходному коду запрещён!");
	// 	} else {
	// 		return true;
	// 	}
	// });
	//Запрет вставки через ctrl-v
	// document.addEventListener('keydown', function(e){
	// 	if (e.ctrlKey && (e.keyCode === 86)) { // ctrl-v
	// 		e.preventDefault();
	// 	} else {
	// 		return true;
	// 	}
	// });
	// Подключение точек пагинации справа page-nav
	$("#page-nav").onePageNav({
		currentClass: "active-nav",
		changeHash: false,
		scrollSpeed: 750,
		scrollThreshold: 0.5,
		filter: "",
		easing: "swing",
		begin: function () {},
		end: function () {},
		scrollChange: function ($currentListItem) {},
	});

	//"Гамбургер-меню"
	const toggleMenu = document.querySelector(".toggle-menu"); //Иконка меню "Гамбургер"
	const toggleMenuFixed = document.querySelector(".toggle-menu-fixed"); //Иконка меню "Гамбургер"(фиксированное меню)
	const mobMenu = document.querySelector(".mobile-menu"); // Плашка под мобильное меню
	const overlay = document.querySelector("#overlay"); // overlay
	const phoneMob = document.querySelector(".phone-top-mob");
	const bodyEl = document.body.closest("html");

	function toggleMIt() {
		mobMenu.classList.toggle("active");
		overlay.classList.toggle("active");
		bodyEl.classList.toggle("noscroll");
	}
	function removeIt() {
		toggleMenu.classList.remove("active");
		bodyEl.classList.remove("noscroll");
	}
	//Сценарий события клик по "гамбургеру" (появление/исчезание моб. меню, оверлея)
	toggleMenu.addEventListener("click", function () {
		this.classList.toggle("active");
		toggleMIt();
	});
	toggleMenuFixed.addEventListener("click", function () {
		this.classList.toggle("active");
		toggleMenu.classList.toggle("active"); +
		toggleMIt();
	});
	//Сценарий события клик по любому элементу (ссылке, иконке и т.д) моб. меню (но не по "гамбургеру")
	mobMenu.addEventListener("click", function () {
		this.classList.remove("active");
		removeIt();
		overlay.classList.remove("active");
	});
	//Блок с телефоном - отмена всплытия
	phoneMob.addEventListener("click", (e) => {
		e.stopPropagation();
	});

	//Сценарий события клик по оверлею
	overlay.addEventListener("click", function () {
		this.classList.remove("active");
		removeIt();
		mobMenu.classList.remove("active");
	});
	// Скрыть часть фото на мобильных устройствах \
	if (document.querySelector(".gallery-link")) {
		const galleryLink = document.querySelector(".gallery-link"); //Блок ссылок показать все/скрыть
		const photo = document.querySelectorAll(".hide-photo"); //фотокарточка
		const link1 = document.querySelector(".link-1"); // ссылка "показать все"
		const link2 = document.querySelector(".link-2"); // ссылка "скрыть"

		galleryLink.addEventListener("click", function () {
			photo.forEach(function(item){
				item.classList.toggle("photo");
			});
			link1.classList.toggle("link-1-hide");
			link2.classList.toggle("link-2-show");
		});
	}

	// Смена статичного фона при скролле
	// $(window).scroll(function () {
	// 	let bgHead = $("#bg-img-head");
	// 	let bg1 = $("#bg-img-1");
	// 	let bg2 = $("#bg-img-2");
	// 	if ($(this).width() > 1024 && $(this).width() < 2500) {
	// 		if ($(this).scrollTop() >= 0 && $(this).scrollTop() < 1850) {
	// 			bgHead.fadeIn(1);
	// 			bg1.fadeOut(1);
	// 			bg2.fadeOut(1);
	// 		} else if ($(this).scrollTop() > 1850 && $(this).scrollTop() < 4400) {
	// 			bg1.fadeIn(1);
	// 			bg2.fadeOut(1);
	// 			bgHead.fadeOut(1);
	// 		} else if ($(this).scrollTop() > 4400) {
	// 			bg1.fadeOut(1);
	// 			bg2.fadeIn(1);
	// 		}
	// 	} else if ($(this).width() >= 2501 && $(this).width() < 3200) {
	// 		if ($(this).scrollTop() >= 0 && $(this).scrollTop() < 1850) {
	// 			bgHead.fadeIn(1);
	// 			bg1.fadeOut(1);
	// 			bg2.fadeOut(1);
	// 		} else if ($(this).scrollTop() > 1850 && $(this).scrollTop() < 5400) {
	// 			bg1.fadeIn(1);
	// 			bg2.fadeOut(1);
	// 			bgHead.fadeOut(1);
	// 		} else if ($(this).scrollTop() > 5400) {
	// 			bg1.fadeOut(1);
	// 			bg2.fadeIn(1);
	// 		}
	// 	} else if ($(this).width() >= 3200) {
	// 		if ($(this).scrollTop() >= 0 && $(this).scrollTop() < 2335) {
	// 			bgHead.fadeIn(1);
	// 			bg1.fadeOut(1);
	// 			bg2.fadeOut(1);
	// 		} else if ($(this).scrollTop() > 2335 && $(this).scrollTop() < 6880) {
	// 			bg1.fadeIn(1);
	// 			bg2.fadeOut(1);
	// 			bgHead.fadeOut(1);
	// 		} else if ($(this).scrollTop() > 6880) {
	// 			bg1.fadeOut(1);
	// 			bg2.fadeIn(1);
	// 		}
	// 	} else if ($(this).width() <= 1024) {
	// 		if ($(this).scrollTop() >= 0 && $(this).scrollTop() < 1500) {
	// 			bgHead.fadeOut(1);
	// 			bg1.fadeOut(1);
	// 			bg2.fadeOut(1);
	// 		} else {
	// 			bgHead.fadeIn(1);
	// 		}
	// 	}
	// });

	// Скрыть часть фото для мобильных устройств (Галерея в статье)
	if (document.querySelector(".article-gallery-link")) {
		const artGalleryLink = document.querySelector(".article-gallery-link"); //Ссылка показать/скрыть
		const artPhoto = document.querySelectorAll(".hide-article-photo"); //фотокарточка
		const showLink = document.querySelector(".show-link"); // ссылка "показать все"
		const hideLink = document.querySelector(".hide-link"); // ссылка "скрыть"

		artGalleryLink.addEventListener("click", function () {
			artPhoto.forEach(function(item){
				item.classList.toggle("article__photo");
			});
			showLink.classList.toggle("show-link-hide");
			hideLink.classList.toggle("hide-link-show");
		});
	}
	/* Показ кнопки "наверх" */
	$(window).scroll(function () {
		if ($(this).width() > 280) {
			if ($(this).scrollTop() > 300) {
				$("#back2Top").fadeIn();
			} else {
				$("#back2Top").fadeOut();
			}
		}
	});
	//Кнопка "Наверх"
	$("#back2Top").click(function (event) {
		event.preventDefault();
		$("html, body").animate({ scrollTop: 0 }, "slow");
		return false;
	});

	//Защита номера телефона от спама
	const Tel = document.querySelectorAll(".phone-img");

	Tel.forEach(function(item){
		item.addEventListener("click", function(){
			this.style = "display: none";
			this.insertAdjacentHTML("afterend", '<a href="tel:+79181639644"> +7(918) 163 96 44</a>');
		});
	});

	//Замена картинки карты на интерактивную версию (для мобильных и ПК)
	//Сценарий события клик по оболочке (замена изображения на интерактив)
	if (document.querySelector(".map-overlay")) {
		const mapChange = document.querySelector(".map-overlay"); // Оболочка
		const fakeMap = document.querySelector(".fake-map"); // Изображение с картой
		const mapHolderMob = document.querySelector(".map-holder-mob"); // Блок со встроенной картой для мобил
		const mapHolderPc = document.querySelector(".map-holder-pc"); // Блок со встроенной картой для ПК

		mapChange.addEventListener("click", function () {
			fakeMap.classList.add("hide");
			if (mapHolderMob) {
				mapHolderMob.classList.add("show-mob");
			}
			if (mapHolderPc) {
				mapHolderPc.classList.add("show-pc");
			}
		});
	}
	//Замена картинки карты на интерактивную версию (для планшета)
	//Сценарий события клик по оболочке (замена изображения на интерактив)
	if (document.querySelector(".map-overlay-tab")) {
		const mapChangeTab = document.querySelector(".map-overlay-tab"); // Оболочка
		const fakeMapTab = document.querySelector(".fake-map-tab"); // Изображение с картой
		const mapHolderTab = document.querySelector(".map-holder-tab"); // Блок со встроенной картой

		mapChangeTab.addEventListener("click", function () {
			fakeMapTab.classList.add("hide");
			mapHolderTab.classList.add("show-tab");
		});
	}
	// Параллакс картинки и подложки
	if (document.querySelector(".yacht__content")) {
		let prxScene = document.querySelector(".yacht__content"); // сцена
		let prxItem = document.querySelectorAll(".leda"); // блок с картинкой
		let prxItemBg = document.querySelectorAll(".sea"); // море
		let prxItemSky = document.querySelectorAll(".sky"); // небо

		prxScene.addEventListener("mousemove", function (e) {
			let x = e.clientX / window.innerWidth;
			let y = e.clientY / window.innerHeight;
			for (let item of prxItem) {
				item.style.transform = "translate(-" + x * 25 + "px, -" + y * 18 + "px)";
			}
			for (let item of prxItemBg) {
				item.style.transform = "translate(-" + x * 28 + "px, -" + y * 23 + "px)";
			}
			for (let item of prxItemSky) {
				item.style.transform = "translate(-" + x * 0 + "px, -" + y * 23 + "px)";
			}
		});
	}

	// Отключение зума иконки jivo
	// if (document.documentElement.clientWidth < 1200){ // Срабатывает только для устройст с экраном менее 1200px
	// 	function removeZoomOnLoad(){ // Функция, отвечающая за проверку и удаления атрибута 'style' при загрузке страницы
	// 		let jivoIco = document.querySelector('.__jivoMobileButton'); // Элемент, ответственный за zoom иконки jivo
	// 		if (jivoIco){
	// 			jivoIco.style.zoom = "0.8";
	// 			jivoIco.style.opacity = "0.7";
	// 		}
	// 	}

	// 	setTimeout(removeZoomOnLoad, 900); // Вызов ф-ии с отсрокой 0,9 сек

	// 	window.addEventListener('resize', function(){ // прослушка события по изменению размера экрана (на автоповорт экрана устройства)
	// 		let jivoIco = document.querySelector('.__jivoMobileButton'); // Элемент, ответственный за zoom иконки jivo
	// 		function removeZoomOnResize(){
	// 			if (jivoIco){
	// 				jivoIco.style.zoom = "0.8";
	// 				jivoIco.style.opacity = "0.7";
	// 			}
	// 		}
	// 		setTimeout(removeZoomOnResize, 200); // Вызов ф-ии с отсрокой 0,2 сек
	// 		setTimeout(removeZoomOnResize, 400); // Вызов ф-ии с отсрокой 0,4 сек (Страховка)
	// 		setTimeout(removeZoomOnResize, 1000); // Вызов ф-ии с отсрокой 1 сек (Страховка)
	// 	});
	// 	setTimeout(removeZoomOnLoad, 1000); // Вызов ф-ии с отсрокой 1 сек (Страховка)
	// 	setTimeout(removeZoomOnLoad, 1500); // Вызов ф-ии с отсрокой 1,5 сек (Страховка)
	// 	setTimeout(removeZoomOnLoad, 4000); // Вызов ф-ии с отсрокой 4 сек (Страховка)
	// 	setTimeout(removeZoomOnLoad, 7000); // Вызов ф-ии с отсрокой 7 сек (Страховка)
	// }

		//Модалка с акцией
		// window.onkeyup = modal; // нажатие Esc, см. условие "e.keyCode==27"
		// if(document.getElementById("popup")){
		// 	document.getElementById("popup").onclick = modal;
		
		// 	function modal(e) {
		// 		if (e.target.nodeName != "DIV" || e.keyCode == 27) {
		// 			// через && перечисляются теги, клинкув на которые окно не будет закрыто; сюда же можно включить тег A или IFRAME
		// 			document.getElementById("popup").style.display = "none";
		// 			localStorage.setItem("popup1", "none");
		// 		}
		// 	}
		// }
	// --------------- Логика работы формы обратной связи -----------------//
	if (document.querySelector(".contact-form") || document.querySelector(".reviews-page__form")){
	//Скрипт для fake-placeholder'а формы обратной связи
	const formItems = document.querySelectorAll(".form-input");

	for (let item of formItems) {
		const thisParent = item.closest(".form-item-row");
		const thisPlaceholder = thisParent.querySelector(".fake-placeholder");
		
		//Текстовое поле (input) в фокусе
		item.addEventListener("focus", function () {
			thisPlaceholder.classList.add("active-field");
		});
		//Текстовое поле теряет фокус
		item.addEventListener("blur", function () {
			if (item.value.length > 0) {
				thisPlaceholder.classList.add("active-field");
			} else {
				thisPlaceholder.classList.remove("active-field");
			}
		});
	}
	// Отображение счётчика символов ввода
	let textField = document.querySelector("#form-comment");
	let counterRow = document.querySelector(".contacts-form__char-counter");

	function counterRowToggle(){
		counterRow.classList.toggle("transp-count");
	}
	// Текстовое поле в фокусе
	if (textField) {
		textField.addEventListener("focus", function () {
			counterRowToggle();
			// counterRow.classList.remove("transp-count");
		});
		// Потеря фокуса
		textField.addEventListener("blur", function () {
			counterRowToggle();
			// counterRow.classList.add("transp-count");
		});
	}

	//Ограничение длины поля "Сообщение"
	let maxCount = 480;
	let counterSpan = document.querySelector("#form-char-counter");
	$(".contact-form textarea").keyup(function () {
		if (this.value.length > maxCount) {
			this.value = this.value.substr(0, maxCount);
			counterRow.style = "color:red; font-weight:700; font-size:16px";
		} else if (this.value.length < 450 && this.value.length > 400){
			counterRow.style = "color:orange; font-weight:700; font-size:14px";
		} else if (this.value.length < maxCount && this.value.length >= 450){
			counterRow.style = "color:red; font-weight:700; font-size:14px"; 
		} else if (this.value.length == maxCount) {
			counterRow.style = "color:red; font-weight:700; font-size:16px";
		} else if (this.value.length < maxCount) {
			if (counterRow.hasAttribute("style")) {
				counterRow.removeAttribute("style");
			}
		}
	});
	//Счетчик оставшихся для вода символов (Сообщение)
	$("#form-char-counter").html(maxCount);
	$("#form-comment").keyup(function () {
		let revText = this.value.length;
		if (this.value.length > maxCount) {
			this.value = this.value.substr(0, maxCount);
		}
		let cnt = maxCount - revText;
		if (cnt <= 0) {
			$("#form-char-counter").html("0");
		} else {
			$("#form-char-counter").html(cnt);
		}
	});

	//Проверка на роботов
	let formBlock = document.querySelector(".contact-form"); // форма обратной связи
	let formAllFakePlaceholders = document.querySelectorAll(".contact-form .fake-placeholder"); // все фейковые placeholders
	let callFormPolicy = document.querySelector(".form-checkbox"); // чекбокс политики конфиденциальности

	let botTestRow = document.querySelector("#form-bot-row"); // ячейка с вопросами проверки на ботов
	let fakeBotPlaceholder1 = document.querySelector("#form-bot-placeholder-1"); // Фейковый placeholder контрольного вопроса №1
	let botQuestion1Row = document.querySelector("#question-1-row"); // ячейка 1-го вопроса
	let controlQuestion1 = document.querySelector("#form-bot-question-1"); // input контрольного вопроса №1
	let questionInp1 = document.querySelector("#question-inp-1"); // span в который будет вставлен вопрос №1
	let fakeBotPlaceholder2 = document.querySelector("#form-bot-placeholder-2"); // Фейковый placeholder контрольного вопроса №2
	let botQuestion2Row = document.querySelector("#question-2-row"); // ячейка 2-го вопроса
	let controlQuestion2 = document.querySelector("#form-bot-question-2"); // input контрольного вопроса №2
	let questionInp2 = document.querySelector("#question-inp-2"); // span в который будет вставлен вопрос №2
	let questionToInp2 = `России?`;

	let submitBtn = document.querySelector("#submit-btn"); // кнопка отправки заявки
	let resetBtn = document.querySelector("#reset-btn"); // кнопка очистки формы
	//Для контрольного вопроса №1 (математика)
	let x, y, res;

	//Функция генерации случайных чисел для контрольного вопроса №1 (математика)
	function randomInt() {
		x = Math.round(Math.random() * 10); //Math.round() округляет до ближайшего целого числа
		y = Math.round(Math.random() * 10);
		res = x + y;
		return res;
	}

	// Спрятать блок с контрольными вопросами
	function botTestHide() {
		botTestRow.classList.add("hidden");
		botQuestion1Row.classList.add("hidden");
		botQuestion2Row.classList.add("hidden");
	}

	//Деактивация кнопки отправки формы
	function submitBtnDis(){
		submitBtn.disabled = true;
	}

	//Активация кнопки отправки формы
	function submitBtnEnab(){
		submitBtn.disabled = false;
	}
	// При принятии политики отображается контрольный вопрос №1
	if (callFormPolicy) {
		callFormPolicy.addEventListener("change", function (e) {
			if (e.target.checked == true) {
				randomInt();
				//вставка контрольного вопроса №1 внутрь фейкового placeholder №1
				questionInp1.innerText = `${x} + ${y}?`;
				botTestRow.classList.remove("hidden"); //toggle
				botQuestion1Row.classList.remove("hidden"); //toggle 1
				this.disabled = true;
				// Проверка ответа на конрольный вопрос №1
				controlQuestion1.addEventListener("input", function (e) {
					let inputValue1 = parseInt(e.target.value); // запись в переменную введенного ответа на вопрос с приведением типа к числу
					if (inputValue1 === res) {
						submitBtnDis();
						botQuestion1Row.classList.add("hidden"); //toggle 1
						botQuestion2Row.classList.remove("hidden"); //toggle 2
						fakeBotPlaceholder1.classList.remove("active-field");
						controlQuestion1.blur();
						controlQuestion2.focus();
						callFormPolicy.disabled = true;
					} else {
						submitBtnDis();
						return;
					}
				});
			} else {
				botTestHide();
			}
		});
	}

	// Формирование Контрольного вопроса №2
	if (questionInp2) {
		questionInp2.innerText = questionToInp2;
	}

	// Проверка ответа на контрольный вопрос №2
	if (controlQuestion2) {
		controlQuestion2.addEventListener("input", function (e) {
			let inputValue2 = e.target.value.toLowerCase();
			if (inputValue2 === "москва") {
				submitBtnEnab();
				botTestRow.classList.add("hidden"); // toggle
				formBlock.setAttribute("method", "POST"); // Добавление метода отправки данных формы
				formBlock.setAttribute("action", "./php/mail.php"); // Добавление обработчика формы
				botQuestion2Row.classList.add("hidden"); //toggle2
				fakeBotPlaceholder2.classList.remove("active-field");
				controlQuestion2.blur();
			} else {
				submitBtnDis();
			}
		});
	}

	// Запрет ввода других символов,в т.ч. пробелов, кроме цифр в input контрольного вопроса №1
	if (controlQuestion1) {
		controlQuestion1.addEventListener("input", cleanInpDigit);
	}

	// Функция отсеивающая запретные символы и пробелы
	function cleanInpDigit() {
		this.value = this.value.replace(/[^+0-9]/g, "");
	}

	// Запрет ввода других символов,в т.ч. пробелов, кроме кириллицы в input контрольного вопроса №2
	if (controlQuestion2) {
		controlQuestion2.addEventListener("input", cleanControlQuestionChar);
	}

	// Функция отсеивающая запретные символы и пробелы
	function cleanControlQuestionChar() {
		this.value = this.value.replace(/[^А-Яа-я-]/g, "");
	}

	// Очистка формы по клику на кнопку "Очистить"
	function hideValidationErrLabels(){ // Функция сбора всех меток ваидации контактной формы с последующим их скрытием
		let validationErrLabels = document.querySelectorAll('.contact-form label.error');
		validationErrLabels.forEach(function(item){
			item.style = "display:none";
		});
	}
	if (resetBtn) {
		resetBtn.addEventListener("click", function () {
			callFormPolicy.disabled = false;
			submitBtnEnab();
			formAllFakePlaceholders.forEach(function (item) {
				item.classList.remove("active-field");
			});
			botTestHide();
			counterRow.removeAttribute("style");
			counterSpan.innerText = maxCount;
			formBlock.removeAttribute("method", "POST"); // Удаление метода отправки данных формы
			formBlock.removeAttribute("action", "./php/mail.php"); // Удаление обработчика формы
			this.blur();
			hideValidationErrLabels();
		});
	}
	//Валидация формы обратной связи
	if($(".contact-form")){
		$(".contact-form").validate({
			rules: {
				userName: {
					required: true,
					minlength: 2,
				},
				email: {
					required: true,
					email: true,
				},
				subject: {
					required: false,
				},
				message: {
					required: true,
				},
				checkbox: {
					required: true,
				},
				botQuestion1: {
					required: true,
					minlength: 1,
					maxlength: 2,
				},
				botQuestion2: {
					required: true,
					minlength: 1,
					maxlength: 6,
				},
			},
			messages: {
				userName: {
					required: "А как к Вам обращаться?!",
					minlength: "Ошибка ввода!",
				},
				email: {
					required: "Обязательно укажите Ваш email!",
					email: "Введен некорректный адрес электронной почты!",
				},
				subject: {
					required: "Тема сообщения не указана!",
				},
				message: {
					required: "А где, собственно, текст Вашего сообщения?!",
				},
				checkbox: {
					required:
						"Чтобы отправить сообщение, нужно принять политику конфиденциальности!",
				},
				botQuestion1: {
					required: "Обязательное поле!",
					minlength: "Ошибка ввода!",
					maxlength: "Ошибка ввода!",
				},
				botQuestion2: {
					required: "Обязательное поле!",
					minlength: "Ошибка ввода!",
					maxlength: "Ошибка ввода!",
				},
			},
			submitHandler: function (form) {
				ajaxFormSubmit();
			},
		});
	}
	//Отправка данных формы обратной связи
	// Функция AJAX запрса на сервер

		function ajaxFormSubmit() {
			let string = $(".contact-form").serialize(); // Сохраняем данные введенные в форму в строку.

			//Формируем ajax запрос
			$.ajax({
				type: "POST", // Тип запроса - POST
				url: "php/mail.php", // Куда отправляем запрос
				data: string, // Какие даные отправляем, в данном случае отправляем переменную string

				// Функция если все прошло успешно
				success: function (html) {
					$(".contact-form").slideUp(800);
					$("#answer").html(html);
				},
			});
			// Чтобы по Submit больше ничего не выполнялось - делаем возврат false чтобы прервать цепочку срабатывания остальных функций
			return false;
		}
	}
	// --------------- /Логика работы формы обратной связи -----------------//
});
	// Видеофон
	if (document.querySelector(".video-bg")) {
		if (document.documentElement.clientWidth >= 1183){
			$(window).on("load", function () {
				$(".video-bg").vide("./video/cover", {
					bgColor: "#5F9EA0",
				});
			});
		}
	}
