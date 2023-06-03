$(document).ready(async function() {
  $('.page').trigger('click');    

  history.pushState(null, null, location.href);
  $(window).on('popstate', function(event) {
    history.go(1);
  });

  await getInfos();

  setImages();
  setDragEvent();
  setButtons();
  autoLogout();
});

var shuffledNumbers;
var current_user_id = "risa"; // for test
var quizImgs = []; // 퀴즈 이미지 순서대로 저장 (정답)
var submitImgs = ["","","",""]; // 사용자가 배치한 이미지 순서 저장

var data; // 유저 객체
var book; // 현재 책 정보

async function getInfos(){
  data = await getUser(current_user_id);
  book = await getBook(data.current_book);
  $("#booktitle").text("< " + book.title + " >");
  quizImgs = await getRealUrls(book.quiz[1]);

  console.log(quizImgs);
}
function setImages(){
  shuffledNumbers = shuffleNumbers();
  for(var i = 1; i<=4; i++){
    $("#quiz"+i).attr("src", quizImgs[shuffledNumbers[i-1]]);
  }
}
function shuffleNumbers() {
  var numbers = [0, 1, 2, 3];
  
  for (var i = numbers.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = numbers[i];
    numbers[i] = numbers[j];
    numbers[j] = temp;
  }
  
  return numbers;
}

function setDragEvent(){
  // 드래그 이벤트를 처리하는 JavaScript 코드
  var dragQuizImgs = document.querySelectorAll(".quizimg");
  var originalX, originalY;
  var offsetX, offsetY;
  var dragging = false;

  // 각각의 드래그 가능한 이미지 요소에 대해 이벤트 핸들러 등록
  dragQuizImgs.forEach(function(dragQuizImg) {
    dragQuizImg.addEventListener("dragstart", function(event) {
      dragging = true;
      originalX = dragQuizImg.style.left;
      originalY = dragQuizImg.style.top;
      offsetX = event.clientX - dragQuizImg.offsetLeft;
      offsetY = event.clientY - dragQuizImg.offsetTop;
    });

    dragQuizImg.addEventListener("drag", function(event) {
      if (dragging) {
        dragQuizImg.style.left = event.clientX - offsetX + "px";
        dragQuizImg.style.top = event.clientY - offsetY + "px";
      }
    });

    dragQuizImg.addEventListener("dragend", function(event) {
      dragging = false;
      dragQuizImg.style.left = event.clientX - offsetX + "px";
      dragQuizImg.style.top = event.clientY - offsetY + "px";

      for (var i = 1; i < 5; i++) { //1부터 4까지의 answer 영역에 들어갔는지 확인
        var answerImg = document.querySelector("#answer"+i);
        var rect = answerImg.getBoundingClientRect();
        var answerImgX = rect.left;
        var answerImgY = rect.top;
        var answerImgWidth = rect.width;
        var answerImgHeight = rect.height;
    
        var quizImgRect = dragQuizImg.getBoundingClientRect();
        var quizImgX = (quizImgRect.left+quizImgRect.right)/2;
        var quizImgY = (quizImgRect.top+quizImgRect.bottom)/2;
        if (
          quizImgX >= answerImgX &&
          quizImgX <= answerImgX + answerImgWidth &&
          quizImgY >= answerImgY &&
          quizImgY <= answerImgY + answerImgHeight
        ) {
          dragQuizImg.style.display = "none";
          if(submitImgs[i-1]!=""){
            var curnum = shuffledNumbers.indexOf(quizImgs.indexOf(submitImgs[i-1]));
            console.log(curnum);
            $("#quiz"+(curnum+1)).css("display", "block");
          }
          answerImg.src = dragQuizImg.src;
          submitImgs[i-1] = dragQuizImg.src;
          break;
        }
      }
      dragQuizImg.style.left = originalX;
      dragQuizImg.style.top = originalY;
    });
  });

}

function setButtons(){
  var submit = false;
  $('#submitbtn').click(function(){
    if(!submit){
      //답 맞았는지 확인하고 다이얼로그 출력
      submit = true;
      var ans = 0;
      for(var i = 0; i < 4; i++){
        if(quizImgs[i] == submitImgs[i]) ans++;
      }
      console.log(ans);
      if(ans==4){
        document.querySelector("#successDial").style.display = "block";
        document.querySelector("#nextbtn").style.display = "block";
        document.querySelector("#success").style.display="block";
        successBookInfo();
      }
      else{
        document.querySelector("#failDial").style.display = "block";
        document.querySelector("#homebtn").style.display = "block";
        document.querySelector("#failed").style.display="block";
      }
    }
  });

  $('#backbtn').click(function(){
    if(!submit)
      //퀴즈 풀기 전 화면으로 이동
      window.location.href = "./main.html";
  });

  $('#btnLogout').click(function(){
    //showLogoutDialog();
  });
  
  $('#homebtn').click(function(){
      window.location.href="./main.html";
  });
  
  $('#nextbtn').click(function(){
    window.location.href="./result.html";
  });
}

async function successBookInfo(){
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  //책 읽은 날짜 저장
  const currentDate = `${year}${month}${day}`;

  data.badge_list = Object.assign({}, data.badge_list, book.badge); // 새로운 뱃지 추가
  data.read_book[data.current_book] = currentDate; // 새로운 책 추가 (날짜 포함)
  data.current_book = "-1"; // 현재 선택 책 null로 초기화

  await updateUser(current_user_id, data);
}