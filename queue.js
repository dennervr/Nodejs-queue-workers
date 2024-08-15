import { SharedWorker } from './sharedWorker.js'

export default class MessageQueue {
  constructor(connId) {
    this.queue = []
    this.connId = connId
    this.worker = new SharedWorker("./workerScript.js", connId, this.onFinish.bind(this))
    this.processing = false
    this.sendedMessages = []
  }

  addMessage(message) {
    this.queue.push(message)
    this.dispatch()
  }

  isEmpty() {
    return this.queue.length === 0
  }

  dispatch() {
    if (this.processing || this.isEmpty()) return;

    const message = this.queue.shift();
    this.worker.postMessage(message, this.connId);
    this.processing = true;
  }

  onFinish(message) {
    this.processing = false
    this.sendedMessages.push(message)
    console.log(`user (${this.connId}): ${this.sendedMessages}`)
    if (!this.isEmpty()) this.dispatch();
  }
}
