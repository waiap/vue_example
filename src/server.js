var express = require("express");
var pwall = require("./pwall");
var cors = require("cors");
var config = require("../config");
var app = express();

// Setup pwall class
pwall = new pwall(
  (endpoint = config.endpoint),
  (key = config.key),
  (secret = config.secret),
  (resource = config.resource),
  (mode = config.mode)
);

// Setup server
app.use(cors());
app.use(express.json());

app.post("/actions/:amount", function(req, res) {
  // Don't use this on real world!!!!
  pwall.action(
    (payload = req.body),
    (amount = parseInt(req.params.amount)),
    (currency = "EUR"),
    (notify_url = config.notify_url),
    (group_id = "0"),
    (onResponse = data => {
      res.json(data);
    }),
    (onPaymentSuccess = data => {
      res.json(data);
    }),
    (onPaymentError = data => {
      res.json(data);
    })
  );
});

app.listen(3000, function() {
  console.log("Example app listening on port 3000!");
});
