const screen = document.querySelector(".screen");
const sectionStart = document.querySelector(".section-start");
const sectionInfo = document.querySelector(".section-info");
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
  }, 11000);
});

//âm thanh sống động
const playList = [
  "https://github.com/phuongphat1088/Game-Collect-Points/raw/main/public/sound/moan20.mp3",
  "https://github.com/phuongphat1088/Game-Collect-Points/raw/main/public/sound/moan4.mp3",
  "https://github.com/phuongphat1088/Game-Collect-Points/raw/main/public/sound/moan5.mp3",
  "https://github.com/phuongphat1088/Game-Collect-Points/raw/main/public/sound/moan8.mp3",
  "https://github.com/phuongphat1088/Game-Collect-Points/raw/main/public/sound/moan9.mp3"
];
playListLength = playList.length;
function playSound() {
  let sound = new Audio(`${playList[getRandomInt(0, playListLength)]}`);
  sound.play();
}

//cộng điểm khi click vào circle
circle.forEach((element) => {
  function addPoint() {
    pointCount += parseInt(element.innerText);
    console.log(pointCount);
    element.style.display = "none";
  }
  element.addEventListener("click", function () {
    playSound();
    addPoint();
  });
  element.addEventListener("contextmenu", function () {
    playSound();
    addPoint();
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
    textStart.innerHTML = `Bác đã được <span class="point">${pointCount}</span> điểm !`;
    btnStart.innerHTML = `<i class="fa-solid fa-rotate-left"></i>`;
  }
}

//vùng thông tin
function infoSection(enable) {
  if (enable == 0) {
    sectionInfo.style.opacity = "0";
    setTimeout(() => {
      sectionInfo.style.display = "none";
      time.textContent = 10;
      point.textContent = 0;
    }, 500);
  }
  if (enable == 1) {
    sectionInfo.style.opacity = "1";
    sectionInfo.style.display = "flex";
    point.textContent = pointCount;
    setTimeout(() => {
      time.textContent--;
    }, 1000);
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
