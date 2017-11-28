// @flow
import Transpile from '../transpile.worker';

const worker: Worker = (new Transpile(): any);

export function transpile(code: string): Promise<string> {
  return new Promise((resolve, reject) => {
    worker.onmessage = (ev: any) => {
      resolve(ev.data);
    };

    worker.postMessage({
      code
    });
  });
}
