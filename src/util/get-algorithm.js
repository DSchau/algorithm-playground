import { capitalize } from './capitalize';

export const getAlgorithm = (algorithm, algorithms, fallback = {}) => {
  return (
    Object.keys(algorithms)
      .map(name => ({
        label: name,
        value: algorithms[name]
      }))
      .find(({ label }) => capitalize(label) === algorithm) || fallback
  );
};
