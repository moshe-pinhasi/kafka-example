const express = require('express')
const bodyParser = require('body-parser')
const errorHandler = require('./errorHandler.middleware')
const MQService = require('./MQService')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const queueName = "user-messages"

MQService.connect()

setInterval(() => {
  MQService.send('test-topic', [{ value: 'Hello KafkaJS user!' }])
}, 3000)

// global error handler
app.use(errorHandler);

const port = process.env.PORT || 3400;

app.listen(port, () => {
    console.log('Server is running on port: ' + port)
});