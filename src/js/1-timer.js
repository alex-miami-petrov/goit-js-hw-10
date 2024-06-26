import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const datePicker = document.querySelector('#datetime-picker');
const startButton = document.querySelector('[data-start]');

const daysElement = document.querySelector('[data-days]');
const hoursElement = document.querySelector('[data-hours]');
const minutesElement = document.querySelector('[data-minutes]');
const secondsElement = document.querySelector('[data-seconds]');

let countdownInterval;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    const userSelectedDate = selectedDates[0];
    const now = new Date();

    if (userSelectedDate.getTime() <= now.getTime()) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
        position: 'topRight',
      });
      startButton.disabled = true;
    } else {
      startButton.disabled = false;
    }
  },
};

flatpickr('#datetime-picker', options);

function convertMs(ms) {
  const seconds = Math.floor((ms / 1000) % 60);
  const minutes = Math.floor((ms / 1000 / 60) % 60);
  const hours = Math.floor((ms / 1000 / 60 / 60) % 24);
  const days = Math.floor(ms / 1000 / 60 / 60 / 24);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function handleDateSelection(selectedDates) {
  const userSelectedDate = selectedDates[0];
  const now = new Date();

  if (userSelectedDate.getTime() <= now.getTime()) {
    iziToast.error({
      title: 'Error',
      message: 'Please choose a date in the future',
      position: 'topRight',
    });
    startButton.disabled = true;
  } else {
    startButton.disabled = false;
  }
}

function startCountdown() {
  const endDate = new Date(datePicker.value).getTime();
  const now = new Date().getTime();

  const timeRemaining = endDate - now;

  if (timeRemaining <= 0) {
    clearInterval(countdownInterval);
    startButton.disabled = true;
    return;
  }

  const { days, hours, minutes, seconds } = convertMs(timeRemaining);

  daysElement.textContent = addLeadingZero(days);
  hoursElement.textContent = addLeadingZero(hours);
  minutesElement.textContent = addLeadingZero(minutes);
  secondsElement.textContent = addLeadingZero(seconds);
}

// const flatpickrInstance = flatpickr(datePicker, {
//   enableTime: true,
//   time_24hr: true,
//   defaultDate: new Date(),
//   minuteIncrement: 1,
//   onClose: handleDateSelection,
//   locale: {
//     firstDayOfWeek: 1,
//   },
// });

startButton.addEventListener('click', () => {
  countdownInterval = setInterval(startCountdown, 1000);
  datePicker.disabled = true;
  startButton.disabled = true;
});

// handleDateSelection([new Date()]);
