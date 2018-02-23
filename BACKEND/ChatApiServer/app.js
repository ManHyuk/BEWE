const path = require('path');
const cors = require('cors');
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const room = require('./socket/room');

const redis = require('redis');

const pub = redis.createClient(6379, '52.78.25.56');
const sub = redis.createClient(6379, '52.78.25.56');
  
sub.subscribe('sub');
sub.on('subscribe',function (channel, count) {
  console.log("Subscribed to " + channel + ". Now subscribed to " + count + " channel(s).");
});
// setup server
const app = express();
const server = http.createServer(app);
const io = require('./socket/socketService')(server, pub, sub);

app.use('/', express.static(__dirname + './public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

app.use((req, res, next) => {
  res.r = (result) => {
    res.json({
      status: true,
      message: "success",
      result,
    });
  };
  next();
});

require('./socket/messageSocket').initialize();

require('./routes')(app);

//error handler
require('./ErrorHandler')(app);

// Start listening
server.listen(process.env.PORT || '4010');
console.log(`Started on port 4010`);

module.exports = app;