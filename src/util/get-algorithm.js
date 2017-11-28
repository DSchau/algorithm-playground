// @flow
import { capitalize } from './capitalize';

type Algorithms = {
  [key: string]: {
    key: string,
    value: string
  }
};

export const getAlgorithm = (
  algorithm: string,
  algorithms: Algorithms,
  fallback: any = {}
) => {
  return (
    Object.keys(algorithms)
      .map(name => ({
        key: name,
        value: algorithms[name]
      }))
      .find(({ key }) => key === algorithm) || fallback
  );
};
