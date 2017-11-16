// https://stackoverflow.com/a/5100420
const observable = (arr, callback) => new Proxy(arr, {
  apply: function(target, thisArg, argumentsList) {
    return thisArg[target].apply(this, argumentList);
  },
  set: function(target, index, value, receiver) {
    target[index] = value;
    callback([parseInt(index, 10), value]);
    return true;
  }
});

/*
 * Given a row (an array of blocks), sort by hsl using the given algorithm
 * May my ancestors forgive me for what I've done with the prototype here 😱
 */
if (typeof onmessage !== 'undefined') {
  onmessage = ev => {
    const { data: { row, sorter = row => row } } = ev;

    // const fn = new Function('arr', sorter);

    const orig = row.__proto__.slice;
    row.__proto__.slice = function(...args) {
      if (args.length === 0) {
        return this; // so we can track changes
      }
      return orig.apply(this, args);
    }

    let changes = [];

    const observableArr = observable(row, arr => changes.push(arr));

    const sorted = observable(row, (arr) => changes.push(arr))
      .sort((a, b) => {
        const getColor = ({ color }) => parseFloat(color.match(/hsl\((\d+)/).pop());
        return getColor(a) - getColor(b);
      });

    postMessage(changes);
  };
}

export default () => {};
