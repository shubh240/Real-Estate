const express = require('express');
const https = require('https');
const fs = require('fs');
const cors = require('cors');
var bodyParser = require('body-parser');
require('dotenv').config();
const app = express();
app.use(cors());

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

app.use('/delete_user', express.static(__dirname + '/delete_user'));

app.use('/cms/', require('./modules/v1/cms_pages/index'));

app.use('/v1/api_document/', require('./modules/v1/api_document/index'));

app.use('/api/v1/enc_dec/local', require('./modules/v1/enc_dec/router'));

app.use('/api/v1', require('./modules/v1/apk'));

app.use('/api/v1/admin', require('./modules/v1/admin'));


app.use("*", (req, res) => {
  res.status(404);
  res.send('404 Not Found');
});


// try {
//   var options = {
//     key: fs.readFileSync('/etc/letsencrypt/live/bboyo.com/privkey.pem', 'utf8'),
//     cert: fs.readFileSync('/etc/letsencrypt/live/bboyo.com/fullchain.pem', 'utf8')
//   };
//   const server = https.createServer(options, app);
//   server.listen(process.env.PORT, () => {
//     console.log("Server running on port: " + process.env.PORT);
//   });
// } catch (err) {
//   console.log("Failed to connect --->>  ", err);
// }

try {
  server = app.listen(process.env.PORT);
  server.setTimeout(50000);
  console.log("appplication running on " , process.env.PORT);
  // console.log(`😈\x1b[33m App Running \x1b[0m\x1b[37m\x1b[1m⚡\x1b[33mOn 🔥 \x1b[4m\x1b[36m\x1b[1m` + port + `\x1b[0m 🔥`);
} catch (err) {
  console.log("Failed to connect --->>  ", err);
}