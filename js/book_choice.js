var isClicked=0;

function showRandomBooks() {
    /**
     * util의 getRandomBooks를 활용하여 정보를 얻어온후
     * 보여주기
     * 각 보여지는 책들은 radio 버튼처럼 하나를 픽하게끔 되어야 하고
     * 하나가 골라지는 순간 select 버튼이 활성화가 되어야 함
     */
    var image_array=new Array(4);
    image_array=getRandomBooks(); //random하게 가져오기
    for(var i=0;i<4;i++){
        var temp_string = "#book"+(i+1); //string을 통해 id가져오기
        var img_id=$(temp_string); //image에 이 id가 들어있음
        $(img_id).attr("src",image_array[i]);
    }

    
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
        /*완료 다이얼로그*/
        $('#book_choice_select').click(function(){
            $('#book_choice_dialog').dialog();
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