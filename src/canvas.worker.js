// https://stackoverflow.com/a/5100420
const observable = (arr, callback) =>
  new Proxy(arr, {
    apply: function(target, thisArg, argumentsList) {
      return thisArg[target].apply(this, argumentList);
    },
    deleteProperty: function(target, property) {
      console.log('Deleted %s', property);
      return true;
    },
    set: function(target, index, value, receiver) {
      target[index] = value;
      callback([parseInt(index, 10), value]);
      return true;
    }
  });

/*
 * Given a row (an array of blocks), sort by hsl using the given algorithm
 */
if (typeof onmessage !== 'undefined') {
  onmessage = ev => {
    const { data: { row, sorter = row => row } } = ev;

    const sortFunction = new Function(sorter)();

    let changes = [];

    const observableArr = observable(row, arr => changes.push(arr));

    const sorted = sortFunction(observableArr);

    postMessage(changes);
  };
}

export default () => {};
