const { nextISSTimesForMyLocation } = require('./iss');


nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  passTimes.response.forEach(flyby => {
    console.log(`Next pass at ${new Date(flyby.risetime)} for ${flyby.duration} seconds!`);
  });

});

// when testing out the request functions .. keep the logging callback as generic as possible and define inline.. cause in the end you are going to be passing another useful fetch function that you defined earlier. So there is no need to create a modular logging function.
