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
    const selectedDate = selectedDates[0];

    if (selectedDate < new Date()) {
      window.alert('Please choose a date in the future');

      document.querySelector('[data-start]').disabled = true;
    } else {
      document.querySelector('[data-start]').disabled = false;
    }
  },
};

flatpickr('#datetime-picker', options);

let countdown;

document.querySelector('[data-start]').addEventListener('click', function () {
  document.getElementById('datetime-picker').disabled = true;
  this.disabled = true;

  const selectedDate = flatpickr.parseDate(
    document.getElementById('datetime-picker').value,
    'Y-m-d H:i'
  );

  countdown = setInterval(() => {
    const now = new Date().getTime();
    const distance = selectedDate.getTime() - now;

    if (distance <= 0) {
      clearInterval(countdown);
      document.querySelector('.timer').innerHTML = '00:00:00:00';

      document.getElementById('datetime-picker').disabled = false;
      document.querySelector('[data-start]').disabled = false;
      return;
    }

    function addLeadingZero(value) {
      return String(value).padStart(2, '0');
    }

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
  });
});
