// 드래그 이벤트를 처리하는 JavaScript 코드
var quizImgs = document.querySelectorAll(".quizimg");
var quizpage = document.querySelector(".quizpage");
var originalX, originalY;
var offsetX, offsetY;
var dragging = false;
var submit = false;

// 각각의 드래그 가능한 이미지 요소에 대해 이벤트 핸들러 등록
quizImgs.forEach(function(quizImg) {

  quizImg.addEventListener("dragstart", function(event) {
    dragging = true;
    originalX = quizImg.style.left;
    originalY = quizImg.style.top;
    offsetX = event.clientX - quizImg.offsetLeft;
    offsetY = event.clientY - quizImg.offsetTop;
  });

  quizImg.addEventListener("drag", function(event) {
    if (dragging) {
      quizImg.style.left = event.clientX - offsetX + "px";
      quizImg.style.top = event.clientY - offsetY + "px";
    }
  });

  quizImg.addEventListener("dragend", function(event) {
    dragging = false;
    quizImg.style.left = event.clientX - offsetX + "px";
    quizImg.style.top = event.clientY - offsetY + "px";

    for (var i = 1; i < 5; i++) { //1부터 4까지의 answer 영역에 들어갔는지 확인
      var answerImg = document.querySelector("#answer"+i);
      var rect = answerImg.getBoundingClientRect();
      var answerImgX = rect.left;
      var answerImgY = rect.top;
      var answerImgWidth = rect.width;
      var answerImgHeight = rect.height;
  
      var quizImgRect = quizImg.getBoundingClientRect();
      var quizImgX = (quizImgRect.left+quizImgRect.right)/2;
      var quizImgY = (quizImgRect.top+quizImgRect.bottom)/2;
      if (
        quizImgX >= answerImgX &&
        quizImgX <= answerImgX + answerImgWidth &&
        quizImgY >= answerImgY &&
        quizImgY <= answerImgY + answerImgHeight
      ) {
        // 드롭된 이미지가 answerImg 클래스를 가지는 요소에 드롭되었을 때의 처리
        if(answerImg.src.includes("ans")){ // 이미 이미지가 들어 있는 경우 -> 교체
          var curnum = Number(answerImg.src.charAt(answerImg.src.length-5));
          document.querySelector("#quiz"+(shuffledNumbers.indexOf(curnum)+1)).style.display = "block";
        }
        answerImg.src = quizImg.src;
        quizImg.style.display = "none";
        break;
      }
    }
    quizImg.style.left = originalX;
    quizImg.style.top = originalY;
  });
});


function shuffleNumbers() {
  var numbers = [1, 2, 3, 4];
  
  for (var i = numbers.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = numbers[i];
    numbers[i] = numbers[j];
    numbers[j] = temp;
  }
  
  return numbers;
}

var shuffledNumbers = shuffleNumbers();

for(var i = 1; i<=4; i++){
  var image = document.getElementById("quiz"+i);
  image.src = "./res/img/ans"+shuffledNumbers[i-1]+".png";
}

var submitbtn = document.getElementById("submitbtn");
var backbtn = document.getElementById("backbtn");

submitbtn.addEventListener("click", function(){
  if(!submit){
    //답 맞았는지 확인하고 다이얼로그 출력
    submit = true;
    var ans = 0;
    for(var i = 1; i < 5; i++){
      var answerImg = document.querySelector("#answer"+i);
      var input = answerImg.src;
      console.log(input);
      if(input.includes('ans'+i)) ans++;
    }
    
    if(ans==4){
      document.querySelector("#successDial").style.display = "block";
      document.querySelector("#nextbtn").style.display = "block";
      document.querySelector("#success").style.display="block";
    }
    else{
      document.querySelector("#failDial").style.display = "block";
      document.querySelector("#homebtn").style.display = "block";
      document.querySelector("#failed").style.display="block";
    }
  }
  
});

backbtn.addEventListener("click", function(){
  if(!submit)
    //퀴즈 풀기 전 화면으로 이동
    window.location.href = "./main.html";
});

homebtn.addEventListener("click", function(){
    window.location.href="./main.html";
});

nextbtn.addEventListener("click", function(){
  window.location.href="./result.html";
});