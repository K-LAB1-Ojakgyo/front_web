
function btnMoveClicked() {
    login_front(); // util.js 에서 작업 요망
    
}

var click_trigger = function() {
  $('.page').trigger('click');
  console.log("click");
}

  $(document).ready(function() {

    history.pushState(null, null, location.href);
    $(window).on('popstate', function() {
      history.go(1);
    });
    setTimeout(click_trigger, 100);
   


    $("#start_login_btn").click(function(){btnMoveClicked()});
  });
 