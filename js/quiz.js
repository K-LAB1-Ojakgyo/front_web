// 드래그 이벤트를 처리하는 JavaScript 코드
var quizImgs = document.querySelectorAll(".quizimg");
var quizpage = document.querySelector(".quizpage");
var originalX, originalY;
var offsetX, offsetY;
var dragging = false;

// 각각의 드래그 가능한 이미지 요소에 대해 이벤트 핸들러 등록
quizImgs.forEach(function(quizImg) {

  quizImg.addEventListener("dragstart", function(event) {
    dragging = true;
    originalX = quizImg.style.left;
    originalY = quizImg.style.top;
    offsetX = event.clientX - quizImg.offsetLeft;
    offsetY = event.clientY - quizImg.offsetTop;
    //alert(offsetX);
  });

  quizImg.addEventListener("drag", function(event) {
    if (dragging) {
      quizImg.style.left = event.clientX - offsetX + "px";
      quizImg.style.top = event.clientY - offsetY + "px";
    }
  });

  quizImg.addEventListener("dragend", function(event) {
    dragging = false;
    

    for (var i = 1; i < 5; i++) {
      var answerImg = document.querySelector("#answer"+i);
      var rect = answerImg.getBoundingClientRect();
      var answerImgX = rect.left;
      var answerImgY = rect.top;
      var answerImgWidth = rect.width;
      var answerImgHeight = rect.height;
  
      var quizImgRect = quizImg.getBoundingClientRect();
      var quizImgX = quizImgRect.left;
      var quizImgY = quizImgRect.top;
      //alert(quizImgX);
      alert(answerImgX + " " + answerImgY +" "+ quizImgX+" "+quizImgY);
      if (
        quizImgX >= answerImgX &&
        quizImgX <= answerImgX + answerImgWidth &&
        quizImgY >= answerImgY &&
        quizImgY <= answerImgY + answerImgHeight
      ) {
        // 드롭된 이미지가 answerImg 클래스를 가지는 요소에 드롭되었을 때의 처리
        alert("Dropped on answerImg!");
        break; // 반복문 종료
      }
    }
    quizImg.style.left = originalX;
    quizImg.style.top = originalY;
  });
});

// var answerImgs = document.querySelectorAll(".answerimg");

// answerImgs.forEach(function(answerImg) {
//   answerImg.addEventListener("dragover", function(event) {
//     event.preventDefault();
//   });

//   answerImg.addEventListener("drop", function(event) {
//     event.preventDefault();

//     // 드롭된 요소 처리
//     var droppedItem = event.dataTransfer.getData("text/plain");
//     var quizImg = document.getElementById(droppedItem);
//     // 만약 드롭된 요소가 quiz 클래스를 가진 이미지인 경우에 대한 처리
//     if (quizImg.classList.contains("quizimg")) {
//       // 드롭된 요소를 answerimg 클래스 영역에 추가하는 로직을 구현
//       //answerImg.appendChild(quizImg);
//       alert("짠");
      
//     }
//   });
// });




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
  image.src = "./res/ans"+shuffledNumbers[i-1]+".png";
}

var submitbtn = document.getElementById("submitbtn");
var backbtn = document.getElementById("backbtn");

submitbtn.addEventListener("click", function(){
  //답 맞았는지 확인
  alert("submitbtn");
});

backbtn.addEventListener("click", function(){
  //퀴즈 풀기 전 화면으로 이동
  alert("backbtn");
});