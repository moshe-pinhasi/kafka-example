const express = require('express')
const {connect, subscribe} = require('./MQService')

const app = express()

const listener = (msg) => {
  console.log('***** incoming message to server 2 *******');
  console.log('mgs', msg);
  console.log('******************************************');
}

connect().then(() => {
  subscribe('notification', listener)
})

const port = process.env.PORT || 3600;

app.listen(port, () => {
    console.log('Server is running on port: ' + port)
});