// @flow
export const delay = (duration: number = 25): Promise<void> =>
  new Promise(resolve => setTimeout(resolve, duration));
