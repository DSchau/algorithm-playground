// http://learnjswith.me/quick-sort-in-javascript/
function partition(arr, left, right) {
  // create pivot as middle value
  const pivot = arr[Math.floor((right + left) / 2)];

  let i = left; // start left and go right towards pivot
  let j = right; // start right and go left towards pivot

  while (i <= j) {
    while (arr[i] < pivot) {
      i++;
    }
    while (arr[j] > pivot) {
      j--;
    }
    if (i <= j) {
      // swap values using destructuring
      [arr[i], arr[j]] = [arr[j], arr[i]];
      i++;
      j--;
    }
  }
  return i;
}

export function quickSort(arr, left = 0, right = arr.length - 1) {
  let index;
  if (arr.length > 1) {
    // create the partition (split the array)
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
