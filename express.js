'use strict';

const got = require('got');
const crypto = require('crypto');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/travis', function (req, res) {
  let travisSignature = Buffer.from(req.headers.signature, 'base64');
  let payload = req.body.payload;
  let status = false;

  got('https://api.travis-ci.org/config', {
      timeout: 10000
  })
  .then(response => {
    let travisPublicKey =
      JSON.parse(response.body).config.notifications.webhook.public_key;
    let verifier = crypto.createVerify('sha1');
    verifier.update(payload);
    status = verifier.verify(travisPublicKey, travisSignature);
  })
  .catch(error => {
    console.log('Something went wrong:\n' + error)
  })
  .then(() => {
    if (status) {
      // Handle request here now that it has been verified...
    }
    res.sendStatus(200);
  });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
