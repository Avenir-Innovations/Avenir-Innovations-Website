$('.mobile-nav-toggle').click(function() {
  $('.mobile-nav-toggle').toggleClass('fa-bars');
  $('.mobile-nav-toggle').toggleClass('fa-times');
  if ($('#navbar').hasClass('toggle-time')) {
    $('#navbar').addClass('navbar-mobile');
    window.setTimeout(add_open, 500); // 0.5 seconds
    $('#navbar').removeClass('toggle-time');
    $('#navbar').addClass('toggle-end');
  } else if ($('#navbar').hasClass('toggle-end')) {
    $('#navbar').removeClass('open');
    window.setTimeout(remove_mobile, 500); // 0.5 seconds
    $('#navbar').removeClass('toggle-end');
    $('#navbar').addClass('toggle-time');
  }
});

function add_open(){
  $('#navbar').addClass('open');
};
function remove_mobile(){
  $('#navbar').removeClass('navbar-mobile');
};
