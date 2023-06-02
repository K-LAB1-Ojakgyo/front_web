$(document).ready(function() {

    $('.page').trigger('click');    
    history.pushState(null, null, location.href);
  $(window).on('popstate', function() {
    history.go(1);
  });

   
  });