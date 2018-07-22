//import s3 functions
var s3Commands = require('./Functions/s3Functions.js');

//handler function which is triggered on Lambda event
exports.handler = function(event, context, callback) {

s3Commands.getS3ObjectFromEvent(event).then((res) => {
  if (res.ContentType === 'text/plain'){
    console.log(res.Body.toString('utf8'));
    // var text = JSON.stringify(res.Body.toString('utf8'));
    // console.log(text);
    context.succeed(res.Body.toString('utf8'));
  };
  }).catch((err) => {
    console.log(err);
  });
};
