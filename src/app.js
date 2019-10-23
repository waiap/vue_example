var express = require('express');
var pwall = require('./pwall');
var cors = require('cors');
var app = express();

// Setup pwall class
const _notify_url = 'http://92ef471a.ngrok.io/' //Nombre del ngrok
pwall = new pwall(
  endpoint = 'https://sandbox.sipay.es/pwall/api/v1/actions',
  key = 'sipay-test-team',
  secret = 'api-secret',
  resource = 'sipay-test-pwall',
  mode = "sha256"
)

// Setup server
app.use(cors());
app.use(express.json());

app.post('/actions/:amount', function (req, res) { // Don't use this on real world!!!!
  pwall.action(
    payload=req.body,
    amount=parseInt(req.params.amount),
    currency='EUR',
    notify_url=_notify_url,
    group_id='0',
    onResponse=(data) => {res.json(data)},
    onPaymentSuccess=(data) => {res.json(data)},
    onPaymentError=(data) => {res.json(data)}
  );
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
