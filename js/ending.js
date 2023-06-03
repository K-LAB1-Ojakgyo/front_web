$(document).ready(function() {

    history.pushState(null, null, location.href);
  $(window).on('popstate', function() {
    history.go(1);
  });
  });


  function finish_logout() {
    logout();
  }