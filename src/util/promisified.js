// @flow
export const pRequestAnimationFrame = (
  awaitable: () => Promise<any>
): Promise<any> =>
  new Promise((resolve: any) =>
    requestAnimationFrame(() => {
      awaitable().then(resolve);
    })
  );
