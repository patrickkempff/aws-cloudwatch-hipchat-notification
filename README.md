# AWS Lambda HipChat Notifications

This Lambda function can be used to receive Cloudwatch Alarms in HipChat.

### 1. Create an new Lambda function

Copy the contents of lambda.js into an new Lambda function.
Then update the config variable. 
See for more information: https://www.hipchat.com/admin/api

````
var config = {
    'apikey': 'XXXXXXXXXXXXXXXXXXXXXXXXXX',
    'chatroom_id': '12345678'
}
````

### 2. Add a SNS Topic

Add an new topic in SNS. This topic will be used to receive the cloudwatch
alarm data and sends a notification to the Lambda function. 

### 3. CloudWatch alarm.

Create an new CloudWatch alarm with notifies the created SNS topic. 



### Test event

The can use the following output to test the lambda function:

````
{
  "Records": [
    {
      "EventVersion": "1.0",
      "EventSubscriptionArn": "arn:aws:sns:EXAMPLE",
      "EventSource": "aws:sns",
      "Sns": {
        "SignatureVersion": "1",
        "Timestamp": "1970-01-01T00:00:00.000Z",
        "Signature": "EXAMPLE",
        "SigningCertUrl": "EXAMPLE",
        "MessageId": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxx",
        "Message": "{\"AlarmName\":\"Estimated Charges more than $1\",\"AlarmDescription\":null,\"AWSAccountId\":\"1234567890\",\"NewStateValue\":\"ALARM\",\"NewStateReason\":\"Threshold Crossed: 1 datapoint (1.23) was greater than or equal to the threshold (0.0).\",\"StateChangeTime\":\"2016-03-07T20:47:12.888+0000\",\"Region\":\"US - N. Virginia\",\"OldStateValue\":\"INSUFFICIENT_DATA\",\"Trigger\":{\"MetricName\":\"EstimatedCharges\",\"Namespace\":\"AWS/Billing\",\"Statistic\":\"MAXIMUM\",\"Unit\":null,\"Dimensions\":[{\"name\":\"Currency\",\"value\":\"USD\"}],\"Period\":21600,\"EvaluationPeriods\":1,\"ComparisonOperator\":\"GreaterThanOrEqualToThreshold\",\"Threshold\":0.0}}",
        "MessageAttributes": {
          "Test": {
            "Type": "String",
            "Value": "TestString"
          },
          "TestBinary": {
            "Type": "Binary",
            "Value": "TestBinary"
          }
        },
        "Type": "Notification",
        "UnsubscribeUrl": "EXAMPLE",
        "TopicArn": "arn:aws:sns:EXAMPLE",
        "Subject": "TestInvoke"
      }
    }
  ]
}
````
  