/*
 * CODE: http://www.stoimen.com/blog/2010/07/02/friday-algorithms-javascript-merge-sort/
 * 
 * Mergesort is an efficient, general-purpose, comparison-based sorting 
 algorithm. Most implementations produce a stable sort, which means that the 
 implementation preserves the input order of equal elements in the sorted 
 output. Mergesort is a divide and conquer algorithm that was invented by John 
 von Neumann in 1945.
 * 
 * MORE INFO: https://en.wikipedia.org/wiki/Merge_sort
 */
function merge(arr, left, right) {
  let buffer = [];

  while (left.length && right.length) {
    if (left[0] <= right[0]) {
      buffer.push(left.shift());
    } else {
      buffer.push(right.shift());
    }
  }

  while (left.length) {
    buffer.push(left.shift());
  }
  while (right.length) {
    buffer.push(right.shift());
  }

  // NOTE: This is NOT reuqired for the sorting algorithm
  trackMutations(arr, buffer);

  return buffer;
}

/*
 * Note: this function would normally not be present
 * It is necessary to visualize the "buffer" required by merge sort
 */
function trackMutations(arr, updated) {
  for (let i = 0; i < updated.length; i++) {
    arr[i] = updated[i];
  }
}

export function mergeSort(arr, sorted = arr, len = sorted.length) {
  if (sorted.length <= 1) {
    return sorted;
  }
  const middle = parseInt(len / 2);
  let left = sorted.slice(0, middle);
  let right = sorted.slice(middle, len);

  return merge(arr, mergeSort(arr, left), mergeSort(arr, right));
}
