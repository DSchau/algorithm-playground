/*
 * CODE: http://blog.benoitvallon.com/sorting-algorithms-in-javascript/sorting-algorithms-in-javascript-all-the-code/#shell-sort
 * Shellsort is an in-place comparison sort which can be seen as either a generalization of sorting by exchange (bubble sort) or sorting by insertion (insertion sort). The method starts by sorting pairs of elements far apart from each other, then progressively reducing the gap between elements to be compared. Starting with far apart elements can move some out-of-place elements into position faster than a simple nearest neighbor exchange.
 * MORE INFO: https://en.wikipedia.org/wiki/Shellsort
 */
export function shellSort(arr) {
  const len = arr.length;
  for (let h = len; h > 0; h = parseInt(h / 2)) {
    for (let i = h; i < len; i++) {
      let k = arr[i];
      let j = i;
      for (; j >= h && k < arr[j - h]; j -= h) {
        arr[j] = arr[j - h];
      }
      arr[j] = k;
    }
  }
  return arr;
}
