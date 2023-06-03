function showBadges(bookcnt,imgPath) {
    /**서버에서 받아올 정보들 임시로 할당해둠 */
    var bookcnt=13;

    var imgPath=["./res/badge/badge_bird.svg","./res/badge/badge_elephant.svg","./res/badge/badge_owl.svg","./res/badge/badge_rabbit.svg"];//getBadges()
    var newImgPath=["./res/badge/badge_rabbit.svg"];    //getRecentBadges()
    /**
     * util의 getBadges를 활용하여
     * 배지 창을 보여줘야 함
     */
    var img;
    var badgeImgProperty={
        width: '3cm',
        height: '3cm',
        margin: '13px'
        
    };

    var newBadgeImgProperty={
        width: '9cm',
        height: '9cm',
        margin: '0 20px 70px 0'
    };
    var hiddenImg = (bookcnt%3)==0? 0:3-bookcnt%3;
    imgPath.forEach(function(element,idx){

        img = $('<img>')
        .attr('src',element)
        .attr("id","btn_move")
        .css(badgeImgProperty);
        $('#collection').append(img);
        bookcnt--;
    });
    
    for(var i=0;i<bookcnt+hiddenImg;i++){
       if(i<bookcnt){
        img=$('<img>').attr('src',"./res/Result_img/nullBadge.png").css(badgeImgProperty);
       
       }else{
        img=$('<img>').attr('src',"./res/logout.png")
        .css("visibility", "hidden")
        .css(badgeImgProperty)
       }
       $('#collection').append(img);
    }

    img=$('<img>')
    .attr('src',newImgPath)
    .attr('id',"newbadge_move")
    .css(newBadgeImgProperty);
    $('#new_badge_zone').append(img);
   
    var div = $('<div>')
    .attr('id',"newdiv")
    .text("nieuw!")   // new!
    $('#new_badge_zone').append(div);
}

function nextBtnClicked() {
    // 책 고르는 화면으로 이동
     /**서버에서 남은 책 정보 받아오기 */
     var bookcnt=0;

     if(bookcnt==0){
        window.location.href = "ending.html"
     }else{
        window.location.href = "book_choice.html";
     }
}

function logoutBtnClicked() {
    showLogoutDialog(); // util에 있음
}

$(document).ready(function() {
    user=localStorage.getItem("user");  
    userInfo=localStorage.getItem("userInfo");

    history.pushState(null, null, location.href);
  $(window).on('popstate', function() {
    history.go(1);
  });

    // 페이지 로드 완료 시 실행될 코드
    $("#result_next_btn").click(function(){
        nextBtnClicked();
    })
    $("#collection").attr("class","scroll_container");
   
    showBadges(); // result 함수 호출

    autoLogout();
  });
