var Vars = require('../Variables/Vars.js');

// import individual service
var SNS = require('aws-sdk/clients/sns');

//start a new sns client instance
var sns = new SNS({
  apiVersion: '2010-03-31'
});

var publishTextToTopic = (message) => {
  return new Promise((resolve, reject) => {
    if (message.ContentType === 'text/plain'){
      var params = {
        Message: message.Body.toString('utf8'),
        TopicArn: Vars.Environment.SNSTopicARN,
        Subject: 'AWS SNS Message'
      }
      sns.publish(params, (err, data) => {
      if (err) {
        console.log('error on publish');
        reject(err);
      }
      else {
        console.log('published');
        console.log(data);
        resolve(data);
      };
      });
    }
    else {
      reject('not a txt file');
    };
  });
};

module.exports = {
  publishTextToTopic,
  sns
};
