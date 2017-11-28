/*
 * CODE: http://taoalpha.github.io/blog/2016/01/19/tech-javascript-sorting-algorithm-radix-sort/
 *
 * Bucket sort, or bin sort, is a sorting algorithm that works by distributing 
 the elements of an array into a number of buckets. Each bucket is then sorted 
 individually, either using a different sorting algorithm, or by recursively 
 applying the bucket sorting algorithm.
 *
 * MORE INFO: https://en.wikipedia.org/wiki/Bucket_sort
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
  let min = Math.min.apply(Math, list);
  let buckets = [];

  let i = 0;
  for (; i < list.length; i++) {
    let newIndex = Math.floor((list[i] - min) / bucketCount);

    buckets[newIndex] = buckets[newIndex] || [];
    buckets[newIndex].push(list[i]);
  }
  let idx = 0;
  for (i = 0; i < buckets.length; i++) {
    if (typeof buckets[i] !== 'undefined') {
      insertionSort(buckets[i]);
      for (let j = 0; j < buckets[i].length; j++) {
        list[idx++] = buckets[i][j];
      }
    }
  }
  return list;
}
