/*
 * CODE: https://www.w3resource.com/javascript-exercises/searching-and-sorting-algorithm/searching-and-sorting-algorithm-exercise-14.php
 * 
 * Bogo sort is a highly ineffective sorting function based on the generate 
 and test paradigm. The function successively generates permutations of its 
 input until it finds one that is sorted. It is not useful for sorting, but 
 may be used for educational purposes, to contrast it with more efficient 
 algorithms.
 *
 * MORE INFO: https://en.wikipedia.org/wiki/Bogosort
 */
function isSorted(arr) {
  return arr.every((num, index) => index === 0 || arr[index - 1] <= num);
}

function shuffle(arr) {
  let count = arr.length;
  let temp;
  let index;

  while (count > 0) {
    index = Math.floor(Math.random() * count);
    count--;

    temp = arr[count];
    arr[count] = arr[index];
    arr[index] = temp;
  }

  return arr;
}

export function bogoSort(arr, attempts = 10) {
  let sorted = false;
  for (let i = 0; i < attempts; i++) {
    arr = shuffle(arr);
    sorted = isSorted(arr);
    if (sorted) {
      break;
    }
  }
  return arr;
}
