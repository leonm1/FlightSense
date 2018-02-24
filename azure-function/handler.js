'use strict';

const airportsjs = require('airportsjs');
const airport_tz = require('airport-tz');
const moment = require('moment-timezone');
/* eslint-disable no-param-reassign */

module.exports.hello = function (context) {
  context.log('JavaScript HTTP trigger function processed a request.');
  const query = req.query;
  const airportInfo = airportsjs.lookupByIataCode(query.code);
  airportInfo.tz = airport_tz.findWhere({ iata: query.code }).get('timzone');

  context.res = {
    // status: 200, /* Defaults to 200 */
    body: 'Go Serverless v1.x! Your function executed successfully!',
  };

  context.done();
};
