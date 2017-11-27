// https://stackoverflow.com/a/5100420
const observable = (arr, callback) =>
  new Proxy(arr, {
    apply: function(target, thisArg, argumentsList) {
      return thisArg[target].apply(this, argumentList);
    },
    set: function(target, index, value, receiver) {
      target[index] = value;
      callback([index, value, target]);
      return true;
    }
  });

const isSorted = (arr = []) =>
  arr.length > 0 &&
  arr.every((num, index) => index === 0 || arr[index - 1] <= num);

/*
 * Given a row (an array of blocks), sort by hsl using the given algorithm
 */
if (typeof onmessage !== 'undefined') {
  const handleSort = (row, sortFunction) => {
    let changes = [];
    const updateChanges = update => changes.push(update);

    const observableArr = observable(row, updateChanges);

    sortFunction(observableArr);

    const last = changes[changes.length - 1] || [];
    const result = last[last.length - 1];

    return { changes, sorted: isSorted(result) };
  };

  onmessage = ev => {
    const { data: { row, rows, sorter } } = ev;

    const sortFunction = new Function(sorter)();

    let updates = [];
    if (rows) {
      for (let i = 0; i < rows.length; i++) {
        updates.push(handleSort(rows[i], sortFunction));
      }
    } else {
      updates = handleSort(row, sortFunction);
    }

    postMessage(updates);
  };
}

export default () => {};
