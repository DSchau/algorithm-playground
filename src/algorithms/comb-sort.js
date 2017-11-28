/*
 * CODE: https://www.w3resource.com/javascript-exercises/searching-and-sorting-algorithm/searching-and-sorting-algorithm-exercise-9.php
 *
 * Comb sort is a relatively simple sorting algorithm originally designed by 
 Włodzimierz Dobosiewicz in 1980. Later it was rediscovered by Stephen Lacey 
 and Richard Box in 1991. Comb sort improves on bubble sort.
 * 
 * MORE INFO: https://en.wikipedia.org/wiki/Comb_sort
 */
function isSorted(arr) {
  return arr.every((num, index) => index === 0 || arr[index - 1] <= num);
}

export function combSort(arr) {
  let iteration_count = 0;
  let gap = arr.length - 2;
  let decrease_factor = 1.25;

  while (!isSorted(arr)) {
    if (iteration_count > 0) {
      gap = gap === 1 ? gap : Math.floor(gap / decrease_factor);
    }

    let front = 0;
    let back = gap;
    while (back <= arr.length - 1) {
      if (arr[front] > arr[back]) {
        let temp = arr[front];
        arr[front] = arr[back];
        arr[back] = temp;
      }

      front += 1;
      back += 1;
    }
    iteration_count += 1;
  }
  return arr;
}
