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
    const sorted = last[last.length - 1];

    return { changes, sorted }
  };

  onmessage = ev => {
    const { data: { row, rows, sorter } } = ev;

    const sortFunction = new Function(sorter)();

    let changes = [];
    if (rows) {
      for (let i = 0; i < rows.length; i++) {
        changes.push(handleSort(rows[i], sortFunction).changes);
      }
    } else {
      changes = handleSort(row, sortFunction).changes
    }

    postMessage(changes);
  };
}

export default () => {};
