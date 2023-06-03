var badges = ["./res/dummy/badge1.png", "./res/dummy/badge2.png"];
var quests = ["./res/dummy/book1.png"];
var blank = "./res/img/blank.png";
var badges_num = 19;
var quests_num = 20;

function showBadges() {
    var idx;
    for(idx = 0; idx < badges_num; idx+=3) {
        var tmp = document.createElement("div");
        tmp.className = "container_line";
        var i;
        for(i = 0; i < 3; i++) {
            var imgs = document.createElement("img");
            imgs.className = "item";
            if(idx + i < badges.length) {
                imgs.src = badges[idx + i];
            } else if(idx + i < badges_num) {
                imgs.src = blank;
            } else {
                imgs.style.visibility = "hidden";
            }
            tmp.appendChild(imgs);
        }
        $("#badges").append(tmp);
    }
}

function showQuests() {
    var idx;
    for(idx = 0; idx < badges_num; idx+=3) {
        var tmp = document.createElement("div");
        tmp.className = "container_line";
        var i;
        for(i = 0; i < 3; i++) {
            var imgs = document.createElement("img");
            imgs.className = "item";
            if(idx + i < quests.length) {
                imgs.src = quests[idx + i];
            } else if(idx + i < quests_num) {
                imgs.src = blank;
            } else {
                imgs.style.visibility = "hidden";
            }
            tmp.appendChild(imgs);
        }
        $("#books").append(tmp);
    }
}

function backBtnClicked() {
    location.replace("main.html");
}

function logoutBtnClicked() {
    showLogoutDialog(); // util에 있음
}

var user;
var userInfo;

$(document).ready(function() {
    user=localStorage.getItem("user");  
    userInfo=localStorage.getItem("userInfo");

    history.pushState(null, null, location.href);
  $(window).on('popstate', function() {
    history.go(1);
  });


    $("#badge_back").click(function() {
        backBtnClicked();
    });

    autoLogout();
    init();
});

async function init() {
    badges = await getBadges();
    quests = await getQuests();
    showBadges();
    showQuests();
}