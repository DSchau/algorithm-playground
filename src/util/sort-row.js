import CanvasWorker from '../canvas.worker';

export function sortRow(row, sorter) {
  const worker = new CanvasWorker();
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
