/*
 * CODE: https://en.wikipedia.org/wiki/Bitonic_sorter
 *
 * Bitonic mergesort is a parallel algorithm for sorting. It is also used as a 
 construction method for building a sorting network. The algorithm was devised 
 by Ken Batcher.
 *
 * MORE INFO: https://en.wikipedia.org/wiki/Bitonic_sorter
 */
function kernel(arr, p, q) {
  let d = 1 << (p - q);

  for (let i = 0; i < arr.length; i++) {
    let up = ((i >> p) & 2) === 0;

    if ((i & d) === 0 && arr[i] > arr[i | d] === up) {
      let temp = arr[i];
      arr[i] = arr[i | d];
      arr[i | d] = temp;
    }
  }
}

function bitonicSort(n, arr) {
  for (let i = 0; i < n; i++) {
    for (let j = 0; j <= i; j++) {
      kernel(arr, i, j);
    }
  }
  return arr;
}

export function bitonicMergeSort(arr, n = 25) {
  return bitonicSort(n, arr);
}
