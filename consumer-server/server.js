const express = require('express')
const {connect, subscribe} = require('./MQService')

const app = express()

const listener = (msg) => {
  console.log('***** incoming message *******');
  console.log('mgs', msg);
  console.log('******************************');
}

connect().then(() => {
  subscribe('test-topic', listener)
})

const port = process.env.PORT || 3500;

app.listen(port, () => {
    console.log('Server is running on port: ' + port)
});