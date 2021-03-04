$(document).ready(function () {
//"Гамбургер-меню"
const toggleMenu = document.querySelector('.toggle-menu');//Иконка меню "Гамбургер"
const mobMenu = document.querySelector('.mobile-menu');// Плашка под мобильное меню
const overlay = document.querySelector('#overlay');// overlay
const bodyEl = document.body;

//Сценарий события клик по "гамбургеру" (появление/исчезание моб. меню, оверлея)
toggleMenu.addEventListener('click', function(){
   this.classList.toggle('active');
   mobMenu.classList.toggle('active');
   overlay.classList.toggle('active');
   bodyEl.classList.toggle('noscroll');
});
//Сценарий события клик по любому элементу (ссылке, иконке и т.д) моб. меню (но не по "гамбургеру")
mobMenu.addEventListener('click', function(){
   this.classList.remove('active');
   toggleMenu.classList.remove('active');
   overlay.classList.remove('active');
   bodyEl.classList.remove('noscroll');
});
//Сценарий события клик по оверлею
overlay.addEventListener('click', function(){
   this.classList.remove('active');
   toggleMenu.classList.remove('active');
   mobMenu.classList.remove('active');
   bodyEl.classList.remove('noscroll');
});
// Скрыть часть фото на мобильных устройствах \
const galleryLink = document.querySelector('.gallery-link');//Ссылка показать/скрыть
const photo = document.querySelectorAll('.hide-photo');//фотокарточка
const link1 = document.querySelector('.link-1');// ссылка "показать все"
const link2 = document.querySelector('.link-2');// ссылка "скрыть"

if(galleryLink){
   galleryLink.addEventListener('click', function(){
      for(var i = 0; i < photo.length; i++) {
         photo[i].classList.toggle('photo');
      }
      link1.classList.toggle('link-1-hide');
      link2.classList.toggle('link-2-show');
   })
   }
   });
