$(document).ready(function(){
  //Плагин owlCarusel (Отзывы)
  $(".owl-carousel").owlCarousel({
    items: 1,
    nav: true,
    navSpeed: 500,
    dots: false,
    navText: ["", ""],
    loop: true,
    autoplay: true,
    autoplayTimeout: 8000,
    autoplayHoverPause: true,
  });
});