function showBadges(bookcnt,imgPath) {
    /**서버에서 받아올 정보들 임시로 할당해둠 */
    var bookcnt=14;
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
        margin: '0 0 110px 0'
    };
    imgPath.forEach(function(element,idx){

        img = $('<img>')
        .attr('src',element)
        .attr('id',"btn_move")
        .css(badgeImgProperty);
        $('#collection').append(img);
        bookcnt--;
    });
    for(var i=0;i<bookcnt;i++){
        img=$('<img>').attr('src',"./res/Result_img/nullBadge.png").css(badgeImgProperty);
      
        $('#collection').append(img);
    }
    img=$('<img>').attr('src',newImgPath).attr('class',"btnshake").css(newBadgeImgProperty);
    $('#new_badge_zone').append(img);
}

function nextBtnClicked() {
    // 책 고르는 화면으로 이동
     /**서버에서 남은 책 정보 받아오기 */
     var bookcnt=5;
     window.location.href = "book_choice.html";
    //  if(bookcnt==0){

    //  }else if(bookcnt>=4){

    //  }else{

    //  }
}

function logoutBtnClicked() {
    showLogoutDialog(); // util에 있음
}

$(document).ready(function() {
    // 페이지 로드 완료 시 실행될 코드
    $("#result_next_btn").click(function(){
        nextBtnClicked();
    })
    $("#collection").css("overflow-y", "scroll");
  $("")
   
    showBadges(); // result 함수 호출

    autoLogout();
  });
