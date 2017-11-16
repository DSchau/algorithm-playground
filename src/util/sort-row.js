import CanvasWorker from '../canvas.worker';

const worker = new CanvasWorker();

export function sortRow(row, sorter) {
  return new Promise((resolve, reject) => {
    worker.onmessage = ev => {
      resolve(ev.data);
    };

    worker.postMessage({
      row,
      sorter
    });
  });
}
