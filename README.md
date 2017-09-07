# travis-webhook-verification-nodejs
[Travis CI](https://travis-ci.org/) allows for users to configure [webhook notifications](https://docs.travis-ci.com/user/notifications/#Configuring-webhook-notifications) on a number of 
build results. These POST requests can/should be verified to ensure the integrity of your workflow.

See the Travis CI docs on [Verifying Webhook requests](https://docs.travis-ci.com/user/notifications/#Verifying-Webhook-requests) for more information.

## Node.js Webhook Verification Examples
This repository contains two examples of webhook verification using two popular [Node.js](https://nodejs.org/en/) frameworks, [hapi](https://hapijs.com/) and [express](https://expressjs.com/):

The hapi example code can be found [here](https://github.com/Brodan/travis-webhook-verification-nodejs/blob/master/hapi.js).

The express example code can be found [here](https://github.com/Brodan/travis-webhook-verification-nodejs/blob/master/express.js).

Read more about these examples in my blog post, [Verify Travis CI Webhook Notifications with Node.js](https://brodan.biz/blog/verify-travis-ci-webhook-notifications-with-node-js/)

# License
MIT
