import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const dateInput = document.querySelector('input#datetime-picker');
const startBtn = document.querySelector('button[data-start]');
startBtn.disabled = true;

let intervalId;
let selectedDate;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose: onSelectDate,
};

flatpickr(dateInput, options);

function onSelectDate(selectedDates) {
  const currentTime = new Date().getTime();
  const rawSelectedDate = selectedDates[0].getTime();

  if (rawSelectedDate < currentTime) {
    return Notify.failure('Please choose a date in the future');
  } else {
    selectedDate = rawSelectedDate;
  }

  startBtn.disabled = false;
}

startBtn.addEventListener('click', () => {
  if (intervalId) {
    clearInterval(intervalId);
  }

  intervalId = setInterval(() => {
    const timeNow = new Date().getTime();

    if (selectedDate <= timeNow) {
      clearInterval(intervalId);
      return;
    }

    const timeToEnd = convertMs(selectedDate - timeNow);
    const timeToEndToString = addLeadingZero(timeToEnd);
    renderTime(timeToEndToString);
  }, 1000);
});

function renderTime({ days, hours, minutes, seconds }) {
  const dateDays = document.querySelector('.value[data-days]');
  const dateHours = document.querySelector('.value[data-hours]');
  const dateMinutes = document.querySelector('.value[data-minutes]');
  const dateSeconds = document.querySelector('.value[data-seconds]');
  dateDays.textContent = days;
  dateHours.textContent = hours;
  dateMinutes.textContent = minutes;
  dateSeconds.textContent = seconds;
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(time) {
  return {
    days: `${time.days}`.padStart(2, '0'),
    hours: `${time.hours}`.padStart(2, '0'),
    minutes: `${time.minutes}`.padStart(2, '0'),
    seconds: `${time.seconds}`.padStart(2, '0'),
  };
}