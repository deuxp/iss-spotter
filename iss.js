/* Spot the ISS station **\
 * ========================================================================================
 * 1. Fetch our IP address
 * 2. Fetch the geo coordinates for our IP
 * 3. Fetch the next ISS fly-fovers for our geo coordinates
 * 4. match time and date when the ISS is flying overhead my location
 * 5. iss flyover handle incorrect latitude or longitude data
 * 6. install and write mocha tests
 *
 * NOTE:
 * Each step is dependent on the last, so nesting and call backs are taken with great care
 * ISS.js will contain most of the logic for data fetching
 *
 * TESTING INFO:
 * API geo key = cd5c45e0-4895-11ec-88e5-0f3125459012
 * geo coordinates = { latitude: 43.6859, longitude: -79.3974 }
 * IP = 45.72.235.116
 * ========================================================================================
 */
const request = require('request');

/** #Call 1 **\
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */

const fetchMyIP = function(cb) {
  request('https://api.ipify.org?format=json', (err, response, body) => {

    if (err) { // handle api not found
      cb(err, null);
      return;
    } // handle logic of both kinds of errors here. CB can be generic now.
    if (response.statusCode !== 200) {
      // make your custom msg to pass into cb err while this scenario occurs
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      cb(Error(msg), null); // use error object
      return;
    }
    
    const ip = JSON.parse(body).ip; // deserialize
    // cb(err, ip); // log the body
    cb(err, ip); // log the body

  });
};


const fetchCoordsByIP = function(myIP, cb) {
  request(`https://api.freegeoip.app/json/${myIP}?apikey=cd5c45e0-4895-11ec-88e5-0f3125459012`, (err, response, body) => {

    if (err) { // handle api not found
      cb(err, null);
      return;
    }
    if (response.statusCode !== 200) { // error if other than successful
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      cb(Error(msg), null); // dont forget the error object
      return;
    }

    // unpack coordinates only
    const {
      latitude,
      longitude
    } = JSON.parse(body);

    // pass coordinates only --> using es6 shorthand -- almost like exporting
    cb(err, { latitude, longitude });
  });
};


const fetchFLyOverTimes = function(coordinates, cb) {
  request(`https://iss-pass.herokuapp.com/json/?lat=${coordinates.latitude}&lon=${coordinates.longitude}`, (err, response, body) => {
    if (err) { // handle api not found -- dulicate error handling from the other 2 api fetchers
      cb(err, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      cb(Error(msg), null);
      return;
    } // this will also have to handle invalid lat and or lon data

    const iss = JSON.parse(body);
    cb(null, iss);
    
    
  });
};

// THe glue function
// ============================================================================
/**
 * Orchestrates multiple API requests in order to determine the next 5 upcoming ISS fly overs for the user's current location.
 * Input:
 *   - A callback with an error or results.
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly-over times as an array (null if error):
 *     [ { risetime: <number>, duration: <number> }, ... ]
 */
const nextISSTimesForMyLocation = function(callback) {

  fetchMyIP((err, ip) => {
    fetchCoordsByIP(ip, (err, coordinates) => {
      fetchFLyOverTimes(coordinates, (err, times) => {
        callback(err, times);
      });
    });
  });
  // pay attention to how they are passed to each function call within the callback: each callback was defined in your functions the same. 2 params -> and error and a callback.. each function was cdefined with a param for the necessary passed down response or resolve from the previeous func and a a callback.. to be passed in to deal wit the respons or dat from this func.
};


module.exports = {
  nextISSTimesForMyLocation
};