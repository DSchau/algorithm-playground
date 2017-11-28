// @flow
const breakpointFn = (breakpoint: number) => {
  return (...args: any[]) => {
    const merged = args.reduce((allMerged: any, arg: any) => {
      allMerged = {
        ...allMerged,
        ...arg
      };
      return allMerged;
    }, {});

    return {
      [`@media only screen and (min-width: ${breakpoint}px)`]: merged
    };
  };
};

export const SMALL = breakpointFn(0);
export const MEDIUM = breakpointFn(400);
export const LARGE = breakpointFn(768);
