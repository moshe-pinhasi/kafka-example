const express = require('express')
const bodyParser = require('body-parser')
const errorHandler = require('./errorHandler.middleware')
const MQService = require('./MQService')
const {getRandomInt} = require('./util.service')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const topicNames = ["notification", 'event']

MQService.connect()

setInterval(() => {
  const index = getRandomInt(0, topicNames.length)
  MQService.send(topicNames[index], [{ value: `new ${topicNames[index]} from producer` }])
}, 3000)

// global error handler
app.use(errorHandler);

const port = process.env.PORT || 3400;

app.listen(port, () => {
    console.log('Server is running on port: ' + port)
});