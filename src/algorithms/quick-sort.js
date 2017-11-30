/*
 * CODE: http://learnjswith.me/quick-sort-in-javascript/
 *
 * Quicksort is a divide and conquer algorithm. Quicksort first divides a 
 large array into two smaller sub-arrays: the low elements and the high 
 elements. Quicksort can then recursively sort the sub-arrays.
 *
 * MORE INFO: https://en.wikipedia.org/wiki/Quicksort
 */
function swap(arr, current, next) {
  const temp = arr[current];
  arr[current] = arr[next];
  arr[next] = temp;
}

function partition(arr, left, right) {
  const pivot = arr[Math.floor((right + left) / 2)];

  let i = left;
  let j = right;

  while (i <= j) {
    while (arr[i] < pivot) {
      i++;
    }
    while (arr[j] > pivot) {
      j--;
    }
    if (i <= j) {
      swap(arr, j, i);
      i++;
      j--;
    }
  }
  return i;
}

export function quickSort(arr, left = 0, right = arr.length - 1) {
  let index;
  if (arr.length > 1) {
    index = partition(arr, left, right);

    if (left < index - 1) {
      quickSort(arr, left, index - 1);
    }
    if (index < right) {
      quickSort(arr, index, right);
    }
  }
  return arr;
}
