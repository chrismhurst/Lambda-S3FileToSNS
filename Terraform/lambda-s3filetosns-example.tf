provider "aws" {
  region     = "us-east-1"
}

resource "aws_sns_topic" "lambda-s3filetosns" {
  name = "lambda-s3filetosns"
}

resource "aws_iam_role_policy" "<BUCKETNAME>-getobject" {
  name = <BUCKETNAME>-getobject"
  role = "${aws_iam_role.lambda-s3filetosns-executor.id}"

  policy = <<EOF
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "",
            "Effect": "Allow",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::<BUCKETNAME>/*"
        }
    ]
}
EOF
}

resource "aws_iam_role_policy" "test-s3-to-email-publish" {
  name = "test-s3-to-email-publish"
  role = "${aws_iam_role.lambda-s3filetosns-executor.id}"

  policy = <<EOF
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Action": [
                "sns:Publish"
            ],
            "Effect": "Allow",
            "Resource": "${aws_sns_topic.lambda-s3filetosns.id}"
        }
    ]
}
EOF
}

resource "aws_iam_role" "lambda-s3filetosns-executor" {
  name = "lambda-s3filetosns-executor"

  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
EOF
}
