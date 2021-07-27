const { Kafka } = require('kafkajs')

const kafka = new Kafka({
  clientId: 'my-kafka-app',
  brokers: [process.env.BROKER]
})

const consumer = kafka.consumer({ groupId: process.env.GROUP_ID })

module.exports = {
  connect: () => {
    return consumer.connect()
  },
  subscribe:  async (topic, cb) => {
    await consumer.subscribe({ topic, fromBeginning: true })
    consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        cb({
          partition,
          offset: message.offset,
          value: message.value.toString(),
        })
      }
    })
  },
}

process.on('exit', (code) => {
    console.log(`Closing consumer`);
});