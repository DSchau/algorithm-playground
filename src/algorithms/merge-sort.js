/*
 * CODE: http://www.stoimen.com/blog/2010/07/02/friday-algorithms-javascript-merge-sort/
 *
 *
 * MORE INFO: 
 */

function merge(arr, left, right) {
  let result = [];
  while (left.length && right.length) {
    if (left[0] <= right[0]) {
      result.push(left.shift());
    } else {
      result.push(right.shift());
    }
  }

  while (left.length) {
    result.push(left.shift());
  }

  while (right.length) {
    result.push(right.shift());
  }

  return result;
}

/*
 * Note: augment would normally not be needed
 * but is needed for the visualization to appear correctly
 */
function augment(arr, result) {
  for (let i = 0; i < result.length; i++) {
    arr[i] = result[i];
  }
}

export function mergeSort(arr) {
  if (arr.length < 2) {
    return arr;
  }

  const len = arr.length;

  let middle = parseInt(len / 2);
  let left = arr.slice(0, middle);
  let right = arr.slice(middle, len);

  return merge(arr, mergeSort(left), mergeSort(right));
}
