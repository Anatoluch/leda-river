$(document).ready(function () {
	//Плагин owlCarusel (Отзывы)
	$(".owl-carousel").owlCarousel({
		items: 1,
		nav: true,
		navSpeed: 1000,
		autoplaySpeed: 1200,
		dots: false,
		navText: ["", ""],
		loop: true,
		autoplay: true,
		margin: 45,
		autoplayTimeout: 8000,
		autoplayHoverPause: true,
	});
});
