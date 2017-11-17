import Transpile from '../transpile.worker';

const worker = new Transpile();

export function transpile(code) {
  return new Promise((resolve, reject) => {
    worker.onmessage = ev => {
      resolve(ev.data);
    };

    worker.postMessage({
      code
    });
  });
}
