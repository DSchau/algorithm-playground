/*
 *
 */
function insertionSort(arr) {
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

export function bucketSort(list, bucketCount = 200) {
  // only for numbers
  var min = Math.min.apply(Math, list), // get the min
    buckets = [];

  // build the bucket and distribute the elements in the list
  for (var i = 0; i < list.length; i++) {
    // this is a simple hash function that will make sure the basic rule of bucket sort
    var newIndex = Math.floor((list[i] - min) / bucketCount);

    buckets[newIndex] = buckets[newIndex] || [];
    buckets[newIndex].push(list[i]);
  }
  // refill the elements into the list
  var idx = 0;
  for (i = 0; i < buckets.length; i++) {
    if (typeof buckets[i] !== 'undefined') {
      // select those non-empty buckets
      insertionSort(buckets[i]); // use any sorting algorithm would be fine
      // sort the elements in the bucket
      for (var j = 0; j < buckets[i].length; j++) {
        list[idx++] = buckets[i][j];
      }
    }
  }
  return list;
}
