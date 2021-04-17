$(document).ready(function(){
  
   //Прилипающее мобильное меню
  $(window).scroll(function(){
    if($(window).scrollTop()>75){
      $('#nav-wrapper').fadeIn();
    }else{
      $('#nav-wrapper').fadeOut();
    }
  });

  //Логика кнопки "добавить аватар"
  $('.review-avatar').change(function() {
    if ($(this).val() != '') $(this).closest('.file-row').children('.upload-label').text('Файл выбран!');
    else $(this).closest('.file-row').children('.upload-label').text('Выберите файл');
});
   //Ограничение длины отзыва
   $("textarea").keyup(function() {
      if (this.value.length > 360)
         this.value = this.value.substr(0, 360);
   });
   //Счетчик оставшихся для вода символов (отзыв)
   var maxCount = 360;

    $("#counter").html(maxCount);

    $("#review-text").keyup(function() {
    var revText = this.value.length;

        if (this.value.length > maxCount)
            {
            this.value = this.value.substr(0, maxCount);
            }
        var cnt = (maxCount - revText);
        if(cnt <= 0){$("#counter").html('0');}
        else {$("#counter").html(cnt);}

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
         review: {
            required: true
         },
         reviewsCheckbox: {
            required: true
         }
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
         }
      },
      submitHandler: function (form) {
         ajaxFormSubmit();
      }
   });
      //Отправка данных формы добавления отзыва
   	// Функция AJAX запрса на сервер

     function ajaxFormSubmit() {

      let string = $(".reviews-page__form").serialize(); // Сохраняем данные введенные в форму в строку.

      //Формируем ajax запрос
      $.ajax({
         type: "POST", // Тип запроса - POST
         url: "php/reviews.php", // Куда отправляем запрос
         data: string, // Какие даные отправляем, в данном случае отправляем переменную string

         // Функция если все прошло успешно
         success: function (html) {
            $(".reviews-page__form").slideUp(800);
            $('#review-answer').html(html);
         }
      });
      // Чтобы по Submit больше ничего не выполнялось - делаем возврат false чтобы прервать цепочку срабатывания остальных функций
      return false;
   };
});