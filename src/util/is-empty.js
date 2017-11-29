// @flow
export const EMPTY_EXPR = /function \w+\([^\)]+\)\s*{\s*return arr;/;
export const isEmpty = (code: string) => !!code.match(EMPTY_EXPR);
