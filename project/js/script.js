//- Initialize Nicescroll 
$(function () {
  $("body").niceScroll({
    cursorcolor: "#5669e4",
    cursorwidth: "50px",
    cursorborder: "none",
    cursorborderradius: "none",
    zindex: "999"
  });
});

//- links add class active

$('.navbar-nav li').click(function () {
  $(this).addClass('active').siblings().removeClass('active');
});

//- Smooth Scroll To Div

$('.navbar-nav li a').click(function () {
  $('html, body').animate({
    scrollTop: $('#' + $(this).data('value')).offset().top
  }, 1000);
});

//- fit text plugin
jQuery("#responsive_headline").fitText(1, { minFontSize: '10px', maxFontSize: '40px' });
jQuery("#responsive_headline2").fitText(1.4, { minFontSize: '10px', maxFontSize: '40px' });
jQuery("#responsive_headline3").fitText(1.4, { minFontSize: '10px', maxFontSize: '40px' });

//- isotope plugin(fliter) 
$(document).ready(function () {
  let $btns = $('section.portfoio .button-group button');
  $btns.click(function (e) {
    $('section.portfoio .button-group button').removeClass('active');
    e.target.classList.add('active');
    let selector = $(e.target).attr('data-filter');
    $('section.portfoio .grid').isotope({
      filter: selector
    });
    return false;
  });
  //- magnific-popup
  $('section.portfoio .grid .our-project .img .test-popup-link').magnificPopup({
    type: 'image',
    gallery: { enabled: true }
  });
//- owl-carsoul
$('section.customer .carousel .owl-carousel').owlCarousel({
  loop: true,
  autoplay: true,
  dots: true,
  responsive: {
    0:{
      items:1
    },
    544:{
      items:2
    }
  }
});
});
