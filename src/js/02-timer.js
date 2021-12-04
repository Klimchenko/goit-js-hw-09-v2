import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
    btnStart: document.querySelector("[data-start]"),
    datetimePicker: document.querySelector("#datetime-picker"),
    days: document.querySelector("[data-days]"),
    hours: document.querySelector("[data-hours]"),
    minutes: document.querySelector("[data-hours]"),
    seconds:  document.querySelector("[data-seconds]"),

}

const TIME_DELAY = 1000;

let chosenDate = null;
refs.btnStart.setAttribute("dasabled", true);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      chosenDate = selectedDates[0];
      if (chosenDate > Date.now()) {
          refs.btnStart.removeAttribute("disabled");
      } else {
          Notify.failure("Please choose a date in the future!"),
              refs.btnStart.setAttribute("dasabled", true);
      }
    },
};

flatpickr(refs.datetimePicker, options);


refs.btnStart.addEventListener('click', () => {
    refs.btnStart.setAttribute('disabled', true)
    refs.datetimePicker.setAttribute('disabled', true)
    setInterval(() => {
        if (chosenDate <= Date.now()) return;
        const currentTime = convertMs(chosenDate - Date.now());
        console.log(currentTime);
        refs.days.textContent = currentTime.days;
        refs.hours.textContent = currentTime.hours;
        refs.minutes.textContent = currentTime.minutes;
        refs.seconds.textContent = currentTime.seconds;
    },TIME_DELAY)
})


function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
