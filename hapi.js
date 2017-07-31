'use strict';

const got = require('got');
const crypto = require('crypto');
const Hapi = require('hapi');

const server = new Hapi.Server();

server.connection({
  host: 'localhost',
  port: 3000
});

server.route({
  method: 'POST',
  path:'/travis',
  handler: function (request, reply) {
    let travisSignature = Buffer.from(request.headers.signature, 'base64');
    let payload = request.payload.payload;
    let status = false;
    
    got('https://api.travis-ci.org/config', {
      timeout: 10000
    })
    .then(response => {
      let travisPublicKey = JSON.parse(response.body).config.notifications.webhook.public_key;
      let verifier = crypto.createVerify('sha1');
      verifier.update(payload);
      status = verifier.verify(travisPublicKey, travisSignature);
    })
    .catch(error => {
      throw error;
    })
    .then(() => {
      if (status) {
        // Handle request here now that it has been verified...
      }
      reply(200);
    });
  }
});

server.start((err) => {
  if (err) {
    throw err;
  }
  console.log('Server running at:', server.info.uri);
});
