/* eslint-disable no-restricted-syntax */
const primeMultiply = (a, b) => (
    (2 ** a) * (3 ** b)
);

const timeoutPromise = delay => (
    new Promise(resolve => {
        setTimeout(() => (resolve()), delay);
    })
);

export {primeMultiply, timeoutPromise};