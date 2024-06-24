// import flatpickr from 'flatpickr';
// import 'flatpickr/dist/flatpickr.min.css';

// import iziToast from 'izitoast';
// import 'izitoast/dist/css/iziToast.min.css';

// const options = {
//   enableTime: true,
//   time_24hr: true,
//   defaultDate: new Date(),
//   minuteIncrement: 1,
//   onClose(selectedDates) {
//     const selectedDate = selectedDates[0];

//     if (selectedDate < new Date()) {
//       iziToast.error({
//         title: 'Error',
//         message: 'Please choose a date in the future',
//         position: 'topRight',
//       });

//       document.querySelector('[data-start]').disabled = true;
//     } else {
//       document.querySelector('[data-start]').disabled = false;
//     }
//   },
// };

// flatpickr('#datetime-picker', options);

// let countdown;

// document.querySelector('[data-start]').addEventListener('click', function () {
//   document.getElementById('datetime-picker').disabled = true;
//   this.disabled = true;

//   const selectedDate = flatpickr.parseDate(
//     document.getElementById('datetime-picker').value,
//     'Y-m-d H:i'
//   );

//   const countdown = setInterval(() => {
//     const now = new Date().getTime();
//     const distance = selectedDate.getTime() - now;

//     if (distance <= 0) {
//       clearInterval(countdown);
//       updateTimerUI({ days: 0, hours: 0, minutes: 0, seconds: 0 });
//       iziToast.success({
//         title: 'Success',
//         message: 'Countdown finished!',
//         position: 'topRight',
//       });
//       document.getElementById('datetime-picker').disabled = false;
//       document.getElementById('start-btn').disabled = false;
//       return;
//     }

//     function addLeadingZero(value) {
//       return String(value).padStart(2, '0');
//     }

//     function convertMs(ms) {
//       const second = 1000;
//       const minute = second * 60;
//       const hour = minute * 60;
//       const day = hour * 24;

//       const days = Math.floor(ms / day);

//       const hours = Math.floor((ms % day) / hour);

//       const minutes = Math.floor(((ms % day) % hour) / minute);

//       const seconds = Math.floor((((ms % day) % hour) % minute) / second);

//       return { days, hours, minutes, seconds };
//     }
//   });
// });

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

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
      document.querySelector('[data-start]').disabled = true;
    } else {
      document.querySelector('[data-start]').disabled = false;
    }
  },
};

flatpickr('#datetime-picker', options);

const datePicker = document.querySelector('#datetime-picker');
const startButton = document.querySelector('[data-start]');

const daysElement = document.querySelector('[data-days]');
const hoursElement = document.querySelector('[data-hours]');
const minutesElement = document.querySelector('[data-minutes]');
const secondsElement = document.querySelector('[data-seconds]');

let countdownInterval;

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
