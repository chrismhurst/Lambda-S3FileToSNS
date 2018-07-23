// import individual service
var S3 = require('aws-sdk/clients/s3');

//start a new s3 client instance
var s3 = new S3({
  apiVersion: '2006-03-01'
});

var getS3ObjectFromEvent = (event) => {
  return new Promise((resolve, reject) => {
    //set params to grab all volumes with tag:Backup value:true
    var params = {
      Bucket: event.Records[0].s3.bucket.name,
      Key: decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, " "))
    }
    s3.getObject(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

module.exports = {
  getS3ObjectFromEvent,
  s3
};
