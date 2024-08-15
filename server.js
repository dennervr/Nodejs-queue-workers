import MessageQueue from "./queue.js"

const users = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

users.map(async user => {
  const queue = new MessageQueue(user)

  for (let i = 0; i < 100; i++) {
    queue.addMessage(i)
  }
})







