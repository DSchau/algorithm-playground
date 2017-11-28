// @flow
import Transpile from '../transpile.worker';

const worker = new Transpile();

export function transpile(code: string): Promise<string> {
  return new Promise((resolve, reject) => {
    worker.onmessage = ev => {
      resolve(ev.data);
    };

    worker.postMessage({
      code
    });
  });
}
