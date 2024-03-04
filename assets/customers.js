


$(document).on('click', '#forgot-password', function() {
  $('.login-area').fadeOut(300);
  setTimeout(() => {
    $('.pass-area').fadeIn(300);
    $('.pass-area').css("display", "flex");
  }, 300);
}).on('click', '#return-login', function() {
  $('.pass-area').fadeOut(300);
  setTimeout(() => {
    $('.login-area').fadeIn(300);
    $('.login-area').css("display", "flex");
  }, 300);
});

// ************ */
