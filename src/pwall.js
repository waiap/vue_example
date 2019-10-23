const crypto = require('crypto');
const request = require('request');

class Pwall {

    constructor(
        endpoint,
        key,
        secret,
        resource,
        mode = 'sha256'
    ) {
        this.endpoint = endpoint;
        this.key = key;
        this.secret = secret;
        this.resource = resource;
        this.mode = mode;
    }

    action(
        payload,
        amount,
        currency,
        notify_url,
        group_id='0',
        onResponse = () => {},
        onPaymentSuccess = () => {},
        onPaymentError = () => {}) {
        return this.execute(
            this.parseBody(payload, amount, currency, notify_url, group_id),
            onResponse,
            onPaymentSuccess,
            onPaymentError
        );
    }

    execute(request_params, onResponse, onPaymentSuccess, onPaymentError) {
        request.post({
            url: this.endpoint,
            headers: request_params.headers,
            json: true,
            body: request_params.body,
            method: "POST"
        }, function(error, httpResponse, res) {

            if (request_params.body['payload']['action'] == 'sale' && res['result']['code'] == '0') {
                var method = (request_params.body['payload']['method'] || request_params.body['payload']['params']['method'])
                switch (method) {
                    case 'fpay':
                        if (typeof res.result.payload.approval !== 'undefined') {
                            onPaymentSuccess(res);
                        }
                        break;
                    default:
                        onPaymentSuccess(res);
                        break;
                }
            } else if (request_params.body['payload']['action'] == 'sale' && res['result']['code'] != '0') {
                onPaymentError(res);
            }

            onResponse(res);
        });
    }

    parseBody(payload, amount, currency, notify_url, group_id) {
        var body = {
            'key': this.key,
            'resource': this.resource,
            'nonce': process.hrtime().toString().replace(',', ''),
            'mode': this.mode,
            'payload': this.parsePayload(payload, amount, currency, notify_url, group_id)
        }

        return {
            'body': body,
            'headers': this.getHeaders(body)
        };
    }

    parsePayload(payload, amount, currency, notify_url, group_id) {
        'params' in payload || (payload.params = {});
        payload['params']['group_id'] = group_id;
        payload['params']['amount'] = amount;
        payload['params']['currency'] = currency;
        payload['params']['token'] = Math.random().toString(36).substring(2, 15);
        payload['params']['order'] = Math.random().toString(36).substring(2, 15);
        payload['params']['notify'] = {
            'result': notify_url
        };
        return payload;
    }

    getHeaders(body) {
        return {
            'Content-Type': 'application/json',
            'Content-Signature': crypto.createHmac(
                this.mode, this.secret
            ).update(
                JSON.stringify(body)
            ).digest(
                'hex'
            )
        }
    }
}

module.exports = Pwall