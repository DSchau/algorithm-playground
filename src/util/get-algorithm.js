import { capitalize } from './capitalize';

export const getAlgorithm = (algorithm, list) => {
  return Object.keys(list)
    .reduce((all, group) => {
      return all.concat(Object.keys(list[group]).map(label => ({
        label,
        value: list[group][label]
      })));
    }, [])
    .find(({ label }) => capitalize(label) === algorithm);
};
