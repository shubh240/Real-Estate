require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const path = require("path");
const chat_model = require("./modules/v1/socket/Chat/chat_model");
var bodyParser = require('body-parser');
const { updateChatRead } = require("./config/common");
const PORT = process.env.PORT;

app.use(cors({
  origin: '*',
}));
app.use(bodyParser.json({ limit: '35mb' }));
app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: '35mb',
    parameterLimit: 50000,
  }),
);

app.use(express.text());
app.use(express.json());
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use('/images', express.static(__dirname + '/public/images'));

app.use('/enc_dec', express.static(__dirname + '/enc_dec'));

app.use('/v1/api_document/', require('./modules/v1/api_document/index'));

app.use('/api/v1/enc_dec/local', require('./modules/v1/enc_dec/router'));

app.use('/api/v1', require('./modules/v1/apk'));

app.use('/api/v1/admin', require('./modules/v1/admin'));

app.use('/api/v1', require('./modules/v1/socket'));


app.use("*", (req, res) => {
  res.status(404);
  res.send('404 Not Found');
});

try {
  app.use(express.static("public"));
  server = app.listen(PORT)
  console.log(`😈 App Running ⚡On 🔥 ` + process.env.PORT + ` 🔥`);
  var io = require('socket.io')(server, {
    cors: {
      origin: '*'
    },
  });
  require('./utils/socket')(io);

} catch (err) {
  console.log("Failed to connect --->>  ", err);
}