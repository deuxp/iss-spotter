const { printTimes, nextISSTimesForMyLocation } = require('./iss-promised');


nextISSTimesForMyLocation()
  .then(shedule => {
    const { response } = JSON.parse(shedule);
    printTimes(response);
  })
  .catch(err => console.log('Whoopsie ', err.message));


// (1) deserialize what is passed in (2) return a new request --> promise.then
// where is the err coming from.. is it just any aerr or that occurs?
// does every error have a message property?