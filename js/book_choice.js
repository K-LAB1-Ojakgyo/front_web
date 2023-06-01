var isClicked=0;

function showRandomBooks() {
    var image_array=new Array(4);
    image_array=getRandomBooks(); //random하게 가져오기
    for(var i=0;i<4;i++){
        var temp_string = "#book"+(i+1); //string을 통해 id가져오기
        var img_id=$(temp_string); //image에 이 id가 들어있음
        $(img_id).attr("src",image_array[i]);
        $(img_id).removeClass('clicked');
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
        var infoNode = "choicing the book is completed!";
        $("#dialog_title").empty();
        $("#dialog_title").append(infoNode);
        idCheckDialog.showModal();
        $('#book_choice_login_or_back').attr("src", "./book_img/login_button.png");
        $('#book_choice_login_or_back').click(function(){
           window.location.href="login.html";
        });
    }else{
        var idCheckDialog = $("#book_choice_dialog")[0];
        var infoNode = "Please choose the book you want to read.";
        $("#dialog_title").empty();
        $("#dialog_title").append(infoNode);
        idCheckDialog.showModal();
        $('#book_choice_login_or_back').attr("src", "./book_img/back_button.png");
        $('#book_choice_login_or_back').click(function(){
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

$(document).ready(function() {
    autoLogout();
});