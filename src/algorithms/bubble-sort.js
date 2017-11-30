/*
 * CODE: http://blog.benoitvallon.com/sorting-algorithms-in-javascript/the-bubble-sort-algorithm#bubble-sort
 *
 * Bubble sort is a simple sorting algorithm that repeatedly steps through the 
 list to be sorted, compares each pair of adjacent items and swaps them if 
 they are in the wrong order. The pass through the list is repeated until no 
 swaps are needed, which indicates that the list is sorted.
 *
 * MORE INFO: https://en.wikipedia.org/wiki/Bubble_sort
 */
function swap(arr, current, next) {
  const temp = arr[current];
  arr[current] = arr[next];
  arr[next] = temp;
}

export function bubbleSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      if (arr[j] > arr[j + 1]) {
        swap(arr, j, j + 1);
      }
    }
  }
  return arr;
}
