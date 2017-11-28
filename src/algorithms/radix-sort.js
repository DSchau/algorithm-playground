/*
 * CODE: http://taoalpha.github.io/blog/2016/01/19/tech-javascript-sorting-algorithm-radix-sort/
 *
 *
 * MORE INFO: 
 */
function getDigit(num, nth) {
  // get last nth digit of a number
  let ret = 0;
  while (nth--) {
    ret = num % 10;
    num = Math.floor((num - ret) / 10);
  }
  return ret;
}

export function radixSort(arr) {
  let max = Math.floor(Math.log10(Math.max.apply(Math, arr))),
    digitBuckets = [],
    idx = 0;

  for (let i = 0; i < max + 1; i++) {
    digitBuckets = [];
    let j = 0;
    for (; j < arr.length; j++) {
      let digit = getDigit(arr[j], i + 1);

      digitBuckets[digit] = digitBuckets[digit] || [];
      digitBuckets[digit].push(arr[j]);
    }

    idx = 0;
    for (let t = 0; t < digitBuckets.length; t++) {
      if (digitBuckets[t] && digitBuckets[t].length > 0) {
        for (j = 0; j < digitBuckets[t].length; j++) {
          arr[idx++] = digitBuckets[t][j];
        }
      }
    }
  }
  return arr;
}
