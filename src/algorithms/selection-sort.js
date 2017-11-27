/*
 * CODE: https://www.nczonline.net/blog/2009/09/08/computer-science-in-javascript-selection-sort/
 * The Selection sort algorithm divides the input list into two parts: the sublist of items already sorted and the sublist of items remaining to be sorted that occupy the rest of the list. Initially, the sorted sublist is empty and the unsorted sublist is the entire input list. The algorithm proceeds by finding the smallest element in the unsorted sublist, exchanging it with the leftmost unsorted element, and moving the sublist boundaries one element to the right
 * MORE INFO: https://en.wikipedia.org/wiki/Selection_sort
 */
export function selectionSort(arr) {
  const len = arr.length;
  for (let i = 0; i < len - 1; i++) {
    let minAtIndex = i;
    for (let j = i + 1; j < len; j++) {
      if (arr[j] < arr[minAtIndex]) {
        minAtIndex = j;
      }
    }

    [arr[minAtIndex], arr[i]] = [arr[i], arr[minAtIndex]];
  }
  return arr;
}
