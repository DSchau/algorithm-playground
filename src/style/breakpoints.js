// @flow
const breakpointFn = (breakpoint: number) => {
  return (content: string) => `
@media only screen and (min-width: ${breakpoint}px) {
  ${content}
}
  `;
}

export const SMALL = breakpointFn(0);
export const MEDIUM = breakpointFn(400);
export const LARGE = breakpointFn(768);
