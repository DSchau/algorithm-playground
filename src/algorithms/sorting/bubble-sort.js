export function bubbleSort(arr) {
  if (!arr || !arr.length) {
    return arr;
  }
  let clone = arr.slice(0);
  for (let i = 0; i < clone.length; i++) {
    for (let j = 0; j < clone.length; j++) {
      if (clone[j] > clone[j + 1]) {
        const temp = clone[j];
        clone[j] = clone[j + 1];
        clone[j + 1] = temp;
      }
    }
  }
  return clone;
}
