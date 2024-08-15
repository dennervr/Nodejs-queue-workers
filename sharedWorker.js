import { Worker } from 'worker_threads'

export class SharedWorker {
  amount = 2
  workerIndex = 0
  workers = []
  callbacks = {}

  constructor(workerScript, connId, callBack) {
    if (!SharedWorker.instance) {
      for (let i = 0; i < this.amount; i++) {
        const worker = new Worker(workerScript);
        worker.on('message', this.handleMessage.bind(this));
        this.workers.push(worker)
      }

      SharedWorker.instance = this;
    }
    SharedWorker.instance.callbacks[connId] = callBack
    return SharedWorker.instance;
  }

  getNextWorker() {
    return this.workers[this.workerIndex++ % this.amount]
  }

  postMessage(message, connId) {
    const worker = this.getNextWorker()
    worker.postMessage({ connId, message, })
  }

  handleMessage({ connId, message }) {
    this.callbacks[connId](message)
  }

  terminate() {
    this.workers.forEach(worker => worker.terminate())
    SharedWorker.instance = null;
  }
}
