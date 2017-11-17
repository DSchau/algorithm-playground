export function shellSort(arr) {
  for (var h = arr.length; h > 0; h = parseInt(h / 2)) {
    for (var i = h; i < arr.length; i++) {
      var k = arr[i];
      for (var j = i; j >= h && k < arr[j - h]; j -= h) {
        arr[j] = arr[j - h];
      }
      arr[j] = k;
    }
  }
  return arr;
}
