/*
 * Insertion sort starts with two arrays; an empty array, and the input array
 * We iterate over the input array
 * each time putting the item in the input array into the empty array
 * until each item has been looped over, leaving us with a sorted array
 */
export function insertionSort(arr) {
  if (!arr || !arr.length) {
    return arr;
  }
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
