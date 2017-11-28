// @flow
import CanvasWorker from '../canvas.worker';

export function sortRow(row: number[], sorter: string): Promise<any> {
  const worker: Worker = (new CanvasWorker(): any);
  return new Promise((resolve, reject) => {
    worker.onmessage = (ev: any) => {
      resolve(ev.data);
    };

    worker.postMessage({
      row,
      sorter
    });
  });
}
