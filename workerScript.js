import { parentPort } from "worker_threads"


parentPort.on("message", (message) => {
  // Delay to simulate processing
  const randomDelay = () => Math.floor(Math.random() * 4000) + 1000;

  setTimeout(() => {
    parentPort.postMessage(message)
  }, randomDelay())
})
