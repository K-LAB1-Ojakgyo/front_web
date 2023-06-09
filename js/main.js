var badges = ["res/dummy/badge1.png","res/dummy/badge2.png", "res/dummy/badge3.png"]; // 더미데이터
var quests = ["res/dummy/book1.png","res/dummy/book2.png", "res/dummy/book3.png"]; // 더미데이터
var cur_book;
var nowChallenge

var user;
var userInfo;

  $(document).ready(function() {
    user=localStorage.getItem("user");  
    userInfo=JSON.parse(localStorage.getItem("userInfo"));
    history.pushState(null, null, location.href);
    $(window).on('popstate', function() {
      history.go(1);
    });
   
    init();
    quizBtnClicked();
    moreBtnClicked();
    chooseBookBtnClicked();
    logoutBtnClicked();

    autoLogout();
});

async function init() {
  console.log(userInfo);
  badges = await getBadges(userInfo);
  quests = await getQuests(userInfo);
  console.log(userInfo);
  cur_book = await getBook(userInfo.current_book);
  nowChallenge = await getRealUrl(cur_book.head_image);

  showBadges();
  showQuests();
  showChallenge();
  showBookTitle();
}


// window.onpopstate = function(event) {
//     alert("show");
//     history.go(1);
// }

function showBadges() {
    /**
     * util의 getRecentBadges를 활용하여 정보를 받아와서
     * 화면에 띄워줌
     */
    
    //var badges = ["res/dummy/badge1.png","res/dummy/badge2.png", "res/dummy/badge3.png"]; // 더미데이터
    $("#badgeBack1").attr("src", badges[0]);
    $("#badgeBack2").attr("src", badges[1]);
    $("#badgeBack3").attr("src", badges[2]);
    
}

function showQuests() {
    /**
     * util의 getRecentQuests를 활용하여 정보를 받아와서
     * 화면에 띄워줌
     */
    // var quests = ["res/dummy/book1.png","res/dummy/book2.png", "res/dummy/book3.png"]; // 더미데이터
    $("#bookBack1").attr("src", quests[0]);
    $("#bookBack2").attr("src", quests[1]);
    $("#bookBack3").attr("src", quests[2]);
}

function showChallenge() {
    /**
     * util의 getNowchallenge를 활용하여 정보를 받아와서
     * 화면에 띄워줌
     */
    $("#challengeBack").attr("src", nowChallenge);
}

function showBookTitle() {
    /**
     * 
     */
    $("#bookTitleMain").text(cur_book.title);
}

function quizBtnClicked() {
    // 퀴즈 화면으로 이동
    $('#quizBtn').click(function(){
		window.location.href = "quiz.html";
    });
}

function moreBtnClicked() {
    // 배지 화면으로 이동
    $('#moreBtn').click(function(){
		window.location.href = "badge.html";
    });
}

function chooseBookBtnClicked() {
    // 책 선택 화면으로 이동
    $('#refreshBtn').click(function(){
		window.location.href = "book_choice.html";
    });
}

function logoutBtnClicked() {
    //showLogoutDialog(); // util에 있음
}