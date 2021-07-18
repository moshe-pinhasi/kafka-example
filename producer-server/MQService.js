const { Kafka } = require('kafkajs')
 
const kafka = new Kafka({
  clientId: 'my-kafka-app',
  // brokers: ["localhost:29092"],
  // brokers: ["kafka:9092"]
  brokers: [process.env.BROKER]
})
 
const producer = kafka.producer()

let connector;

module.exports = {
  send: (topic, messages) => {
    connector && connector.then(() => {
      console.log('***** new message *******');
      console.log('topic', topic);
      console.log('messages', messages);
      console.log('*************************');
      producer.send({topic, messages})
    })
  },
  connect() {
    connector = producer.connect()

    // connector
    //   .then(() => console.log('success!'))
    //   .catch((err) => {
    //     console.log('error', err)
    //     throw err
    //   })
  }
}

process.on('exit', (code) => {
  // producer.disconnect()
  console.log(`Closing producer`);
});