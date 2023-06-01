/*
    서버와 통신하는 메소드, 다이얼로그, 자동 로그아웃 기능, 사용자 정보, 텍스트 관리
*/

function getText(key) {
    var text = "";
    // text.json파일을 파싱하고 key값을 이용하여 원하는 text를 찾아서 반환
    return text;
}

var autoLogoutTime = 5000;
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
    dialog.innerHTML = "<p id=\"logout_dialog_text\">10초간 응답이 없는 경우 자동 종료됩니다.</p>" + "<p id=\"logout_dialog_cnt\">10</p>" + "<form id=\"dialog_btn_form\" method=\"dialog\"><div class=\"chick_btn\" id=\"logout_dialog_btn\">Click</div></form>";
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

function login() {
    /**
     * 로그인
     * 서버 통신 필요
     * 서버 결과에 따라서 로그인 다이얼로그 띄워줌
     * 최종 로그인의 경우 이 파일에 있는 사용자 정보 관련한거 정해줘야 함
     */
    
    var id_value=$("#input_id").val();
    var idCheckDialog = $("#check_id_dialog")[0];
    if(id_value==""){
        alert("아이디를 입력해주세요");
    }else{
        $("#dialog_id").text('ID : ');
        $("#dialog_id").append(document.createTextNode(id_value));
        const valid_id = true; //서버에 아이디(id_value) 보내서 아이디 있는지 없는지 확인, 있으면 기존유저->true/없으면 뉴유저->false
        $("#input_id").val('');
        if (valid_id) {     //아이디 있는경우
            $("#dialog_info").text("");
            var infoNode = "Your account exist!";
            $("#dialog_info").append(infoNode);
            idCheckDialog.showModal();
            $("#login_btn").click(function() {
                window.location.href = "main.html";
            });
            $("#back_btn").click(function() {
                idCheckDialog.close();
                
            });
        } else {    //아이디 없는경우 new user
            $("#dialog_info").text("");
            var infoNode = "Since the account does not exist," + "<br>" + "a new account will be created.";
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

    var images=[
        "./book_img/book1.jpeg",
        "./book_img/book2.jpeg",
        "./book_img/book3.jpeg",
        "./book_img/book4.jpeg",
        "./book_img/book5.jpeg",
        "./book_img/book6.jpeg",
        "./book_img/book7.jpeg",
        "./book_img/book8.jpeg",
    ];
    var random_array=[];
    // for(var i=0;i<4;i++){
    //     var imageSrc = Math.floor(Math.random() * random_array.length);
    //     random_array.push(imageSrc);
    //     for(var j=0;j<4;j++){
    //         if(random_array[j]==imageSrc){
    //             random_array.splice(i,1);
    //             i--;
    //         }
    //     }
    // }
    
    // for(var i=0;i<4;i++){
    //     var index = random_array[i];
    //     random_array[i]=images[index];
    // }

    while(random_array.length<5){
        var randomIndex = Math.floor(Math.random() * images.length);
        var randomValue = images[randomIndex];

        if($.inArray(randomValue, random_array)==-1){
            random_array.push(randomValue);
        }
    }

    return random_array;
}