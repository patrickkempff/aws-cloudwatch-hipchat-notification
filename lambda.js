// Dependencies
var https = require('https');

// HipChat config; update with your data.
// See for more information https://www.hipchat.com/admin/api
var config = {
    'apikey': 'tDWczGgAGODFustlQMjTLU4OY88HBCQNUlU8pOHN',
    'chatroom_id': '4788430'
}

exports.handler = function(event, context) {
console.log(event);
    if ( ! event || ! event.Records || ! Array.isArray(event.Records) || event.Records.length < 1 ) {
        context.fail('Error, unexpected event reponse.');
        return;
    }

    let payload;
    if (typeof event.Records[0].Sns.Message === 'object') {
        payload = JSON.parse(event.Records[0].Sns.Message);
    } else {
       let payloadMessage = event.Records[0].Sns.Message;
       payload = JSON.parse(payloadMessage);
    }
    var message = JSON.stringify({
        'notify': true,
        'color': payload.NewStateValue === 'ALARM' ? 'red' : 'green',
        'message': '['+payload.NewStateValue+'] '+payload.AlarmName+' '+payload.NewStateReason,
        'message_format': 'text',
    });



    var options = {
        host: 'justfab.hipchat.com',
        method: 'POST',
        port: 443,
        path: '/v2/room/' + config.chatroom_id + '/notification?auth_token=' + config.apikey,
        headers: {
            'Content-Type': 'application/json',
        }
    }

    // Connect to the hipchat api.
    var request = https.request(options, function(response) {
        response.setEncoding('utf8');
        response.on('data', console.log);
        response.on('end', function () {

            if ( response.statusCode === 204 ) {
                context.succeed('Message sucessfull delivered to HipChat.');
                return;
            }

            context.fail('Unexpected response from the HipChat api.');
        });

        response.on('error', function(){
            context.fail('Could not deliver message to HipChat.');
        });
    });

    request.write(message);
    request.end();
}
