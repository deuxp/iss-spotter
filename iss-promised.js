const request = require('request-promise-native');

/** syntax for request promisified **\
 *
 // return request.('www.web.com')
 *
 *  (1) deserialize what is passed in
 *  (2) return a new request --> promise.then
 * -------- -------- -------- -------- --------
 *
 * [] where is the err coming from.. is it just any error that occurs?
 * [] does every error have a message property?
 *
 ==================================================
 */

const fetchMyIP = function() {
  return request('https://api.ipify.org?format=json'); // this has to resolve it is the promise..
};

const fetchCoordsByIP = function(data) {
  const { ip } = JSON.parse(data);
  return request(`https://api.freegeoip.app/json/${ip}?apikey=cd5c45e0-4895-11ec-88e5-0f3125459012`);
};

const fetchFLyOverTimes = function(coordinates) {
  const { latitude, longitude } = JSON.parse(coordinates);
  return request(`https://iss-pass.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`);
};


const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
    .then(ip => fetchCoordsByIP(ip))
    .then(xy => fetchFLyOverTimes(xy));
};


const printTimes = function(t) {
  t.forEach(time => {
    console.log(`Next pass at ${new Date(time.risetime)} for ${time.duration} seconds!`);
  });
};

module.exports = {
  fetchMyIP,
  fetchCoordsByIP,
  fetchFLyOverTimes,
  nextISSTimesForMyLocation,
  printTimes
};