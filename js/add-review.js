$(document).ready(function(){

	if(!window.FormData) {
		alert(`Браузер не поддерживает загрузку файлов на этом сайте!\nВы не сможете прикрепить аватарку к отзыву!`);
	}
  //Логика кнопки "добавить аватар"
  $('.review-avatar').change(function() {
    if ($(this).val() != '') {
			$(this).closest('.file-row').children('.upload-label').text('Файл выбран!');
			$('.upload-label').blur();
			$('.upload-label').addClass("chosen");
		} else {
			$(this).closest('.file-row').children('.upload-label').text('Выбрать файл');
			$('.upload-label').blur();
			$('.upload-label').removeClass("chosen");
		}
	});
	//Ограничение длины отзыва
	let maxCount = 480; //Счетчик оставшихся для вода символов (отзыв)
	let revCounterSpan = document.querySelector('#counter');
	let counterRow = document.querySelector('.counter'); // строка счетчика оставшихся символов
	$("textarea").keyup(function() {
		if (this.value.length > maxCount){
			this.value = this.value.substr(0, maxCount);
			counterRow = "color:red; font-weight:700; font-size:16px";
		} else if (this.value.length < maxCount && this.value.length > 420){
			counterRow.style = "color:orange; font-weight:500; font-size:16px";
		} else if (this.value.length == maxCount){
			counterRow.style = "color:red; font-weight:700; font-size:16px";
		} else if (this.value.length < maxCount) {
			counterRow.removeAttribute("style");
		}
	});

    $("#counter").html(maxCount);

    $("#review-Text").keyup(function() {
    var revText = this.value.length;

        if (this.value.length > maxCount)
            {
            this.value = this.value.substr(0, maxCount);
            }
        var cnt = (maxCount - revText);
        if(cnt <= 0){$("#counter").html('0');}
        else {$("#counter").html(cnt);}
    }); 

   	//Проверка на роботов
      let revFormBlock = document.querySelector('.reviews-page__form'); // форма обратной связи
      let formAllFakePlaceholders = document.querySelectorAll('.reviews-page__form .fake-placeholder'); // все фейковые placeholders
      let revFormPolicy = document.querySelector('.review-form-checkbox'); // чекбокс политики конфиденциальности
      let botTestRow = document.querySelector('#review-bot-row'); // ячейка с вопросами проверки на ботов
      let botQuestion1Row = document.querySelector('#review-question-1-row'); // ячейка 1-го вопроса
      let botQuestion2Row = document.querySelector('#review-question-2-row'); // ячейка 2-го вопроса
      let submitBtn = document.querySelector("#submit-rev-btn"); // кнопка отправки заявки
      let resetBtn = document.querySelector("#reset-rev-btn"); // кнопка очистки формы
      let fakeBotPlaceholder1 = document.querySelector('#review-bot-placeholder-1'); // Фейковый placeholder контрольного вопроса №1
      let fakeBotPlaceholder2 = document.querySelector('#review-bot-placeholder-2'); // Фейковый placeholder контрольного вопроса №2
      let questionInp1 = document.querySelector('#review-question-inp-1'); // span в который будет вставлен вопрос №1
      let questionInp2 = document.querySelector('#review-question-inp-2'); // span в который будет вставлен вопрос №2
      let controlQuestion1 = document.querySelector('#review-bot-question-1'); // input контрольного вопроса №1
      let controlQuestion2 = document.querySelector('#review-bot-question-2'); // input контрольного вопроса №2
      let questionToInp2 = `России?`;
      //Для контрольного вопроса №1 (математика)
      let x, y, res;

	//Функция генерации случайных чисел для контрольного вопроса №1 (математика)
	function randomInt(){
		x = Math.round(Math.random() * 10); //Math.round() округляет до ближайшего целого числа
		y = Math.round(Math.random() * 10);
		res = x + y;
		return res;
	}
   // При принятии политики отображается контрольный вопрос №1
	revFormPolicy.addEventListener('change', function(e){
		if (e.target.checked == true) {
			randomInt();
			//вставка контрольного вопроса №1 внутрь фейкового placeholder №1
			questionInp1.innerText = `${x} + ${y}?`;
			botTestRow.classList.remove('hidden');
			botQuestion1Row.classList.remove('hidden');
			this.disabled = true;
			// Проверка ответа на конрольный вопрос №1
			controlQuestion1.addEventListener('input', function(e){
				let inputValue1 = parseInt(e.target.value); // запись в переменную введенного ответа на вопрос с приведением типа к числу
				if (inputValue1 === res) {
					submitBtn.disabled = false;
					botQuestion1Row.classList.add('hidden');
					botQuestion2Row.classList.remove('hidden');
					fakeBotPlaceholder1.classList.remove("active-field");
					controlQuestion1.blur();
					controlQuestion2.focus();
					revFormPolicy.disabled = true;
				} else {
					submitBtn.disabled = true;
					return;
				}
			});
		} else {
			botTestRow.classList.add('hidden');
			botQuestion1Row.classList.add('hidden');
			botQuestion2Row.classList.add('hidden');
		}
	});

   // Формирование Контрольного вопроса №2
	questionInp2.innerText = questionToInp2;

	// Проверка ответа на контрольный вопрос №2
	controlQuestion2.addEventListener('input', function(e){
		let inputValue2 = e.target.value.toLowerCase();
		if (inputValue2 === 'москва'){
			submitBtn.disabled = false;
			botTestRow.classList.add('hidden');
			revFormBlock.setAttribute('method', 'POST'); // Добавление метода отправки данных формы
			revFormBlock.setAttribute('action', './php/reviews.php'); // Добавление обработчика формы
			botQuestion2Row.classList.add('hidden');
			fakeBotPlaceholder2.classList.remove("active-field");
			controlQuestion2.blur();
		} else {
			submitBtn.disabled = true;
		}
	});
	// Запрет ввода других символов,в т.ч. пробелов, кроме цифр в input контрольного вопроса №1
	controlQuestion1.addEventListener("input", cleanInpDigit);

	// Функция отсеивающая запретные символы и пробелы
	function cleanInpDigit() {
		this.value = this.value.replace(/[^+0-9]/g, "");
	};

	// Запрет ввода других символов,в т.ч. пробелов, кроме кириллицы в input контрольного вопроса №2
	controlQuestion2.addEventListener("input", cleanControlQuestionChar);

	// Функция отсеивающая запретные символы и пробелы
	function cleanControlQuestionChar() {
		this.value = this.value.replace(/[^А-Яа-я-]/g, "");
	};

	// Проверка размера и типа загружаемого файла 
	let fileInp = document.querySelector("#avatar-file"); // кнопка выбора файла
	
	fileInp.addEventListener('input', function(){
		let file = document.getElementById("avatar-file").files[0];
		if(file.size > 1024*1024) {
			alert("Файл слишком большой! Размер файла не должен превышать 1 МБ!\nПопробуйте выбрать другой файл.");
			fileInp.value = ''; // очистка выбранного файла
			return;
		} else if ((file.type !== "image/jpeg") && (file.type !== "image/png") && (file.type !== "image/gif")){
			alert ("Данный тип файла загрузить нельзя!");
			fileInp.value = ''; // очистка выбранного файла
			return;
		}
	});

		// Очистка формы по клику на кнопку "Очистить"
		function hideValidationErrLabels(){ // Функция сбора всех меток ваидации контактной формы с последующим их скрытием
			let validationErrLabels = document.querySelectorAll('.reviews-page__form label.error');
			validationErrLabels.forEach(function(item){
				item.style = "display:none";
			});
		}
		resetBtn.addEventListener('click', function(){
			revFormPolicy.disabled = false;
			formAllFakePlaceholders.forEach(function(item){
				item.classList.remove("active-field");
			});
			botTestRow.classList.add('hidden');
			botQuestion1Row.classList.add('hidden');
			botQuestion2Row.classList.add('hidden');
			counterRow.removeAttribute("style");
			revCounterSpan.innerText = maxCount;
			fileInp.value = ''; // очистка выбранного файла
			$('.upload-label').text('Выбрать файл');
			$('.upload-label').blur();
			$('.upload-label').removeClass("chosen"); // Удаление класса chosen у кнопки выбора файла
			revFormBlock.removeAttribute('method', 'POST'); // Удаление метода отправки данных формы
			revFormBlock.removeAttribute('action', './php/reviews.php'); // Удаление обработчика формы
			this.blur();
			hideValidationErrLabels();
		});

   //Валидация формы добавления отзыва
		$('.reviews-page__form').validate({
      rules: {
        reviewsUserName: {
            required: true
				},
				reviewsEmail: {
					required: true,
					email: true
				},
				reviewText: {
					required: true
				},
				reviewsCheckbox: {
					required: true
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
        reviewsUserName: {
            required: 'А как к Вам обращаться?!'
				},
				reviewsEmail: {
					required: 'Обязательно укажите Ваш email!',
					email: 'Введен некорректный адрес электронной почты!'
				},
				review: {
					required: 'А где, собственно, сам отзыв?!'
				},
				reviewsCheckbox: {
					required: 'Чтобы добавить отзыв, нужно принять политику конфиденциальности!'
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
				let sendForm = document.forms.sendForm,
				formData = new FormData(sendForm),
				xhr = new XMLHttpRequest();

			xhr.open("POST", "php/send.php");
			
			xhr.onreadystatechange = function() {
				if (xhr.readyState == 4) {
					if(xhr.status == 200) {
						$(".reviews-page__form").slideUp(800);
						showSuccess();
					}
				}
			};
			xhr.send(formData);
			return false;
      }
	});

	function showSuccess() {
		$("#review-answer").html(`<div class='contact-form__success'>
			<h2>Ваш отзыв принят!<br>
			Он будет&nbsp;опубликован после&nbsp;прохождения модерации!
			</h2>
			</div>`);
	}

      //Отправка данных формы добавления отзыва
   	// Функция AJAX запрса на сервер

  //    function ajaxFormSubmit() {

  //     let string = $(".reviews-page__form").serialize(); // Сохраняем данные введенные в форму в строку.

  //     //Формируем ajax запрос
  //     $.ajax({
  //        type: "POST", // Тип запроса - POST
  //        url: "php/reviews.php", // Куда отправляем запрос
  //        data: string, // Какие даные отправляем, в данном случае отправляем переменную string

  //        // Функция если все прошло успешно
  //        success: function (html) {
  //           $(".reviews-page__form").slideUp(800);
  //           $('#review-answer').html(html);
  //        }
  //     });
  //     // Чтобы по Submit больше ничего не выполнялось - делаем возврат false чтобы прервать цепочку срабатывания остальных функций
  //     return false;
  //  };
});