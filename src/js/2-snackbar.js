import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', event => {
  event.preventDefault();

  const delayInput = document.querySelector("input[name='delay']");
  const stateInput = document.querySelector("input[name='state']:checked");

  const delay = parseInt(delayInput.value, 10);

  const promise = new Promise((resolve, reject) => {
    if (stateInput.value === 'fulfilled') {
      setTimeout(() => {
        resolve(delay);
      }, delay);
    } else if (stateInput.value === 'rejected') {
      setTimeout(() => {
        reject(delay);
      }, delay);
    }
  });

  promise
    .then(resolvedDelay => {
      iziToast.success({
        title: 'OK',
        message: `Fulfilled promise in ${resolvedDelay}ms`,
        position: 'topCenter',
      });
    })
    .catch(rejectedDelay => {
      iziToast.error({
        title: 'Error',
        message: `Illegal operation`,
        position: 'topCenter',
      });
    });
});
