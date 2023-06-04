/*
    서버와 통신하는 메소드, 다이얼로그, 자동 로그아웃 기능, 사용자 정보, 텍스트 관리
*/
var user;
var userInfo;

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
    $("#btnLogout").click(function() {
        var dialog = document.createElement("dialog");
        dialog.id = "logout_btn_dialog";
        dialog.className = "common_dialog";
        dialog.innerHTML = "<p id=\"logout_btn_dialog_text\">wil je uitloggen?</p>" + "<div id=\"logout_back_btn\" class=\"chick_btn\">◀ Rug</div>" + "<div id=\"logout_btn\" class=\"chick_btn\">Logout ▶</div>";
        // <div class="chick_btn" id="logout_back_btn">◀ Rug</div>   <!-- back -->
        // <div class="chick_btn" id="logout_btn">Logout ▶</div>
        $(".page").append(dialog);
        dialog.showModal();

        $("#logout_back_btn").click(function() {    // 로그아웃 이전버튼
            console.log("logout dialog back button");
            dialog.close();
            dialog.innerHTML = "";
            $(".page").remove("#logout_dialog");
        });
        $("#logout_btn").click(function() {  // 로그아웃 버튼
            console.log("logout dialog logout button");
            dialog.close();
            dialog.innerHTML = "";
            $(".page").remove("#logout_dialog");
            logout();
        });
    });   
}

function logout() {
    /**
     * 로그아웃
     * 가지고 있는 사용자 정보들을 모두 초기화
     * 메인화면으로 옮기기
     */
    localStorage.removeItem("user");
    localStorage.removeItem("userInfo");
    window.location.href = "login.html";
}

async function login_front() {
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

    //console.log(jsonUser);
    //-----------------------------------------------
    //var userObj = JSON.parse(jsonUser);
    //서버에서 받아온 유저객체에서 챌린지값 t/f 확인후 연결되는 페이지 분별
    //console.log(userObj);
        
    var id_value=$("#input_id").val();
    // var idCheckDialog = $("#check_id_dialog")[0];
    // var jsonUser = await getUser(id_value);
    // console.log(jsonUser);
    //console.log(jsonUser.badge_list["b0001"]); -> badge에 대한 정보 읽어오기
    
   //console.log(jsonUser.current_book);
    

    if(jsonUser==null){
        isChallengeValid=false; //book_choice로 가기
    }else{
        isChallengeValid=true; //main으로 가기
    }

    /*예담이가 추가한 코드*/
    
    if(id_value==""){
        alert("아이디를 입력해주세요");
    }else{
        var idCheckDialog = $("#check_id_dialog")[0];
        var jsonUser = await getUser(id_value);
        console.log(jsonUser);

        if(jsonUser==null){
            valid_id=false;
        }else{
            valid_id=true;
        }

        if(jsonUser==null || jsonUser.current_book=="-1"){
            isChallengeValid=false; //book_choice로 가기
        }else{
            isChallengeValid=true; //main으로 가기
        }

        
        localStorage.setItem("user",id_value);
        localStorage.setItem("userInfo",JSON.stringify(jsonUser));
        user=localStorage.getItem("user");
        userInfo=JSON.parse(localStorage.getItem("userInfo"));
        //console.log("risa badeg :"+ JSON.stringify(userInfo.badge_list));

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
                addUser(id_value);
                window.location.href = "book_choice.html";

            });
            $("#back_btn").click(function() {
                idCheckDialog.close();
            });
        }
    
    }
   
 
}

async function getNowChallenge() {
    /**
     * 서버 통신 필요
     * 현재 진행해야할 챌린지 정보 받아오기
     */
    // userId = 'risa'; // 함수 인자로 전달받거나, cookie로 저장되어 있던 값 사용해야 할 것
    
    userObj = await getUser(user);
    nowChallengeId = userObj.current_book;

    bookObj = await getBook(nowChallengeId);
    return bookObj.head_image;
}

async function getBadges(user) {
    /**
     * 서버 통신 필요
     * 모든 모은 배지 정보 받아오기 (최근 순서로 sort되어 있어야 함)
     */
    //var user = await getUser("risa");
    console.log(user);
    var badge_list = Object.values(user.badge_list);
    var url_list = await getRealUrls(badge_list);
    console.log(url_list);
    return url_list;
}

async function getQuests(user) {
    /**
     * 서버 통신 필요
     * 모든 해결한 퀘스트 정보 받아오기 (최근 순서로 sort되어 있어야 함)
     */
    //var user = await getUser("risa");
    console.log(user);
    var read_book_list = Object.keys(user.read_book);

    var books = await getAllBook();
    var books_list = [];

    for(i = 0; i < read_book_list.length; i++) {
        books_list.push(books[read_book_list[i]].head_image);
    }
    console.log(books_list);

    var url_list = await getRealUrls(books_list);
    console.log(url_list);
    return url_list; 
}

async function getRandomBooks() { /*예담이가 할것*/
    /**
     * 서버 통신 필요
     * 안읽은 책 중에서 랜덤한 책 리스트 받아오기 -> 이건 서버랑 다 연결되고나서 할게 흑흑..
     */

    // var jsonUser = `{
    //     "user_id": "u000001",
    //     "current_book": "",
    //     "read_book": {
    //       "000001": "20230524",
    //       "000002": "20230526"
    //     },
    //     "badge_list": {
    //       "b0001": "http://b0001",
    //       "b0002": "http://b0002"
    //     }
    // }`;
    //-----------------------------------------------
    //var userObj = JSON.parse(jsonUser);


    var userId="risa";//"heejin";
    var book_num = 4;
    var user_read_book = await getRandomBook(book_num, userId);
    //console.log(jsonUser.badge_list["b0001"]); -> badge에 대한 정보 읽어오기
    //console.log(jsonUser);
    //var user_read_book=jsonUser.read_book;
    //user_read_book = Object.keys(read_book);
    //console.log(user_read_book.length);

    var length = $.map(user_read_book, function(value, key) {
        return key;
    }).length;
      
    console.log(length); // 출력: 3

    var random_array=[];

    if(length>=4){
        for(var i=0;i<4;i++){
            var randomIndex=Object.keys(user_read_book);
            var randomKey=randomIndex[Math.floor(Math.random() * randomIndex.length)];
            var randomValue = user_read_book[randomKey].head_image;
            console.log(randomValue);
            if($.inArray(randomValue, random_array)==-1){
                random_array.push(randomValue);
            }
        }
    }else if(length == 3){
        for(var i=0;i<3;i++){
            var randomIndex=Object.keys(user_read_book);
            var randomKey=randomIndex[Math.floor(Math.random() * randomIndex.length)];
            var randomValue = user_read_book[randomKey].head_image;
            if($.inArray(randomValue, random_array)==-1){
                random_array.push(randomValue);
            }
        }
    }else if(length == 2){
        for(var i=0;i<2;i++){
            var randomIndex=Object.keys(user_read_book);
            var randomKey=randomIndex[Math.floor(Math.random() * randomIndex.length)];
            var randomValue = user_read_book[randomKey].head_image;
            if($.inArray(randomValue, random_array)==-1){
                random_array.push(randomValue);
            }
        }
    }else if(length == 1){
        for(var i=0;i<1;i++){
            var randomIndex=Object.keys(user_read_book);
            var randomKey=randomIndex[Math.floor(Math.random() * randomIndex.length)];
            var randomValue = user_read_book[randomKey].head_image;
            if($.inArray(randomValue, random_array)==-1){
                random_array.push(randomValue);
            }
        }
    }
    return random_array;
}

$(document).ready(function() {
    showLogoutDialog();
});