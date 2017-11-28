/*
 * CODE: http://blog.benoitvallon.com/sorting-algorithms-in-javascript/sorting-algorithms-in-javascript-all-the-code/#insertion-sort
 *
 * Insertion sort algorithm iterates, consuming one input element each 
 repetition, and growing a sorted output list. Each iteration removes one 
 element from the input data, finds the location it belongs within the sorted 
 list, and inserts it there. It repeats until no input elements remain.
 *
 * MORE INFO: https://en.wikipedia.org/wiki/Insertion_sort
 */
export function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let value = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > value) {
      arr[j + 1] = arr[j];
      j -= 1;
    }
    arr[j + 1] = value;
  }
  return arr;
}
