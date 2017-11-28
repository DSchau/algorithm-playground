// @flow
// https://stackoverflow.com/a/5100420
declare var self: DedicatedWorkerGlobalScope;

const observable = (arr: any[], callback: (arr: any[]) => any): any =>
  new Proxy(arr, {
    apply: function(target: any, thisArg: any, argumentsList: any[]): any {
      return thisArg[target].apply(this, argumentsList);
    },
    set: function(target: any[], index: string, value: any): boolean {
      target[parseInt(index, 10)] = value;
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
  const handleSort = (row: number[], sortFunction: any) => {
    let changes = [];
    const updateChanges = (update: any[]) => changes.push(update);

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

    self.postMessage(updates);
  };
}

export default () => {};
