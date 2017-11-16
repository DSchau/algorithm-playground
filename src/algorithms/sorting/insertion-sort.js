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
  let cloned = arr.slice(0);
  for (let i = 1; i < cloned.length; i++) {
    let value = cloned[i];
    let j = i - 1;
    while (j >= 0 && cloned[j] > value) {
      cloned[j + 1] = cloned[j];
      j -= 1;
    }
    cloned[j + 1] = value;
  }
  return cloned;
}
