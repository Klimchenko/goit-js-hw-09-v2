const body = document.querySelector('body');
const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
let timerId = null;
stopBtn.disabled = true;

startBtn.addEventListener('click', onStartBtnClick);
stopBtn.addEventListener('click', onStopBtnClick);

function onStartBtnClick() {
  startBtn.disabled = true;
  stopBtn.disabled = false;

  body.style.backgroundColor = getRandomHexColor();

  timerId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);

  removeStartBtnListener();
}

function onStopBtnClick() {
  startBtn.disabled = false;
  stopBtn.disabled = true;

  startBtn.addEventListener('click', onStartBtnClick);
  clearInterval(timerId);
}

function removeStartBtnListener() {
  startBtn.removeEventListener('click', onStartBtnClick);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}