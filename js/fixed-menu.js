//Появление прилипающего сверху страницы
$(document).ready(function () {
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
});
