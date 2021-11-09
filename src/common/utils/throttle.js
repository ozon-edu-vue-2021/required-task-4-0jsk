export const throttle = (fn, limit) => {
  let timeout;
  return (...args) => {
    if (!timeout) {
      fn(...args);
      timeout = setTimeout(() => (timeout = false), limit);
    }
  };
};
