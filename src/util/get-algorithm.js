import { capitalize } from './capitalize';

export const getAlgorithm = (algorithm, algorithms, fallback = {}) => {
  return (
    Object.keys(algorithms)
      .map(name => ({
        key: name,
        value: algorithms[name]
      }))
      .find(({ key }) => key === algorithm) || fallback
  );
};
