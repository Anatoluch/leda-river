    //Появление прилипающего мобильного меню сверху страницы
    $(document).ready(function(){
      $(window).scroll(function(){
        if($(window).scrollTop()>75){
          $('#nav-wrapper').fadeIn();
        }else{
          $('#nav-wrapper').fadeOut();
        }
      });
    });