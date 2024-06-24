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

//     const formattedTime = {
//       days: timeObject.days,
//       hours: addLeadingZero(timeObject.hours),
//       minutes: addLeadingZero(timeObject.minutes),
//       seconds: addLeadingZero(timeObject.seconds),
//     };
//   });
// });

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

// Function to add leading zeros
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

// Function to convert milliseconds to days, hours, minutes, seconds
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor((ms % hour) / minute);
  const seconds = Math.floor((ms % minute) / second);

  return { days, hours, minutes, seconds };
}

document.addEventListener('DOMContentLoaded', function () {
  // Initialize flatpickr
  flatpickr('#datetime-picker', {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      const selectedDate = selectedDates[0];

      if (selectedDate < new Date()) {
        iziToast.error({
          title: 'Error',
          message: 'Please choose a date in the future',
          position: 'topRight',
        });
        document.getElementById('start-btn').disabled = true;
      } else {
        document.getElementById('start-btn').disabled = false;
      }
    },
  });

  // Start button click handler
  document.getElementById('start-btn').addEventListener('click', function () {
    // Disable input and Start button
    document.getElementById('datetime-picker').disabled = true;
    this.disabled = true;

    // Get selected date
    const selectedDate = flatpickr.parseDate(
      document.getElementById('datetime-picker').value,
      'Y-m-d H:i'
    );

    // Start countdown
    const countdown = setInterval(() => {
      const now = new Date().getTime();
      const distance = selectedDate.getTime() - now;

      if (distance <= 0) {
        clearInterval(countdown);
        updateTimerUI({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        iziToast.success({
          title: 'Success',
          message: 'Countdown finished!',
          position: 'topRight',
        });
        document.getElementById('datetime-picker').disabled = false;
        document.getElementById('start-btn').disabled = false;
        return;
      }

      const { days, hours, minutes, seconds } = convertMs(distance);
      updateTimerUI({ days, hours, minutes, seconds });
    }, 1000);
  });
});

// Function to update timer UI
function updateTimerUI({ days, hours, minutes, seconds }) {
  document.querySelector('[data-days]').textContent = addLeadingZero(days);
  document.querySelector('[data-hours]').textContent = addLeadingZero(hours);
  document.querySelector('[data-minutes]').textContent =
    addLeadingZero(minutes);
  document.querySelector('[data-seconds]').textContent =
    addLeadingZero(seconds);
}
