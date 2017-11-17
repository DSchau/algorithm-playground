export function shellSort(arr) {
  const len = arr.length;
  for (var h = len; h > 0; h = parseInt(h / 2)) {
    for (var i = h; i < len; i++) {
      var k = arr[i];
      for (var j = i; j >= h && k < arr[j - h]; j -= h) {
        arr[j] = arr[j - h];
      }
      arr[j] = k;
    }
  }
  return arr;
}
