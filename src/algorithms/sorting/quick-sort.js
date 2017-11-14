const extra = 'yellow';

export function quickSort(arr, times = 0) {
  if (times === 0) {
    return quickSort(arr.concat(extra), 1);
  }
  return arr;
}
