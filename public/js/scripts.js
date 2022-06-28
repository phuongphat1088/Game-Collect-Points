const screen = document.querySelector(".screen");
const sectionStart = document.querySelector(".section-start");
const sectionInfo = document.querySelector(".section-info")
const btnStart = document.querySelector(".start-btn");
const textStart = document.querySelector(".start-text");
const circle = document.querySelectorAll(".circle");
let point = document.querySelector(".point");
let time = document.querySelector(".time");
let pointCount = 0;

//gọi các hàm khi bắt đầu chơi
btnStart.addEventListener("click", function () {
  startScreen(0);
  let loopCircle = setTimeout(function loop() {
    randomCirclePosition();
    infoSection(1);

    loopCircle = setTimeout(loop, 1000);
  }, 1000);

  setTimeout(() => {
    clearTimeout(loopCircle);
    startScreen(2);
    circle.forEach((element) => {
      element.style.display = "none";
    });
    pointCount = 0;
    infoSection(0);
    console.log(pointCount);
  }, 10000);
});

//cộng điểm khi click vào circle
circle.forEach((element) => {
  element.addEventListener("click", function () {
    pointCount += parseInt(element.innerText);
    console.log(pointCount);
    element.style.display = "none";
  });
});

//màn hình start & restart
function startScreen(enable) {
  if (enable == 0) {
    sectionStart.style.opacity = "0";
    btnStart.innerHTML = `<i class="fa-solid fa-pause"></i>`;
    setTimeout(() => {
      sectionStart.style.display = "none";
    }, 500);
  }
  if (enable == 1) {
    sectionStart.style.opacity = "1";
    sectionStart.style.display = "flex";
    btnStart.innerHTML = `<i class="fa-solid fa-play"></i>`;
  }
  if (enable == 2) {
    sectionStart.style.opacity = "1";
    sectionStart.style.display = "flex";
    textStart.innerHTML = `Bác đã được <span class="point">${pointCount}</span> điểm !`
    btnStart.innerHTML = `<i class="fa-solid fa-rotate-left"></i>`;
  }
}

//vùng thông tin
function infoSection(enable) {
  if(enable == 0)
  {
    point.textContent = 0;
    time.textContent = 0;
    sectionInfo.style.opacity = "0";
    setTimeout(() => {
      sectionInfo.style.display = "none";
    }, 500);    
  }
  if (enable == 1) {
    sectionInfo.style.opacity = "1";
    sectionInfo.style.display = "flex";
    point.textContent = pointCount;
    time.textContent++;
  }
}

//random vị trí circle
function randomCirclePosition() {
  circle.forEach((element) => {
    element.style.display = "flex";
    element.style.left = `${getRandomInt(0, 90)}%`;
    element.style.top = `${getRandomInt(0, 90)}%`;
  });
}

//tạo số nguyên ngẫu nhiên trong khoảng
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}
