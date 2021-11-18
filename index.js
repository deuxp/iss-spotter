const { fetchMyIP, fetchCoordsByIP, fetchFLyOverTimes } = require('./iss');

// cb handles err or log only
// fetchMyIP((err, body) => {
//   if (err) {
//     console.log(err);
//     return;
//   }
//   console.log(body);
// });

// 45.72.235.116


// fetchCoordsByIP('45.72.235.116', (err, data) => {
//   if (err) {
//     console.log('this is error: ', err);
//     return;
//   }
//   console.log(data);
// });


fetchFLyOverTimes({ latitude: 43.6859, longitude: -79.3974 }, (err, data) => {
  if (err) {
    console.log('this is error: ', err);
    return;
  }
  console.log(data);
});
// throw is like return except the catch func will be looking for this at the end of a rrunctime.