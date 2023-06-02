/*
    서버와 통신하는 메소드, 다이얼로그, 자동 로그아웃 기능, 사용자 정보, 텍스트 관리
*/

function getText(key) {
    var text = "";
    // text.json파일을 파싱하고 key값을 이용하여 원하는 text를 찾아서 반환
    return text;
}

var autoLogoutTime = 120000;
var autoLogout;

function autoLogout() {
    /**
     * 자동 로그아웃
     * 사용자가 마우스를 움직이는 등의 이벤트시 실행됨 (움직이면 처음부터 카운트다운)
     * 특정 시간 동안 카운트 다운 된 후 자동 로그아웃 다이얼로그 띄우기
     */
    autoLogout = setTimeout(() => {
        showAutoLogoutDialog();
    }, autoLogoutTime);
    $("body").mousemove(function() {
        clearTimeout(autoLogout);
        autoLogout = setTimeout(() => {
            showAutoLogoutDialog();
        }, autoLogoutTime);
    });
}

function showAutoLogoutDialog() {
    var dialog = document.createElement("dialog");
    dialog.id = "logout_dialog";
    dialog.className = "common_dialog";
    dialog.innerHTML = "<p id=\"logout_dialog_text\">Als er gedurende 10 seconden geen reactie komt, wordt u automatisch uitgelogd.</p>" + "<p id=\"logout_dialog_cnt\">10</p>" + "<form id=\"dialog_btn_form\" method=\"dialog\"><div class=\"chick_btn\" id=\"logout_dialog_btn\">Click</div></form>";
    // 10초간 응답이 없는 경우 자동 종료됩니다.
    $(".page").append(dialog);
    dialog.showModal();
    var cnt = 10
    var cntDown = setInterval(() => {
        $("#logout_dialog_cnt").text(--cnt);
        if(cnt == 0) {
            clearInterval(cntDown);
            logout();
        }
    }, 1000)
    $("#logout_dialog_btn").click(function() {
        dialog.close();
        clearInterval(cntDown);
        dialog.innerHTML = "";
        $(".page").remove("#logout_dialog");
    });
}

function showLogoutDialog() {
    /**
     * 로그아웃 다이얼로그 logout()을 활용
     */
    logout();
}

function logout() {
    /**
     * 로그아웃
     * 가지고 있는 사용자 정보들을 모두 초기화
     * 메인화면으로 옮기기
     */
    window.location.href = "login.html";
}

function login_front() {
    /**
     * 로그인
     * 서버 통신 필요
     * 서버 결과에 따라서 로그인 다이얼로그 띄워줌
     * 최종 로그인의 경우 이 파일에 있는 사용자 정보 관련한거 정해줘야 함
     */
    //서버 관련
    var valid_id;
    var isChallengeValid;
    //서버에 아이디가 없다면------------------------------------------------------

    valid_id=true;

    //서버에 아이디가 있다면 받게 될 더미데이터----------------------------------------
    var jsonUser = `{
        "user_id": "u000001",
        "current_book": "",
        "read_book": {
          "000001": "20230524",
          "000002": "20230526"
        },
        "badge_list": {
          "b0001": "http://b0001",
          "b0002": "http://b0002"
        }
    }`;
    console.log(jsonUser);
    //-----------------------------------------------
    var userObj = JSON.parse(jsonUser);
    //서버에서 받아온 유저객체에서 챌린지값 t/f 확인후 연결되는 페이지 분별
    console.log(userObj);
    if(userObj.current_book==""){
        isChallengeValid=false;
    }else{
        isChallengeValid=true;
    }
    
    var id_value=$("#input_id").val();
    var idCheckDialog = $("#check_id_dialog")[0];

    if(id_value==""){
        alert("아이디를 입력해주세요");
    }else{
        $("#dialog_id").text('ID : ');
        $("#dialog_id").append(document.createTextNode(id_value));

        $("#input_id").val('');
        if (valid_id) {     //아이디 있는경우
            //서버에서 유저객체 받아오기 -> 쿠키 저장 
            
            $("#dialog_info").text("");
            var infoNode = "Je account bestaat!"; // Your account exist!
            $("#dialog_info").append(infoNode);
            idCheckDialog.showModal();
            if(isChallengeValid){
                $("#login_btn").click(function() {
                    window.location.href = "main.html";
                });
            }
            else{
                $("#login_btn").click(function() {
                    window.location.href = "book_choice.html";
                });
            }
            $("#back_btn").click(function() {
                idCheckDialog.close();
            });
        } else {    //아이디 없는경우 new user
            $("#dialog_info").text("");
            var infoNode = "Aangezien het account niet bestaat, wordt er " + "<br>" + " een nieuw account aangemaakt."; // Since the account does not exist, <br> a new account will be created.
            $("#dialog_info").append(infoNode);
            idCheckDialog.showModal();
            $("#login_btn").click(function() {
                window.location.href = "book_choice.html";
            });
            $("#back_btn").click(function() {
                idCheckDialog.close();
            });
        }
    
    }
   
 
}

function getNowChallenge() {
    /**
     * 서버 통신 필요
     * 현재 진행해야할 챌린지 정보 받아오기
     */
}

function getBadges() {
    
    /**
     * 서버 통신 필요
     * 모든 모은 배지 정보 받아오기 (최근 순서로 sort되어 있어야 함)
     */
}

function getQuests() {
    /**
     * 서버 통신 필요
     * 모든 해결한 퀘스트 정보 받아오기 (최근 순서로 sort되어 있어야 함)
     */
}

function getRandomBooks() { /*예담이가 할것*/
    /**
     * 서버 통신 필요
     * 안읽은 책 중에서 랜덤한 책 리스트 받아오기 -> 이건 서버랑 다 연결되고나서 할게 흑흑..
     */

    var jsonUser = `{
        "user_id": "u000001",
        "current_book": "",
        "read_book": {
          "000001": "20230524",
          "000002": "20230526"
        },
        "badge_list": {
          "b0001": "http://b0001",
          "b0002": "http://b0002"
        }
    }`;
    //-----------------------------------------------
    var userObj = JSON.parse(jsonUser);
    var book_num = 2;//images.length - 2;//userObj.read_book.length; //undefined
    var random_array=[];
    var images=[
        "./res/img/book1.jpeg",
        "./res/img/book2.jpeg",
        "./res/img/book3.jpeg",
        "./res/img/book4.jpeg",
        "./res/img/book5.jpeg",
        "./res/img/book6.jpeg",
        "./res/img/book7.jpeg",
        "./res/img/book8.jpeg",
    ];

    if(book_num>=4){
        while(random_array.length<4){
            var randomIndex = Math.floor(Math.random() * images.length);
            var randomValue = images[randomIndex];
            if($.inArray(randomValue, random_array)==-1){
                random_array.push(randomValue);
            }
        }
    }else if(book_num == 3){
        while(random_array.length<3){
            var randomIndex = Math.floor(Math.random() * images.length);
            var randomValue = images[randomIndex];
    
            if($.inArray(randomValue, random_array)==-1){
                random_array.push(randomValue);
            }
        }
    }else if(book_num == 2){
        while(random_array.length<2){
            var randomIndex = Math.floor(Math.random() * images.length);
            var randomValue = images[randomIndex];
    
            if($.inArray(randomValue, random_array)==-1){
                random_array.push(randomValue);
            }
        }
    }else if(book_num == 1){
        while(random_array.length<1){
            var randomIndex = Math.floor(Math.random() * images.length);
            var randomValue = images[randomIndex];
    
            if($.inArray(randomValue, random_array)==-1){
                random_array.push(randomValue);
            }
        }
    }
    return random_array;
}