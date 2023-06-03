var isClicked=0;
var user;   //user가 로그인한 아이디
var userInfo;   //user 정보 
$(document).ready(function() {
 
    user=localStorage.getItem("user");  
    userInfo=JSON.parse(localStorage.getItem("userInfo"));
  
 
  history.pushState(null, null, location.href);
  $(window).on('popstate', function() {
    history.go(1);
  });
    
    // HTML 파일이 로드되면 실행되는 함수
    showRandomBooks();
    autoLogout();
  });


async function showRandomBooks() {
    var image_array=[];

    image_array = await getRandomBook(8, "heejin"); //random하게 가져오기
    var length = $.map(image_array, function(value, key) {
        return key;
    }).length;
    console.log(length);
    if(length>3){
        // for(var i=0;i<length;i++){
            var books_image = Object.values(image_array); // 객체의 키를 배열로 추출
            console.log(books_image);
            for(var i=0;i<length;i++){
                var temp_string = "#book"+(i+1); //string을 통해 id가져오기
                var img_id=$(temp_string); //image에 이 id가 들어있음
                image_array[i]=await getRealUrl(books_image[i].head_image);
                $(img_id).attr("src", image_array[i]);
                $(img_id).removeClass('clicked');
            }

    }else{
        console.log("hh~");
        var book_num = length;
        var books_image = Object.values(image_array); // 객체의 키를 배열로 추출
        for(var i=0;i<book_num;i++){ //0부터 book_num까지(0-1,0-2,0-3..)
            var temp_string = "#book"+(i+1); //string을 통해 id가져오기
            var img_id=$(temp_string); //image에 이 id가 들어있음
            image_array[i]=await getRealUrl(books_image[i].head_image);
            $(img_id).attr("src",image_array[i]);
            $(img_id).removeClass('clicked');
        }
        for(var i=book_num; i<5;i++){
            var temp_string = "#book"+(i+1); //string을 통해 id가져오기
            var img_id=$(temp_string); //image에 이 id가 들어있음
            $(img_id).empty();
            $(img_id).remove();
        }
    }
    isClicked=0;
}

function refreshBtnClicked() {
    showRandomBooks();
}

function logoutBtnClicked() {
    showLogoutDialog(); // util에 있음
}

function selectBtnClicked() {
    // 완료 다이얼로그가 뜨면서 5초 후 login 화면으로 이동

    if(isClicked==1){
        var idCheckDialog = $("#book_choice_dialog")[0];
        var infoNode = "Het kiezen van het boek is voltooid!"; // The book selection is complete!
        var logout="logout";
        $("#dialog_title").empty();
        $("#dialog_title").append(infoNode);
        idCheckDialog.showModal();
        $('#book_choice_logout_or_back').attr("src", ".res/img/chick_btn.png");
        $("#book_choice_logout_or_back").empty();
        $("#book_choice_logout_or_back").append(logout);
        $('#book_choice_logout_or_back').click(function(){
            console.log("로그아웃버튼누름");
            showLogoutDialog();
           //window.location.href="login.html";
        });
    }else{
        var idCheckDialog = $("#book_choice_dialog")[0];
        var infoNode = "Kies het boek dat je wilt lezen."; // Please choose the book you want to read.
        var back="back";
        $("#dialog_title").empty();
        $("#dialog_title").append(infoNode);
        idCheckDialog.showModal();
        $('#book_choice_logout_or_back').attr("src", ".res/img/chick_btn.png");
        $("#book_choice_logout_or_back").empty();
        $("#book_choice_logout_or_back").append(back);
        $('#book_choice_logout_or_back').click(function(){
            idCheckDialog.close();
        });
    }

}

function addClickEffect(element){
    var images = document.getElementsByClassName('book');
    for(var i=0; i<images.length ;i++){
        images[i].classList.remove("clicked");
    }
    element.classList.add("clicked");
    isClicked=1;
}