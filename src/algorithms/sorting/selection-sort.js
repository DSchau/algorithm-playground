export function selectionSort(arr) {
  if (!arr || !arr.length) {
    return arr;
  }
  const len = arr.length;
  for (let i = 0; i < len - 1; i++) {
    let minAtIndex = i;
    for (let j = i + 1; j < len; j++) {
      if (arr[j] < arr[minAtIndex]) {
        minAtIndex = j;
      }
    }

    let temp = arr[minAtIndex];
    arr[minAtIndex] = arr[i];
    arr[i] = temp;
  }
  return arr;
}
