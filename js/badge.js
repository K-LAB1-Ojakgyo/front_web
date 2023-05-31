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

$(document).ready(function() {
    $("#badge_back").click(function() {
        backBtnClicked();
    });

    showBadges();
    showQuests();
});