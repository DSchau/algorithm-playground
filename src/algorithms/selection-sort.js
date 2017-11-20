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

    [arr[minAtIndex], arr[i]] = [arr[i], arr[minAtIndex]];
    
  }
  return arr;
}
