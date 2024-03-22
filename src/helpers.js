const removeEventListeners = element => {
    element.replaceWith(element.cloneNode(true));
}

const timeoutPromise = delay => (
    new Promise(resolve => {
        setTimeout(() => (resolve()), delay);
    })
);

export {removeEventListeners, timeoutPromise};