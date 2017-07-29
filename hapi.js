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
    var travis_signature = Buffer.from(request.headers.signature, 'base64');
    var payload = request.payload.payload;
    var status = false;
    
    got('https://api.travis-ci.org/config', {
      timeout: 10000
    })
    .then(response => {
      let travis_public_key = JSON.parse(response.body).config.notifications.webhook.public_key;
      let verifier = crypto.createVerify('sha1');
      verifier.update(payload);
      status = verifier.verify(travis_public_key, travis_signature);
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
