// http://learnjswith.me/quick-sort-in-javascript/
function partition(items, left, right) {
  // create pivot as middle value
  const pivot = items[Math.floor((right + left) / 2)];

  let i = left; // start left and go right towards pivot
  let j = right; // start right and go left towards pivot

  while (i <= j) {
    while (items[i] < pivot) {
      i++;
    }
    while (items[j] > pivot) {
      j--;
    }
    if (i <= j) {
      // swap values using destructuring
      [items[i], items[j]] = [items[j], items[i]];
      i++;
      j--;
    }
  }
  return i;
}

export function quickSort(items, left = 0, right = items.length - 1) {
  let index;
  if (items.length > 1) {
    // create the partition (split the array)
    index = partition(items, left, right);

    if (left < index - 1) {
      quickSort(items, left, index - 1);
    }
    if (index < right) {
      quickSort(items, index, right);
    }
  }
  return items;
}
