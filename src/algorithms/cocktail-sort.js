/*
 * CODE: https://rosettacode.org/wiki/Sorting_algorithms/Cocktail_sort#JavaScript
 *
 * The cocktail shaker sort (or cocktail sort) is an improvement on the Bubble 
 Sort. The improvement is basically that values "bubble" both directions 
 through the array, because on each iteration the cocktail shaker sort bubble 
 sorts once forwards and once backwards.
 *
 * MORE INFO: https://en.wikipedia.org/wiki/Cocktail_shaker_sort
 */
function swap(arr, current, next) {
  const temp = arr[current];
  arr[current] = arr[next];
  arr[next] = temp;
}

export function cocktailSort(arr) {
  let isSorted = true;
  while (isSorted) {
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] > arr[i + 1]) {
        swap(arr, i, i + 1);
        isSorted = true;
      }
    }

    if (!isSorted) break;

    isSorted = false;

    for (let j = arr.length - 1; j > 0; j--) {
      if (arr[j - 1] > arr[j]) {
        swap(arr, j, j - 1);
        isSorted = true;
      }
    }
  }
  return arr;
}
