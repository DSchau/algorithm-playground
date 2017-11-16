export function selectionSort(arr) {
  if (!arr || !arr.length) {
    return arr;
  }
  let clone = arr.slice(0);
  const len = clone.length;
  for (let i = 0; i < len - 1; i++) {
    let minAtIndex = i;
    for (let j = i + 1; j < len; j++) {
      if (clone[j] < clone[minAtIndex]) {
        minAtIndex = j;
      }
    }

    let temp = clone[minAtIndex];
    clone[minAtIndex] = clone[i];
    clone[i] = temp;
  }
  return clone;
}
