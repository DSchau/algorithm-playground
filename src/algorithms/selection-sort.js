/*
 * The Selection sort algorithm divides the input list into two parts: the 
 sublist of items already sorted and the sublist of items remaining to be 
 sorted that occupy the rest of the list. Initially, the sorted sublist is 
 empty and the unsorted sublist is the entire input list. The algorithm 
 proceeds by finding the smallest element in the unsorted sublist, exchanging 
 it with the leftmost unsorted element, and moving the sublist boundaries one 
 element to the right
 *
 * MORE INFO: https://en.wikipedia.org/wiki/Selection_sort
 */
function swap(arr, currentIndex, minIndex) {
  const temp = arr[currentIndex];
  arr[currentIndex] = arr[minIndex];
  arr[minIndex] = temp;
}

export function selectionSort(arr, n = arr.length) {
  let min;
  for (let i = 0; i < n; i++) {
    min = i;
    for (let j = i; j < n; j++) {
      if (arr[j] < arr[min]) {
        min = j;
      }
    }
    swap(arr, i, min);
  }
  return arr;
}
