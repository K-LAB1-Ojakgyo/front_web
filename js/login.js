
function btnMoveClicked() {
    login_front(); // util.js 에서 작업 요망
}


  $(document).ready(function() {

    history.pushState(null, null, location.href);
    $(window).on('popstate', function() {
      history.go(1);
    });
   


    $("#start_login_btn").click(function(){btnMoveClicked()});
  });
 