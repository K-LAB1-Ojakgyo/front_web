$(document).ready(function(){
    // test for url parameter
    var urlParams = new URLSearchParams(window.location.search);
    userId = urlParams.get('user_id');
    console.log(userId);

    showBadges();
    showQuests();
    showChallenge();
    showBookTitle();
    quizBtnClicked();
    moreBtnClicked();
    chooseBookBtnClicked();
    logoutBtnClicked();

    autoLogout();
});

// url parameter 관련 전역변수: 차선책
var userId;

function showBadges() {
    /**
     * util의 getRecentBadges를 활용하여 정보를 받아와서
     * 화면에 띄워줌
     */
    var badges = ["res/dummy/badge1.png","res/dummy/badge2.png", "res/dummy/badge3.png"]; // 더미데이터
    $("#badgeBack1").attr("src", badges[0]);
    $("#badgeBack2").attr("src", badges[1]);
    $("#badgeBack3").attr("src", badges[2]);
    
}

function showQuests() {
    /**
     * util의 getRecentQuests를 활용하여 정보를 받아와서
     * 화면에 띄워줌
     */
    var quests = ["res/dummy/book1.png","res/dummy/book2.png", "res/dummy/book3.png"]; // 더미데이터
    $("#bookBack1").attr("src", quests[0]);
    $("#bookBack2").attr("src", quests[1]);
    $("#bookBack3").attr("src", quests[2]);
}

async function showChallenge() {
    /**
     * util의 getNowchallenge를 활용하여 정보를 받아와서
     * 화면에 띄워줌
     */
    var fakeUrl = await getNowChallenge();
    console.log(fakeUrl);
    var nowChallenge = await getRealUrl(fakeUrl); // url parameter 방식 사용할 경우, 해당 함수에서 인자로 user id 보내줘야 함
    //var nowChallenge = "res/dummy/book1.png";
    $("#challengeBack").attr("src", nowChallenge);
}

function showBookTitle() {
    /**
     * 
     */
    var bookTitle = "hello";
    $("#bookTitleMain").text(bookTitle);
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