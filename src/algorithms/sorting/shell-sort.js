export function shellSort(arr) {
  const len = arr.length;
  for (let h = len; h > 0; h = parseInt(h / 2)) {
    for (let i = h; i < len; i++) {
      let k = arr[i];
      for (let j = i; j >= h && k < arr[j - h]; j -= h) {
        arr[j] = arr[j - h];
      }
      arr[j] = k;
    }
  }
  return arr;
}
