import Worker from '../Worker';

const worker = new Worker();

const safeEval = code => {
  return new Function(code);
}

export function transpile(code) {
  return new Promise((resolve, reject) => {
    worker.onmessage = ev => {
      resolve(safeEval(ev.data));
    };

    worker.postMessage({
      code
    });
  });
}

