/*
 * Given a row (an array of blocks), sort by hsl using the given algorithm
 */
if (typeof onmessage !== 'undefined') {
  onmessage = ev => {
    const { data: { row, sorter = row => row } } = ev;

    const sorted = row.slice(0).sort((a, b) => {
      const getColor = ({ color }) => parseFloat(color.match(/hsl\((\d+)/).pop());
      return getColor(a) - getColor(b);
    });

    postMessage(sorted);
  };
}

export default () => {};
