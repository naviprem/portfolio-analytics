"use strict";

let express = require('express');

let router = express.Router();
const request = require('request');
const env = process.env.NODE_ENV ? process.env.NODE_ENV : 'dev';

const config = require(`${__dirname}/../config/${env}.json`);

router.get('/*', (req, res) => {
  process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
  try {
    console.log(req.method, req.url);
    let options = {
        baseUrl: config.iextradingUrl,
        url: req.url,
        method: req.method,
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        }
    };
    // console.log(options);
    request(options, function (err, response, body) {
      // console.log(response);
      if (err) {
        console.log(`Api call for ${req.url} failed with an error`, err);
        res.status(500).end();
      } else if (response.statusCode >= 400) {
        console.log(`Api call for ${req.url} failed with status code - ${response.statusCode}`);
        res.status(response.statusCode).end();
      } else {
        console.log(`Received response for ${req.url}`, response.statusCode);
        res.status(response.statusCode).send(body);
      }
    })
  } catch (e) {
    console.log(e);
  }

});

module.exports = router;
