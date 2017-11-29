// @flow
import HideFunction from '../hide-function-body.worker';

export function hideFunction(code: string): Promise<any> {
  const worker: Worker = (new HideFunction(): any);
  return new Promise((resolve, reject) => {
    worker.onmessage = (ev: any) => {
      resolve(ev.data);
    };

    worker.postMessage({
      code
    });
  });
}
