const { nextISSTimesForMyLocation } = require('./iss');


nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  passTimes.response.forEach(flyby => {
    console.log(`Next pass at ${new Date(flyby.risetime)} for ${flyby.duration} seconds!`);
  });

});






