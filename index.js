// // import Variables
// var Vars = require('./Variables/Environment.js');

//import s3 functions
var s3Functions = require('./Functions/s3Functions.js');

//import sns functions
var snsFunctions = require('./Functions/snsFunctions.js');

//handler function which is triggered on Lambda event
exports.handler = function(event, context, callback) {

s3Functions.getS3ObjectFromEvent(event).then((res) => {
  if (res.ContentType === 'text/plain'){
    return snsFunctions.publishTextToTopic(res);
  }
  else {
    console.log(event);
    context.succeed('Not a text file');
  };
}).then((res) => {
  console.log(res);
  context.succeed(res);
}).catch((err) => {
    console.log(err);
  });
};
