export const pRequestAnimationFrame = awaitable =>
  new Promise(resolve =>
    requestAnimationFrame(() => awaitable().then(resolve))
  );
